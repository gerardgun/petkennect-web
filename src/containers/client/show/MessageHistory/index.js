import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Header, Button, Segment } from 'semantic-ui-react'

import Table from '@components/Table'

import clientEmailMessageDuck from '@reducers/client/email-message'

const ClientEmailMessage = ({ ...props }) => {
  useEffect(() => {
    props.getEmailMessages()
  }, [])

  return (
    <>
      <Segment style={{ boxShadow: 'none', border: 'none' }}>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Message History</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              color='teal' content='Compose' icon='edit'/>
          </Grid.Column>
        </Grid>
        <Table
          duck={clientEmailMessageDuck}/>
      </Segment>

    </>
  )
}

export default compose(
  connect(
    ({ clientEmailMessage }) => ({
      clientEmailMessage

    }), {
      getEmailMessages: clientEmailMessageDuck.creators.get
    })
)(ClientEmailMessage)
