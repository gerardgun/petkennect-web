import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import clientDuck from '@reducers/client'
import clientDetailDuck from '@reducers/client/detail'
import zipDetailDuck from '@reducers/zip/detail'

const Client = ({ client, clientDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    if(clientDetail.status === 'DELETED') props.getClients()
  }, [ clientDetail.status ])

  useEffect(() => {
    props.getClients()
  }, [])

  const _handleNewClick = () => {
    props.setZip()
  }

  const _handleRowOptionClick = (option, item) => {
    if(option === 'edit')
      props.history.push(`client/${item.id}`)
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2' className='cls-MainHeader'>Clients</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              className='cls-cancelButton'
              content='Download' disabled icon='cloud download'
              labelPosition='left'/>
            <Button
              className='cls-cancelButton'
              content='Filter' disabled icon='filter'
              labelPosition='left'/>
            {
              client.selector.selected_items.length > 0 && (<Button color='google plus' content='Delete' onClick={_handleOpen}/>)
            }
            <Button
              as={Link} className='cls-saveButton' color='teal'
              content='New Client'
              onClick={_handleNewClick}
              to='/client/create'/>
          </Grid.Column>
        </Grid>
        <Table
          duck={clientDuck}
          onRowOptionClick={_handleRowOptionClick}/>
      </Segment>

      <ModalDelete
        duck={clientDuck}
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
      setZip    : zipDetailDuck.creators.setItem
    }
  )
)(Client)
