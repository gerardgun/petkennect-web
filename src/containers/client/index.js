import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import ClientFormModal from './form/modal'

import clientDuck from '@reducers/client'
import clientDetailDuck from '@reducers/client/detail'

const Client = ({ client, clientDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getClients()
  }, [])

  useEffect(() => {
    if(clientDetail.status === 'DELETED') props.getClients()
  }, [ clientDetail.status ])

  const _handleNewBtnClick = () => {
    props.setItem(null, 'CREATE')
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
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>Clients</Header>
          </Grid.Column>
          <Grid.Column
            computer={12} mobile={9} tablet={12}
            textAlign='right'>
            <Button color='teal' content='New Client' onClick={_handleNewBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table duck={clientDuck} onOptionClick={_handleOptionClick}/>
      </Segment>

      <ClientFormModal/>
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
      getClients: clientDuck.creators.get,
      setItem   : clientDetailDuck.creators.setItem
    }
  )
)(Client)
