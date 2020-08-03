import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import ClientCreateForm from './create'

import clientDuck from '@reducers/client'
import clientDetailDuck from '@reducers/client/detail'
import locationDuck from '@reducers/location'
import zipDetailDuck from '@reducers/zip/detail'

const Client = ({ client, clientDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    if(clientDetail.status === 'DELETED') props.getClients()
  }, [ clientDetail.status ])

  useEffect(() => {
    props.getClients()
    props.getLocations()
  }, [])

  const _handleNewClick = () => {
    props.setItem(null, 'CREATE')
    props.setZip()
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(client.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Clients</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button color='teal' content='New Client' onClick={_handleNewClick}/>
          </Grid.Column>
        </Grid>

        <Table duck={clientDuck} onOptionClick={_handleOptionClick}/>
      </Segment>

      <ClientCreateForm/>
      <ModalDelete
        duckDetail={clientDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ client, ...state }) => ({
      client,
      clientDetail: clientDetailDuck.selectors.detail(state)
    }),
    {
      getClients  : clientDuck.creators.get,
      getLocations: locationDuck.creators.get,
      setItem     : clientDetailDuck.creators.setItem,
      setZip      : zipDetailDuck.creators.setItem
    }
  )
)(Client)
