import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Input } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import ClientCreateForm from './create'

import clientDuck from '@reducers/client'
import clientDetailDuck from '@reducers/client/detail'
import zipDetailDuck from '@reducers/zip/detail'
import { useDebounceText } from '@hooks/Shared'

const Client = ({ client, clientDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    if(clientDetail.status === 'DELETED') props.getClients()
  }, [ clientDetail.status ])

  useEffect(() => {
    props.getClients()
  }, [])

  const { _handleChangeText } = useDebounceText((text)=> {
    props.setFilters({ search: text })
    props.getClients()
  })

  const _handleNewClick = () => {
    props.setItem(null, 'CREATE')
    props.setZip()
  }

  const _handleRowOptionClick = (option, item) => {
    if(option === 'edit')
      props.history.push(`client/edit/${item.id}`)
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Clients</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              as={Link} color='teal' content='New Client'
              onClick={_handleNewClick}/>
          </Grid.Column>

          <Grid.Column textAlign='left' width={2} >
            <Button disabled icon='ellipsis vertical'/>
          </Grid.Column>
          <Grid.Column textAlign='right' width={14}>
            <Input
              icon='search' iconPosition='left'
              onChange={_handleChangeText}
              placeholder='Search by name or email'/>
            <Button
              className='ml16' content='Filter' disabled
              icon='filter'
              labelPosition='left'/>
            {
              client.selector.selected_items.length > 0 && (<Button color='google plus' content='Delete' onClick={_handleOpen}/>)
            }
          </Grid.Column>
        </Grid>
        <ClientCreateForm/>
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
      setItem   : clientDetailDuck.creators.setItem,
      setZip    : zipDetailDuck.creators.setItem,
      setFilters: clientDuck.creators.setFilters
    }
  )
)(Client)
