import React from 'react'
import { Header , Grid, Container } from 'semantic-ui-react'

import Table from '@components/Table'

import confirmReservationsDuck from '@reducers/online-request/confirm-reservation'

function ConfirmReservations() {
  const _handleRowClick = () => {
    // wip
  }
  const _handleRowOptionClick = () => {
    // wip
  }

  return (
    <Container className='c-booking' fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column
          verticalAlign='middle'>
          <Header as='h2'>Confirm Reservations</Header>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv28 ui-table-overflow'>
        <Table
          duck={confirmReservationsDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
    </Container>
  )
}

export default (ConfirmReservations)

