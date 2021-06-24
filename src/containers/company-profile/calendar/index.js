import React, { useEffect, useState } from 'react'
import authDuck from '@reducers/auth'

import locationDuck from '@reducers/location'
import companyProfileCalendarEventDetailDuck from '@reducers/company-profile/calendar/event/detail'
import companyProfileCalendarEventDuck from '@reducers/company-profile/calendar/event'
import Layout from '@components/Common/Layout'
import { Button, Grid, Header, Segment, Select } from 'semantic-ui-react'
import Menu from '@containers/company-profile/components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import CalendarEventFormModal from './event/create/form/modal'
import moment from 'moment'
import rrulePlugin from '@fullcalendar/rrule'
import './styles.scss'

const SetupCompanyProfileCalendarDetail = () => {
  const dispatch = useDispatch()
  const eventDetail = useSelector(
    companyProfileCalendarEventDetailDuck.selectors.detail
  )
  const { location: authLocation = '' } = useSelector(
    authDuck.selectors.detail
  )
  const { items: locationList } = useSelector(locationDuck.selectors.list)
  const [ location, setLocation ] = useState('')
  const [ calendarId, setCalendarId ] = useState('')
  const events = useSelector(companyProfileCalendarEventDuck.selectors.list)

  const _handleGetCalendarEvents = (loc) => {
    const locationSelected = locationList.filter(({ id }) => id === loc)
    const calendarId = locationSelected[0].employee_schedule.id
    setCalendarId(calendarId)
    dispatch(
      companyProfileCalendarEventDuck.creators.get({
        calendarId: locationSelected[0].employee_schedule.id
      })
    )
  }

  useEffect(() => {
    if(authLocation && locationList.length > 0) {
      setLocation(authLocation)
      _handleGetCalendarEvents(authLocation)
    }
  }, [ authLocation, locationList ])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(eventDetail.status))
      dispatch(companyProfileCalendarEventDuck.creators.get({ calendarId }))
  }, [ eventDetail.status ])

  const _handleAddEvent = () => {
    dispatch(
      companyProfileCalendarEventDetailDuck.creators.setItem(
        { calendarId },
        'CREATE'
      )
    )
  }
  const _handleChangeLocation = (event, { value }) => {
    setLocation(value)
    _handleGetCalendarEvents(value)
  }

  const _handleUpdateEvent = (event) => {
    const { extendedProps } = event
    dispatch(
      companyProfileCalendarEventDetailDuck.creators.setItem(
        {
          ...extendedProps,
          calendarId,
          id        : event.id,
          color     : event.backgroundColor,
          start_date: moment(
            extendedProps.started_at,
            'YYYY-MM-DD[T]HH:mm:ssZ'
          ).format('YYYY-MM-DD'),
          start_time: moment(
            extendedProps.started_at,
            'YYYY-MM-DD[T]HH:mm:ssZ'
          ).format('HH:mm'),
          end_date: moment(
            extendedProps.ended_at,
            'YYYY-MM-DD[T]HH:mm:ssZ'
          ).format('YYYY-MM-DD'),
          end_time: moment(
            extendedProps.ended_at,
            'YYYY-MM-DD[T]HH:mm:ssZ'
          ).format('HH:mm')
        },
        'UPDATE'
      )
    )
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Menu/>
        <Grid.Row>
          <Grid
            className='flex flex-row mv40 justify-between'
            verticalAlign='middle'>
            <Grid className='align-center'>
              <Header as='h3' className='m0'>
                Location:
              </Header>
              <Select
                onChange={_handleChangeLocation}
                options={locationList
                  .filter(({ employee_schedule }) => employee_schedule)
                  .map(({ id, name }) => {
                    return {
                      value: id,
                      text : name
                    }
                  })}
                placeholder='Select location'
                value={location}/>
            </Grid>
            <Button
              color='teal'
              content='New Event'
              icon='plus'
              onClick={_handleAddEvent}/>
          </Grid>
          <FullCalendar
            eventClassNames={'calendar-event'}
            eventClick={(e) => _handleUpdateEvent(e.event)}
            events={events.items}
            headerToolbar={{
              left  : 'prev,next',
              center: 'title',
              right : 'timeGridDay, timeGridWeek, dayGridMonth'
            }}
            initialView='dayGridMonth'
            nowIndicator
            plugins={[ rrulePlugin, dayGridPlugin, timeGridPlugin ]}
            stickyHeaderDates/>
        </Grid.Row>
        <CalendarEventFormModal/>
      </Segment>
    </Layout>
  )
}

export default SetupCompanyProfileCalendarDetail
