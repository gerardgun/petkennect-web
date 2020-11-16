import React from 'react'
import { Header , Grid, Container } from 'semantic-ui-react'

import Table from '@components/Table'

import declinedClientsDuck from '@reducers/online-request/declined-client'

function DeclinedClients() {
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
          <Header as='h2'>Declined Clients</Header>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv28 ui-table-overflow'>
        <Table
          duck={declinedClientsDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
    </Container>
  )
}

export default (DeclinedClients)

