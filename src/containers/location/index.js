import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Layout'
import Table from '@components/Table'

import locationDuck from '@reducers/location'

const Location = props => {
  useEffect(() => {
    props.getLocations()
  }, [])

  const _handleRowOptionClick = (option, item) => {
    if(option === 'edit')
      props.history.push(`location/${item.id}`)
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Locations</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              content='Download' disabled icon='cloud download'
              labelPosition='left'/>
            <Button
              as={Link} color='teal' content='New Location'
              to='/location/create'/>
          </Grid.Column>
        </Grid>
        <Table
          duck={locationDuck}
          onRowOptionClick={_handleRowOptionClick}/>
      </Segment>

    </Layout>
  )
}

export default compose(
  connect(
    ({ location }) => ({
      location
    }),
    {
      getLocations: locationDuck.creators.get
    }
  )
)(Location)
