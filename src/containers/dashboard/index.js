import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { useDispatch,  useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Grid,
  Segment,
  Card,
  Button,
  Icon,
  Header,
  Input
} from 'semantic-ui-react'
import { useChangeStatusEffect } from '@hooks/Shared'
import { FaCashRegister } from 'react-icons/fa'

import Theme from '@components/mainTheme'
import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import DayCardTemplate from './day-card'
import Second from './second'
import VaccinationForm from './vaccination-modal'
import ExpressCheckInForm from './express-check-in'

import dashboardListConfig from '@lib/constants/list-configs/dashboard'
import dashboardDuck from '@reducers/dashboard'
import dashboardDetailDuck from '@reducers/dashboard/detail'
import dashboardModalDetailDuck from '@reducers/dashboard/dashboard-modal/detail'
import tenantDetailDuck from '@reducers/tenant/detail'
import clientDetailDuck from '@reducers/client/detail'

import NewClientForm from '../client/form/modal'
import DashboardModal from './modal'

import './dashboard.scss'

const Dashboard = (props) => {
  useChangeStatusEffect(props.dashboardModalDetail.status)
  useChangeStatusEffect(props.clientDetail.status)
  const [ tbFilter, setTbFilter ] = useState('All')
  const [ outerFilter, setOuterFilter ] = useState('expected')
  const [ hideSidebar, setHideSidebar ] = useState()
  const dispatch = useDispatch()

  const tenant = useSelector(tenantDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(dashboardDuck.creators.get())
  }, [])

  useEffect(() => {
    dispatch(dashboardDuck.creators.get({ search: tbFilter }))
  }, [ tbFilter ])

  const history = useHistory()

  const _handleOpenModal = () => {
    props.setItem(null, 'READ')
  }

  const _handleButtonClick = (Button, item) => {
    dispatch(
      dashboardDuck.creators.get({
        item  : Button,
        search: item.id
      })
    )
  }
  const _handleDropdownOptionClick = (option) => {
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
        props.setDashboardItem(null, 'DELETE')
        break
    }
  }

  const _handleNewClient = () => {
    props.setNewClient(null, 'CREATE')
  }
  const _handleNewBooking = () => {
    history.push({
      pathname: `/client/${14}`,
      state   : { option: 'reserves' }
    })
  }
  const _handleRetailSale = () => {
  }

  const _onHandleSideBar = (sidebar) => {
    setHideSidebar(sidebar)
  }

  return (
    <>
      <Layout sidebarHandle={_onHandleSideBar}>
        <Segment className='segment-dashboard-content pt0 pb0'>
          <Grid className='mt0' style={{ 'margin-bottom': '2.2rem' }}>
            <Grid.Column
              className={`pb8 ${Theme(tenant).buttonTextColor}`}  computer={16} mobile={16}
              tablet={16}>
              <Header as='h2' color={Theme(tenant).headingColor}>The Daily Dashboard</Header>
            </Grid.Column>
          </Grid>
          <Button
            className={`mb4 ${Theme(tenant).buttonTextColor}`}
            color={outerFilter === 'expected' ? Theme(tenant).buttonMenuColor : ''}
            content='Expected : 45'
            // eslint-disable-next-line react/jsx-handler-names
            onClick={() => setOuterFilter('expected')}/>
          <Button
            className={`mb4 button-menu ${Theme(tenant).buttonTextColor}`}
            color={outerFilter === 'checkIn' ? Theme(tenant).buttonMenuColor : ''}
            content='Checked In : 30'
            // eslint-disable-next-line react/jsx-handler-names
            onClick={() => setOuterFilter('checkIn')}/>
          <Button
            className={`mb4 button-menu ${Theme(tenant).buttonTextColor}`}
            color={outerFilter === 'checkOut' ? Theme(tenant).buttonMenuColor : ''}
            content='Checked Out : 15'
            // eslint-disable-next-line react/jsx-handler-names
            onClick={() => setOuterFilter('checkOut')}/>
          <Grid>
            <Grid.Column computer={10}>
              <Card fluid style={{ height: '620px' }}>
                <div className='flex justify-between align-center dsb-table-hd'>
                  <Input
                    icon='search'
                    iconPosition='left'
                    onChange=''
                    placeholder='Search by pet'
                    style={{ width: '160px' }}
                    type='search'/>
                  <div className='flex align-center ml8'>
                    <Header
                      className='filter-text dsb-selected-h'
                      content='Filter By:'/>
                    <Header
                      as={Link}
                      className={
                        tbFilter === 'All'
                          ? 'filter-text dsb-selected-h'
                          : 'filter-text dsb-un-selected-h'
                      }
                      content='All'
                      // eslint-disable-next-line react/jsx-handler-names
                      onClick={() => {
                        setTbFilter('All')
                      }}/>{' '}
                    <span
                      className={
                        hideSidebar === true
                          ? 'dashboard-filter-spacing-sidebar'
                          : 'dashboard-filter-spacing'
                      }>
                      |
                    </span>
                    <Header
                      as={Link}
                      className={
                        tbFilter === 'Boarding'
                          ? 'filter-text dsb-selected-h ml4'
                          : 'filter-text dsb-un-selected-h ml4'
                      }
                      content='Boarding: 10'
                      // eslint-disable-next-line react/jsx-handler-names
                      onClick={() => {
                        setTbFilter('Boarding')
                      }}/>{' '}
                    <span
                      className={
                        hideSidebar === true
                          ? 'dashboard-filter-spacing-sidebar'
                          : 'dashboard-filter-spacing'
                      }>
                      |
                    </span>
                    <Header
                      as={Link}
                      className={
                        tbFilter === 'Day Care'
                          ? 'filter-text dsb-selected-h ml4'
                          : 'filter-text dsb-un-selected-h ml4'
                      }
                      content='Day Care: 25'
                      // eslint-disable-next-line react/jsx-handler-names
                      onClick={() => {
                        setTbFilter('Day Care')
                      }}/>{' '}
                    <span
                      className={
                        hideSidebar === true
                          ? 'dashboard-filter-spacing-sidebar'
                          : 'dashboard-filter-spacing'
                      }>
                      |
                    </span>
                    <Header
                      as={Link}
                      className={
                        tbFilter === 'Training'
                          ? 'filter-text dsb-selected-h ml4'
                          : 'filter-text dsb-un-selected-h ml4'
                      }
                      content='Training: 5'
                      // eslint-disable-next-line react/jsx-handler-names
                      onClick={() => {
                        setTbFilter('Training')
                      }}/>{' '}
                    <span
                      className={
                        hideSidebar === true
                          ? 'dashboard-filter-spacing-sidebar'
                          : 'dashboard-filter-spacing'
                      }>
                      |
                    </span>
                    <Header
                      as={Link}
                      className={
                        tbFilter === 'Grooming'
                          ? 'filter-text dsb-selected-h ml4'
                          : 'filter-text dsb-un-selected-h ml4'
                      }
                      content='Grooming: 5'
                      // eslint-disable-next-line react/jsx-handler-names
                      onClick={() => {
                        setTbFilter('Grooming')
                      }}/>
                  </div>
                  <div className='hide-button-shdow'>
                    <Button
                      basic
                      color='blue'
                      icon='expand arrows alternate'
                      onClick={_handleOpenModal}/>
                  </div>
                </div>
                <div className='dashboard-table mt8 ml8'>
                  <Table
                    config={dashboardListConfig}
                    duck={dashboardDuck}
                    onActionClick={_handleOpenModal}
                    onRowButtonClick={_handleButtonClick}
                    onRowDropdownChange={_handleDropdownOptionClick}/>
                </div>
              </Card>
            </Grid.Column>
            <Grid.Column className='pl0' computer={6}>
              <DayCardTemplate/>
              <ExpressCheckInForm/>
              <div className='flex align-center justify-between pt8'>
                <Button
                  circular
                  className='circle-ds'
                  color='teal'
                  onClick={_handleNewClient}>
                  <Icon className='ml12' name='user' size='big'/>
                  <label className='circle-label-ds'>
                    <span>New</span>
                    <br/>
                    <span>Client</span>
                  </label>
                </Button>
                <Button
                  circular
                  className='circle-ds'
                  color='teal'
                  onClick={_handleNewBooking}>
                  <Icon
                    className='ml12'
                    name='calendar alternate outline'
                    size='big'/>
                  <label className='circle-label-ds'>
                    <span>New</span>
                    <br/>
                    <span>Booking</span>
                  </label>
                </Button>
                <Button
                  circular
                  className='circle-ds'
                  color='teal'
                  onClick={_handleRetailSale}>
                  <Icon className='ml12' size='big'>
                    <FaCashRegister/>
                  </Icon>
                  <label className='circle-label-ds'>
                    <span>Retail</span>
                    <br/>
                    <span>Sale</span>
                  </label>
                </Button>
              </div>
            </Grid.Column>
          </Grid>
          <Second hideSidebar={hideSidebar}/>
        </Segment>
      </Layout>

      <VaccinationForm/>
      <DashboardModal/>
      <NewClientForm/>
      <ModalDelete duckDetail={dashboardDetailDuck}/>
    </>
  )
}

export default compose(
  connect(
    (state) => ({
      clientDetail        : clientDetailDuck.selectors.detail(state),
      dashboardModalDetail: dashboardModalDetailDuck.selectors.detail(state)
    }),
    {
      setItem         : dashboardModalDetailDuck.creators.setItem,
      setNewClient    : clientDetailDuck.creators.setItem,
      setDashboardItem: dashboardDetailDuck.creators.setItem
    }
  )
)(Dashboard)
