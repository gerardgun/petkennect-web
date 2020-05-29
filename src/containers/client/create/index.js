import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { destroy } from 'redux-form'
import { Icon, Label, Menu, Tab } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ClientSection, { formIds } from './ClientSection'
import DocumentSection from './DocumentSection'
import PetSection from './PetSection'

import clientDetailDuck from '@reducers/client/detail'
import clientDocumentDuck from '@reducers/client/document'
import clientCommentDuck from '@reducers/client/comment'
import clientPetDuck from '@reducers/client/pet'

const ClientCreate = props => {
  const {
    clientPet,
    clientDocument,
    match,
    destroy,
    get,
    resetItem,
    getDocuments,
    getComments,
    getPets
  } = props

  useEffect(() => {
    if(isUpdating) {
      get(match.params.client)
      getDocuments({
        client_id: match.params.client
      })
      getComments({
        client_id: match.params.client
      })
      getPets({
        client_id: match.params.client
      })
    }

    return () => {
      destroy(...formIds)
      resetItem()
    }
  }, [ match.params.client ])

  const isUpdating = match.params.client

  return (
    <Layout>
      <Tab
        className='detail-view-tab'
        menu={{ color: 'teal', tabular: true, attached: true }}
        panes={[
          {
            menuItem: { key: 'user', icon: 'user', content: 'Client Info' },
            render  : () => <ClientSection/>
          },
          {
            menuItem: (
              <Menu.Item key='pets'>
                <Icon name='paw'/> Pets <Label>{clientPet.items.length}</Label>
              </Menu.Item>
            ),
            render: () => <PetSection/>
          },
          {
            menuItem: (
              <Menu.Item key='invoices'>
                <Icon name='file outline'/> Invoices/Billing <Label>4</Label>
              </Menu.Item>
            ),
            render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
          },
          {
            menuItem: (
              <Menu.Item key='documents'>
                <Icon name='file alternate outline'/> Documents <Label>{clientDocument.items.length}</Label>
              </Menu.Item>
            ),
            render: () => <DocumentSection/>
          },
          {
            menuItem: { key: 'portal', icon: 'tty', content: 'Client Portal' },
            render  : () => <Tab.Pane>Tab 5 Content</Tab.Pane>
          }
        ]}/>
    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      clientDetail  : clientDetailDuck.selectors.detail(state),
      clientPet     : clientPetDuck.selectors.list(state),
      clientDocument: clientDocumentDuck.selectors.list(state)
    }),
    {
      destroy,
      get         : clientDetailDuck.creators.get,
      resetItem   : clientDetailDuck.creators.resetItem,
      getDocuments: clientDocumentDuck.creators.get,
      getComments : clientCommentDuck.creators.get,
      getPets     : clientPetDuck.creators.get
    }
  )
)(ClientCreate)
