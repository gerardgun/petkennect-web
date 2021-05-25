import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Modal, Grid } from 'semantic-ui-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

// import Table from '@components/Table'
// import dashboardStaffingListConfig from '@lib/constants/list-configs/dashboard/calendar/staffing'
import dashboardStaffingDuck from '@reducers/dashboard/calendar/staffing'
import dashboardStaffingDetailDuck from '@reducers/dashboard/calendar/staffing/detail'

const StaffingModal = (props) => {
  const {
    staffingDetail
  } = props

  useEffect(() => {
    props.getdashboardStaffings()
  }, [])

  const getIsOpened = (mode) => mode === 'READ'

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(staffingDetail.mode), [
    staffingDetail.mode
  ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}>
      <Modal.Content>
        <Header as='h2' content='Schedule Events'/>
        <Grid>
          <Grid.Column className='calendar-modal-style' computer={16}>
            <FullCalendar
              plugins={[ dayGridPlugin ]}
              weekends={true}/>
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
      const staffingDetail = dashboardStaffingDetailDuck.selectors.detail(state)

      return {
        staffingDetail,
        staffing: dashboardStaffingDuck.selectors.list(state)
      }
    },
    {
      getdashboardStaffings: dashboardStaffingDuck.creators.get,
      post                 : dashboardStaffingDetailDuck.creators.post,
      put                  : dashboardStaffingDetailDuck.creators.put,
      resetItem            : dashboardStaffingDetailDuck.creators.resetItem
    }
  )
)(StaffingModal)
