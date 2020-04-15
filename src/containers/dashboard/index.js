import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Layout'
import Table from '@components/Table'

import clientDuck from '@reducers/client'

import './dashboard.scss'

const Dashboard = ({ client, ...props }) => {
  useEffect(() => {
    props.getClients()
  }, [])

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Dashboard</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button content='Download' icon='cloud download' labelPosition='left' />
            <Button content='Filter' icon='filter' labelPosition='left' />
            {
              client.selector.selected_items.length > 0 && (<Button color='google plus' content='Delete' />)
            }
            <Button as={Link} color='teal' content='New Client' to='/client/create' />
          </Grid.Column>
        </Grid>
        <Table duck={clientDuck} />
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    ({ client }) => ({
      client
    }),
    {
      getClients: clientDuck.creators.get
    }
  )
)(Dashboard) 
