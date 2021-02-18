import React from 'react'
import { Header , Grid, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
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
    <Layout>
      <Segment className='segment-content c-booking' padded='very'>
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
      </Segment>
    </Layout>
  )
}

export default (CancellationLogs)

