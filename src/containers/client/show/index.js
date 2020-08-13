import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Segment, Header, Image, Label, Menu, Breadcrumb, Dropdown } from 'semantic-ui-react'
import _get from 'lodash/get'

import Layout from '@components/Common/Layout'
import Message from '@components/Message'
import AgreementSection from './AgreementSection'
import CommentSection from './CommentSection'
import DocumentSection from './DocumentSection'
import InformationSection from './InformationSection'
import PetSection from './PetSection'
import { defaultImageUrl } from '@lib/constants'

import clientDetailDuck from '@reducers/client/detail'
import clientCommentDuck from '@reducers/client/comment'
import clientDocumentDuck from '@reducers/client/document'
import clientPetDuck from '@reducers/client/pet'
import clientAgreementDuck from '@reducers/client/agreement'

import './../styles.scss'

const ClientShow = ({ clientDetail, clientAgreement, clientComment, clientDocument, clientPet, ...props }) => {
  const [ activeMenuItem, setActiveMenuItem ] = useState('info')
  const { client: clientId } = useParams()
  const history = useHistory()

  useEffect(() => {
    props.getClient(clientId)
    props.getClientPets({
      client__id: clientId
    })
    props.getClientAgreements({
      client_id: clientId
    })
    props.getClientComments({
      client_id: clientId
    })
    props.getClientDocuments({
      client_id: clientId
    })

    return () => {
      props.resetItem()
      props.resetClientPets()
    }
  }, [])

  useEffect(() => {
    if(clientDetail.status === 'PUT') props.getClient(clientId)
  }, [ clientDetail.status ])

  useEffect(() => {
    if(clientDetail.status === 'DELETED')
      history.replace('/client')
  }, [ clientDetail.status ])

  const _handleBookBtnClick = () => {
    alert('Work in Progress...')
  }

  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  const _handleOptionDropdownChange = () => {
    alert('Work in Progress...')
  }

  const fullname = `${clientDetail.item.first_name || ''} ${clientDetail.item.last_name || ''}`

  return (
    <Layout>
      <Segment className='segment-content petkennect-profile'>
        <Grid>
          <Grid.Column className='petkennect-profile-sidebar p40' width={5}>
            <Breadcrumb>
              <Breadcrumb.Section>
                <Link to='/client'>Clients</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active>
                {fullname}
              </Breadcrumb.Section>
            </Breadcrumb>

            <div className='flex justify-center align-center mt40'>
              <div className='c-image-profile'>
                <Image circular src={clientDetail.item.thumbnail_path || defaultImageUrl}/>
              </div>
            </div>

            <div className='flex justify-between align-center mb24'>
              <div>
                <Header as='h2' className='mb4'>{fullname}</Header>
                <div className='flex align-center'>
                  <span style={{ color: '#888888' }}>{clientDetail.item.is_active ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <Dropdown
                direction='left'
                icon={null}
                onChange={_handleOptionDropdownChange}
                options={[
                  { key: 1, icon: 'download', value: 'download-profile', text: 'Download Profile' },
                  { key: 2, icon: 'paper plane outline', value: 'send-email', text: 'Send Email' }
                ]}
                selectOnBlur={false}
                trigger={(
                  <Button basic icon='ellipsis vertical'/>
                )}
                value={null}/>
            </div>

            <Button
              color='teal' content='Book!' fluid
              onClick={_handleBookBtnClick} size='large'/>

            {
              _get(clientDetail, 'item.summary.has_pending_agreements', false) && (
                <>
                  <br/>
                  <Message
                    content={
                      <Grid padded style={{ marginLeft: -16 }}>
                        <Grid.Column className='mb0 pb0' width='16'>
                          <div className='message__title'>Client hasn&apos;t signed agreements.</div>
                        </Grid.Column>
                      </Grid>
                    } type='warning'/>
                </>
              )
            }

            <Menu
              className='petkennect-profile-menu' color='teal' fluid
              vertical>
              <Menu.Item
                active={activeMenuItem === 'info'} link name='info'
                onClick={_handleMenuItemClick}>
                Client Info
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'pets'} link name='pets'
                onClick={_handleMenuItemClick}>
                Pets
                <Label color='teal'>{clientPet.pagination.meta.total_items || clientPet.items.length}</Label>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'comments'} link name='comments'
                onClick={_handleMenuItemClick}>
                Internal Comments
                <Label color='teal'>{clientComment.pagination.meta.total_items || clientComment.items.length}</Label>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'documents'} link name='documents'
                onClick={_handleMenuItemClick}>
                Documents
                <Label color='teal'>{clientDocument.pagination.meta.total_items || clientDocument.items.length}</Label>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'agreements'} link name='agreements'
                onClick={_handleMenuItemClick}>
                Agreements
                <Label color='teal'>{clientAgreement.items.length}</Label>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column className='petkennect-profile-body' width={11}>
            {activeMenuItem === 'info' && <InformationSection/>}
            {activeMenuItem === 'pets' && <PetSection/>}
            {activeMenuItem === 'comments' && <CommentSection/>}
            {activeMenuItem === 'documents' && <DocumentSection/>}
            {activeMenuItem === 'agreements' && <AgreementSection/>}
          </Grid.Column>
        </Grid>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      clientDetail   : clientDetailDuck.selectors.detail(state),
      clientAgreement: clientAgreementDuck.selectors.list(state),
      clientComment  : clientCommentDuck.selectors.list(state),
      clientDocument : clientDocumentDuck.selectors.list(state),
      clientPet      : clientPetDuck.selectors.list(state)
    }), {
      getClient          : clientDetailDuck.creators.get,
      getClientAgreements: clientAgreementDuck.creators.get,
      getClientComments  : clientCommentDuck.creators.get,
      getClientDocuments : clientDocumentDuck.creators.get,
      getClientPets      : clientPetDuck.creators.get,
      resetItem          : clientDetailDuck.creators.resetItem,
      resetClientPets    : clientPetDuck.creators.reset
    })
)(ClientShow)
