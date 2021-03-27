import React from 'react'
import { Grid, Header, Icon, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import config from '@lib/constants/list-configs/online-request/cancellation-log'

import cancellationLogsDuck from '@reducers/online-request/cancellation-log'

function CancellationLogs() {
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

          <p>
            <Icon name='flag outline'/>
            <span>Ready</span>
          </p>

          <Table
            config={config}
            duck={cancellationLogsDuck}/>

          <p>
            <Icon name='flag outline'/>
            <span>Unfinished</span>
          </p>

          <Table
            config={config}
            duck={cancellationLogsDuck}/>

        </div>
      </Segment>
    </Layout>
  )
}

export default (CancellationLogs)

