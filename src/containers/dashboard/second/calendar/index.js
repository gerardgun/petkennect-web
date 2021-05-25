import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Icon, Card, Button, Label } from 'semantic-ui-react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
import DayPicker from 'react-day-picker'

import { useChangeStatusEffect } from '@hooks/Shared'
import CalendarModal from './calendar-modal'
import FacilityModal from './calendar-modal/facility-modal'
import StaffingModal from './calendar-modal/staffing-modal'

import dashboardStaffingDuck from '@reducers/dashboard/calendar/staffing'
import dashboardCalendarDetailDuck from '@reducers/dashboard/calendar/staffing/detail'
import dashboardFacilityDuck from '@reducers/dashboard/calendar/facility'
import dashboardFacilityDetailDuck from '@reducers/dashboard/calendar/facility/detail'
import dashboardStaffingDetailDuck from '@reducers/dashboard/calendar/staffing/detail'

import '../../dashboard.scss'

const Calendar = (props) => {
  const {
    facilityEvents,
    staffingEvents
  } = props

  useChangeStatusEffect(props.calendarDetail.status)
  useChangeStatusEffect(props.facilityDetail.status)
  useChangeStatusEffect(props.staffingDetail.status)

  useEffect(() => {
    props.getFacilityEvents()
    props.getStaffingEvents()
  }, [])

  const [ type , setType ] = useState('facility')
  const  _handleFacility = () => {
    setType('facility')
  }

  const  _handleStaffing = () => {
    setType('staffing')
  }

  const  _handleCreateCalendar = () => {
    props.setItem(null, 'CREATE')
  }

  const  _handleAllFacilityEvents = () => {
    props.setFacilityItem(null, 'READ')
  }
  const  _handleAllStaffingEvents = () => {
    props.setStaffingItem(null, 'READ')
  }

  return (
    <>
      <Card fluid  style={{ height: '400px' }}>
        <Grid  className='ph8 mb4'>
          <Grid.Column className='pb4 pt24' width={16}>
            <Icon color='blue' name='calendar alternate outline'></Icon>
            <span className='text-font mt4'><b>Calendars</b></span>
            <Link className='text-font ml20 mt4' onClick={_handleFacility} style={type === 'facility' ? ({ color: 'blue' }) : ({ color: 'black' })}>Facility</Link>
            <Link className='text-font ml20 mt4' onClick={_handleStaffing} style={type === 'staffing' ? ({ color: 'blue' }) : ({ color: 'black' })}>Staffing</Link>
            <Button
              className='button-font' onClick={_handleCreateCalendar}
              style={{ 'float': 'right', backgroundColor: '#306EFF', color: 'white' }}><Icon name='plus'/>Create</Button>
          </Grid.Column>
        </Grid>

        <Grid className='m0' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)', height: '2px' }}></Grid>

        <div className='p8 mt4' style={{ height: '327px' }}>
          <Grid>
            <Grid.Column className='mt0 pr0' width={8}>
              {
                type === 'facility' ? (
                  <>
                    <span><b>Scheduled Events</b></span>
                    {
                      facilityEvents.items && facilityEvents.items.reduce((result, item, i) => {
                        if(i < 3)
                          result.push(
                            <Grid className='mt8' style={{ display: 'flex' }}>
                              <Grid.Column className='icon-style pt4' width={2}>
                                {
                                  item.type === 'training' && (
                                    <Label style={{ height: '20px', backgroundColor: '#fc9e19' }}></Label>)
                                }
                                {
                                  item.type === 'facility' && (
                                    <Label style={{ height: '20px', backgroundColor: '#306EFF' }}></Label>)
                                }
                                {
                                  item.type === 'daycare' && (
                                    <Label style={{ height: '20px', backgroundColor: '#9C44AD' }}></Label>)
                                }
                              </Grid.Column>
                              <Grid.Column className='icon-style pt0 pr0' width={13}>
                                <span className='text-font'><b>{item.name}</b></span><br/>
                                <span className='text-font'>{item.date}, {item.time}</span><br/>
                                <div className='c-icon-profile'><Icon name='user circle'></Icon> <span>{item.assigned}</span></div>
                              </Grid.Column>
                            </Grid>
                          )

                        return result
                      }, [])
                    }
                    <Grid>
                      <Link
                        className='text-font mr20' onClick={_handleAllFacilityEvents}
                        style={{ color: 'blue', 'float': 'right' }}>
                      View More Events
                      </Link>
                    </Grid>
                  </>
                ) : (
                  <>
                    <span><b>Scheduled Events</b></span>
                    {
                      staffingEvents.items && staffingEvents.items.reduce((result, item, i) => {
                        if(i < 3)
                          result.push(
                            <Grid className='mt8' style={{ display: 'flex' }}>
                              <Grid.Column className='icon-style pt4' width={2}>
                                {
                                  item.type === 'training' && (
                                    <Label style={{ height: '20px', backgroundColor: '#fc9e19' }}></Label>)
                                }
                                {
                                  item.type === 'facility' && (
                                    <Label style={{ height: '20px', backgroundColor: '#306EFF' }}></Label>)
                                }
                                {
                                  item.type === 'daycare' && (
                                    <Label style={{ height: '20px', backgroundColor: '#9C44AD' }}></Label>)
                                }
                              </Grid.Column>
                              <Grid.Column className='icon-style pt0 pr0' width={13}>
                                <span className='text-font'><b>{item.name}</b></span><br/>
                                <span className='text-font'>{item.date}, {item.time}</span><br/>
                                <div className='c-icon-profile'><Icon name='user circle'></Icon> <span>{item.assigned}</span></div>
                              </Grid.Column>
                            </Grid>
                          )

                        return result
                      }, [])
                    }
                    <Grid>
                      <Link
                        className='text-font mr20' onClick={_handleAllStaffingEvents}
                        style={{ color: 'blue', 'float': 'right' }}>
                      View More Events
                      </Link>
                    </Grid>
                  </>
                )
              }

            </Grid.Column>

            <Grid.Column className='calendar-margin-top pr0' style={{ display: 'flex', justifyContent: 'flex-end' }} width={8}>
              <DayPicker
                fixedWeeks/>
            </Grid.Column>
          </Grid>
        </div>
      </Card>

      <CalendarModal/>
      <FacilityModal/>
      <StaffingModal/>
    </>
  )
}

export default  compose(
  connect(
    state => ({
      calendarDetail: dashboardCalendarDetailDuck.selectors.detail(state),
      facilityDetail: dashboardFacilityDetailDuck.selectors.detail(state),
      staffingDetail: dashboardStaffingDetailDuck.selectors.detail(state),
      facilityEvents: dashboardFacilityDuck.selectors.list(state),
      staffingEvents: dashboardStaffingDuck.selectors.list(state)
    }), {
      getFacilityEvents: dashboardFacilityDuck.creators.get,
      getStaffingEvents: dashboardFacilityDuck.creators.get,
      setItem          : dashboardCalendarDetailDuck.creators.setItem,
      setFacilityItem  : dashboardFacilityDetailDuck.creators.setItem,
      setStaffingItem  : dashboardStaffingDetailDuck.creators.setItem
    })
)(Calendar)
