import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import loadable from '@loadable/component'

import clientDuck from '@reducers/client'
import clientDetailDuck from '@reducers/client/detail'
import ClientFormModal from './form/modal'
import clientListConfig from '@lib/constants/list-configs/client'

const Layout = loadable(() => import('@components/Common/Layout'))
const ModalDelete = loadable(() => import('@components/Modal/Delete'))
const Table = loadable(() => import('@components/Table'))

const Client = ({ client, clientDetail, ...props }) => {
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
    if(option === 'delete')
      props.setItem(client.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid columns={2} style={{ 'margin-bottom': '1.2rem' }}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>Clients</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={9} tablet={12}>
            <Button color='teal' content='New Client' onClick={_handleNewBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table config={clientListConfig} duck={clientDuck} onOptionClick={_handleOptionClick}/>
      </Segment>

      <ClientFormModal/>
      <ModalDelete duckDetail={clientDetailDuck}/>

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
