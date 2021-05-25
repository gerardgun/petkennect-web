import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Modal, Grid } from 'semantic-ui-react'

import Table from '@components/Table'
import dashboardModalListConfig from '@lib/constants/list-configs/dashboard/dashboard-modal'
import dashboardModalDuck from '@reducers/dashboard/dashboard-modal'
import dashboardModalDetailDuck from '@reducers/dashboard/dashboard-modal/detail'

const DashboardModal = (props) => {
  const {
    dashboardModalDetail
  } = props

  useEffect(() => {
    props.getDashboardModalDetails()
  }, [])

  const getIsOpened = (mode) => mode === 'READ'

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(dashboardModalDetail.mode), [
    dashboardModalDetail.mode
  ])

  return (
    <Modal
      className='form-modal modal-width'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        <Header as='h2' content='Check In/Out Details'/>
        <Grid>
          <Grid.Column className='pb0' computer={16}>
            <Table
              config={dashboardModalListConfig}
              duck={dashboardModalDuck}/>
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
      const dashboardModalDetail = dashboardModalDetailDuck.selectors.detail(state)

      return {
        dashboardModalDetail,
        dashboardModal: dashboardModalDuck.selectors.list(state)
      }
    },
    {
      getDashboardModalDetails: dashboardModalDuck.creators.get,
      post                    : dashboardModalDetailDuck.creators.post,
      put                     : dashboardModalDetailDuck.creators.put,
      resetItem               : dashboardModalDetailDuck.creators.resetItem
    }
  )
)(DashboardModal)
