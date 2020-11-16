import React from 'react'
import { Header , Grid, Container } from 'semantic-ui-react'

import Table from '@components/Table'

import cancellationLogsDuck from '@reducers/online-request/cancellation-log'

function CancellationLogs() {
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
          <Header as='h2'>Cancellation Logs</Header>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv28 ui-table-overflow'>
        <Table
          duck={cancellationLogsDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
    </Container>
  )
}

export default (CancellationLogs)

