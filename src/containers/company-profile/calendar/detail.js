import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import companyProfileCalendarDetailDuck from '@reducers/company-profile/calendar/detail'
import companyProfileCalendarEventDetailDuck from '@reducers/company-profile/calendar/event/detail'
import companyProfileCalendarEventDuck from '@reducers/company-profile/calendar/event'
import Layout from '@components/Common/Layout'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'
import Menu from '@containers/company-profile/components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import CalendarEventFormModal from './event/create/form/modal'
import moment from 'moment'
import rrulePlugin from '@fullcalendar/rrule'

const SetupCompanyProfileCalendarDetail = () => {
  const { calendarId } = useParams()
  const dispatch = useDispatch()
  const detail = useSelector(companyProfileCalendarDetailDuck.selectors.detail)
  const eventDetail = useSelector(
    companyProfileCalendarEventDetailDuck.selectors.detail
  )
  const events = useSelector(companyProfileCalendarEventDuck.selectors.list)

  useEffect(() => {
    // calendar detail
    dispatch(companyProfileCalendarDetailDuck.creators.get(calendarId))
    // events list
    dispatch(companyProfileCalendarEventDuck.creators.get({ calendarId }))

    return () => {}
  }, [])

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

  const _handleUpdateEvent = (event) => {
    const { extendedProps } = event
    dispatch(
      companyProfileCalendarEventDetailDuck.creators.setItem(
        {
          ...extendedProps,
          calendarId,
          id        : event.id,
          color     : event.backgroundColor,
          start_date: moment(extendedProps.started_at, 'YYYY-MM-DD[T]HH:mm:ssZ').format('YYYY-MM-DD'),
          start_time: moment(extendedProps.started_at, 'YYYY-MM-DD[T]HH:mm:ssZ').format('HH:mm'),
          end_date  : moment(extendedProps.ended_at, 'YYYY-MM-DD[T]HH:mm:ssZ').format('YYYY-MM-DD'),
          end_time  : moment(extendedProps.ended_at, 'YYYY-MM-DD[T]HH:mm:ssZ').format('HH:mm')
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
            {' '}
            <Header as='h2'>{detail.item.name}</Header>
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
