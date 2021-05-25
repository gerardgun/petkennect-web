import React, { useMemo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useDispatch } from 'react-redux'
import { Button, Header, Modal, Grid } from 'semantic-ui-react'

import Table from '@components/Table'
import dashboardCardModalListConfig from '@lib/constants/list-configs/dashboard/dashboard-card-modal'
import dashboardCardChildListConfig from '@lib/constants/list-configs/dashboard/dashboard-card-child'
import dashboardCardModalDuck from '@reducers/dashboard-card/dashboard-card-modal'
import dashboardCardModalDetailDuck from '@reducers/dashboard-card/dashboard-card-modal/detail'

const DashboardCardModal = (props) => {
  const {
    dashboardCardModalDetail
  } = props

  useEffect(() => {
    props.getDashboardCardModalDetails()
  }, [])

  const [ getAll, setGetAll ] = useState([])
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(dashboardCardModalDuck.creators.get({ search: getAll }))
  },[ dashboardCardModalDetail ])

  const getIsOpened = (mode) => mode === 'READ'

  const _handleClose = () => {
    props.resetItem()
  }

  const _handleButtonClick = (option,item)=>{
    let data = []
    const data_found = Boolean(getAll.find(_item=> _item === item.service))
    if(data_found) {
      data = getAll.filter(value => value != item.service)
      setGetAll(data)
      dispatch(dashboardCardModalDuck.creators.get({ search: data }))
    }
    else {
      setGetAll([ ...getAll, item.service ])
      dispatch(dashboardCardModalDuck.creators.get({ search: [ ...getAll, item.service ] }))
    }
  }

  const isOpened = useMemo(() => getIsOpened(dashboardCardModalDetail.mode), [
    dashboardCardModalDetail.mode
  ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        <Header as='h2' content='Capacity Details'/>
        <Grid>
          <Grid.Column className='pb0 table-button-border' computer={16}>
            <Table
              childProps={{
                config: dashboardCardChildListConfig
              }}
              config={dashboardCardModalListConfig} duck={dashboardCardModalDuck}
              onRowButtonClick={_handleButtonClick}/>
          </Grid.Column>
          <Grid.Column className='pt0' computer={16} textAlign='right'>
            <Button content='Cancel' onClick={_handleClose}/>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    (state) => {
      const dashboardCardModalDetail = dashboardCardModalDetailDuck.selectors.detail(state)

      return {
        dashboardCardModalDetail,
        dashboardCardModal: dashboardCardModalDuck.selectors.list(state)
      }
    },
    {
      getDashboardCardModalDetails: dashboardCardModalDuck.creators.get,
      post                        : dashboardCardModalDetailDuck.creators.post,
      put                         : dashboardCardModalDetailDuck.creators.put,
      resetItem                   : dashboardCardModalDetailDuck.creators.resetItem
    }
  )
)(DashboardCardModal)
