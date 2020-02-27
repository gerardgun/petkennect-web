import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import clientDuck from '@reducers/client'
import clientDetailDuck from '@reducers/client/detail'

const Client = ({ client, ...props }) => {
  const [ open, { handleOpen, handleClose } ] = useModal()

  useEffect(() => {
    props.getClients()
  }, [])

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Clients</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button content='Download' />
            <Button content='Filter' icon='filter' labelPosition='left' />
            {
              client.selector.selected_items.length > 0 && (<Button color='google plus' content='Delete' onClick={handleOpen} />)
            }
            <Button as={Link} color='teal' content='New Client' to='/client/create' />
          </Grid.Column>
        </Grid>
        <Table duck={clientDuck} />
      </Segment>

      <ModalDelete
        duck={clientDuck}
        duckDetail={clientDetailDuck}
        onClose={handleClose}
        open={open} />

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
)(Client) 
