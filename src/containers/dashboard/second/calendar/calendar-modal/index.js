import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Modal, Grid } from 'semantic-ui-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import dashboardCalendarDetailDuck from '@reducers/dashboard/calendar/staffing/detail'

const CalendarModal = (props) => {
  const {
    calendarDetail
  } = props

  const getIsOpened = (mode) => mode === 'CREATE'

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(calendarDetail.mode), [
    calendarDetail.mode
  ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}>
      <Modal.Content>
        <Header as='h2' content='New Calendar'/>
        <Grid>
          <Grid.Column className='calendar-modal-style' computer={16}>
            <FullCalendar
              plugins={[ dayGridPlugin ]}
              weekends={true}/>
          </Grid.Column>
          <Grid.Column computer={16} textAlign='right'>
            <Button content='Cancel' onClick={_handleClose}/>
            <Button color='teal' content='Save' onClick={_handleClose}/>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    (state) => {
      const calendarDetail = dashboardCalendarDetailDuck.selectors.detail(state)

      return {
        calendarDetail
      }
    },
    {
      post     : dashboardCalendarDetailDuck.creators.post,
      put      : dashboardCalendarDetailDuck.creators.put,
      resetItem: dashboardCalendarDetailDuck.creators.resetItem
    }
  )
)(CalendarModal)
