import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Table from '@components/Table'

import organizationDuck from '@reducers/organization'

const Organization = props => {
  useEffect(() => {
    props.getOrganizations()
  }, [])

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Organizations</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              as={Link} color='teal' content='New Organization'
              to='/organization/create'/>
          </Grid.Column>
        </Grid>
        <Table duck={organizationDuck}/>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    ({ organization }) => ({
      organization
    }),
    {
      getOrganizations: organizationDuck.creators.get
    }
  )
)(Organization)
