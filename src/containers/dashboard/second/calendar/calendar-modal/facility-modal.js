import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Modal, Grid } from 'semantic-ui-react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

// import Table from '@components/Table'
// import dashboardFacilityListConfig from '@lib/constants/list-configs/dashboard/calendar/facility'
import dashboardFacilityDuck from '@reducers/dashboard/calendar/facility'
import dashboardFacilityDetailDuck from '@reducers/dashboard/calendar/facility/detail'

const FacilityModal = (props) => {
  const {
    facilityDetail
  } = props

  useEffect(() => {
    props.getdashboardFacilities()
  }, [])

  const getIsOpened = (mode) => mode === 'READ'

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(facilityDetail.mode), [
    facilityDetail.mode
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
      const facilityDetail = dashboardFacilityDetailDuck.selectors.detail(state)

      return {
        facilityDetail,
        facility: dashboardFacilityDuck.selectors.list(state)
      }
    },
    {
      getdashboardFacilities: dashboardFacilityDuck.creators.get,
      post                  : dashboardFacilityDetailDuck.creators.post,
      put                   : dashboardFacilityDetailDuck.creators.put,
      resetItem             : dashboardFacilityDetailDuck.creators.resetItem
    }
  )
)(FacilityModal)
