import React, { useMemo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Header, Modal, Grid, Input } from 'semantic-ui-react'

import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import dashboardModalListConfig from '@lib/constants/list-configs/dashboard/dashboard-modal'
import dashboardModalDuck from '@reducers/dashboard/dashboard-modal'
import dashboardModalDetailDuck from '@reducers/dashboard/dashboard-modal/detail'

const DashboardModal = (props) => {
  const {
    dashboardModalDetail
  } = props
  const dispatch = useDispatch()
  const [ tbFilter, setTbFilter ] = useState('All')

  useEffect(() => {
    props.getDashboardModalDetails()
  }, [])
  const history = useHistory()

  useEffect(()=>{
    dispatch(dashboardModalDuck.creators.get({ search: tbFilter }))
  },[ tbFilter ])

  const getIsOpened = (mode) => mode === 'READ'

  const _handleClose = () => {
    props.resetItem()
  }

  const _handleButtonClick = (Button,item)=>{
    dispatch(dashboardModalDuck.creators.get({
      item  : Button,
      search: item.id
    }))
  }
  const _handleDropdownOptionClick = (option,item) => {
    console.log(item)
    switch (option) {
      case 'edit_pet':
        history.push({
          pathname: `/pet/${7}`
        })
        break
        // case 'add_incident':
        //   history.push({
        //     pathname: `/pet/${7}`,
        //     state   : { dashboard: 'incident' }
        //   })
        //   break

      case 'vaccinations':
        history.push({
          pathname: `/pet/${7}`,
          state   : { dashboard: 'vaccination' }
        })
        break
      case 'edit_reservation':
        history.push({
          pathname: `/pet/${7}`,
          state   : { dashboard: 'services' }
        })
        break

      case 'edit_client':
        history.push({
          pathname: `/client/${14}`
        })
        break

      case 'print_run_card':
        history.push({
          pathname: '/setup/report-card-setup/day-service'
        })
        break

      case 'add_report_card':
        history.push({
          pathname: '/setup/report-card-setup/day-service'
        })
        break
      case 'delete_reservation':
        props.setItem(null, 'DELETE')
        break
    }
  }

  const isOpened = useMemo(() => getIsOpened(dashboardModalDetail.mode), [
    dashboardModalDetail.mode
  ])

  return (
    <>
      <Modal
        className='form-modal modal-width'
        onClose={_handleClose}
        open={isOpened}
        size='large'>
        <Modal.Content>
          <Header as='h2' content='Check In/Out Details'/>
          <Grid>
            <Grid.Column className='pb0' computer={16} style={{ minHeight: '500px' }}>
              <div className='flex align-center dsb-table-hd'>
                <Input
                  icon='search' iconPosition='left' onChange=''
                  placeholder='Search by pet' style={{ width: '200px' }} type='search'/>
                <div className='flex align-center ml8'>
                  <Header className='filter-text dsb-selected-h ml20' content='Filter By:'/>
                  <Header
                    as={Link} className={tbFilter === 'All' ? 'filter-text dsb-selected-h'
                      : 'filter-text dsb-un-selected-h'} content='All'
                    onClick={()=>{setTbFilter('All')}}/> <span className='dashboard-filter-spacing'>|</span>
                  <Header
                    as={Link} className={tbFilter === 'Boarding' ? 'filter-text dsb-selected-h ml4'
                      : 'filter-text dsb-un-selected-h ml4'} content='Boarding: 10'
                    onClick={()=>{setTbFilter('Boarding')}}/> <span className='dashboard-filter-spacing'>|</span>
                  <Header
                    as={Link} className={tbFilter === 'Day Care' ? 'filter-text dsb-selected-h ml4'
                      : 'filter-text dsb-un-selected-h ml4'} content='Day Care: 25'
                    onClick={()=>{setTbFilter('Day Care')}}/> <span className='dashboard-filter-spacing'>|</span>
                  <Header
                    as={Link} className={tbFilter === 'Training' ? 'filter-text dsb-selected-h ml4'
                      : 'filter-text dsb-un-selected-h ml4'} content='Training: 5'
                    onClick={()=>{setTbFilter('Training')}}/> <span className='dashboard-filter-spacing'>|</span>
                  <Header
                    as={Link} className={tbFilter === 'Grooming' ? 'filter-text dsb-selected-h ml4'
                      : 'filter-text dsb-un-selected-h ml4'} content='Grooming: 5'
                    onClick={()=>{setTbFilter('Grooming')}}/>
                </div>
              </div>
              <div className='dashboard-table mt8 ml8'>
                <Table
                  config={dashboardModalListConfig}
                  duck={dashboardModalDuck}
                  onRowButtonClick={_handleButtonClick}
                  onRowDropdownChange={_handleDropdownOptionClick}/>
              </div>
            </Grid.Column>
            <Grid.Column className='pt0' computer={16} textAlign='right'>
              <Button content='Cancel' onClick={_handleClose}/>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
      <ModalDelete duckDetail={dashboardModalDetailDuck}/>
    </>
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
      setItem                 : dashboardModalDetailDuck.creators.setItem,
      resetItem               : dashboardModalDetailDuck.creators.resetItem
    }
  )
)(DashboardModal)
