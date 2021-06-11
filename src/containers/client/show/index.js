import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import {
  Button,
  Grid,
  Message,
  Segment,
  Header,
  Icon,
  Image,
  Label,
  Menu,
  Breadcrumb,
  Dropdown
} from 'semantic-ui-react'

import loadable from '@loadable/component'

import clientDetailDuck from '@reducers/client/detail'
import clientCommentDuck from '@reducers/client/comment'
import clientDocumentDuck from '@reducers/client/document'
import clientPetDuck from '@reducers/client/pet'
import clientAgreementDuck from '@reducers/client/agreement'
import petReservationCheckInDetailDuck from '@reducers/pet/reservation/express-check-in/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import './../styles.scss'

const Layout = loadable(() => import('@components/Common/Layout'))
const AgreementSection = loadable(() => import('./AgreementSection'))
const CommentSection = loadable(() => import('./CommentSection'))
const DocumentSection = loadable(() => import('./DocumentSection'))
const InformationSection = loadable(() => import('./InformationSection'))
const PetSection = loadable(() => import('./PetSection'))
const ReservesSection = loadable(() => import('./ReservesSection'))
const MessageHistorySection = loadable(() => import('./MessageHistory'))
const AccountingSection = loadable(() => import('./Accounting'))
const ExpressCheckInForm = loadable(() =>
  import('../../pet/form/express-check-in')
)

const ClientShow = ({
  clientDetail,
  clientAgreement,
  clientComment,
  clientDocument,
  clientPet,
  ...props
}) => {
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

    if(history.location.state)
      history.location.state.option === 'reserves'
        && setActiveMenuItem('reserves')

    return () => {
      props.resetItem()
      props.resetClientPets()
      props.resetClientComments()
    }
  }, [])

  useEffect(() => {
    if(clientDetail.status === 'PUT') props.getClient(clientId)
  }, [ clientDetail.status ])

  useEffect(() => {
    if(clientDetail.status === 'DELETED') history.replace('/client')
  }, [ clientDetail.status ])

  const _handleBookBtnClick = () => {
    history.replace(`/client/${clientId}/book`)
    props.resetReserveItem()
  }

  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  const _handleMessageClick = () => setActiveMenuItem('agreements')

  // eslint-disable-next-line no-unused-vars
  const _handleOptionDropdownChange = (e, { value }) => {}

  const _handleExpressCheckInBtnClick = () => {
    props.setReservationCheckInItem(
      { client: clientPet.items[0].client },
      'CREATE'
    )
  }

  const fullname = `${clientDetail.item.first_name || ''} ${
    clientDetail.item.last_name || ''
  }`

  const status
    = clientDetail.item.status == 'Decline Client' ? (
      <Icon
        name='user circle'
        style={{ color: 'red', fontSize: '35px' }}></Icon>
    ) : clientDetail.item.status == 'VIP Client' ? (
      <Icon
        name='user circle'
        style={{ color: 'green', fontSize: '35px' }}></Icon>
    ) : clientDetail.item.status == 'Caution' ? (
      <Icon
        name='user circle'
        style={{ color: 'yellow', fontSize: '35px' }}></Icon>
    ) : clientDetail.item.status == 'Active' ? (
      <Icon
        name='user circle'
        style={{ color: 'gray', fontSize: '35px' }}></Icon>
    ) : null

  return (
    <Layout>
      <Segment className='segment-content petkennect-profile'>
        <Grid>
          <Grid.Column
            className='petkennect-profile-sidebar p32'
            computer={5}
            mobile={16}
            tablet={16}>
            <Breadcrumb>
              <Breadcrumb.Section>
                <Link to='/client'>Clients</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active>{fullname}</Breadcrumb.Section>
            </Breadcrumb>

            <div className='flex justify-center align-center mt40'>
              {clientDetail.item.thumbnail_path ? (
                <>
                  <div className='c-image-profile'>
                    <Image circular src={clientDetail.item.thumbnail_path}/>
                  </div>
                </>
              ) : (
                <div className='c-icon-profile'>
                  <Icon name='user circle'></Icon>
                </div>
              )}
            </div>

            <div className='flex justify-between align-center mb24'>
              <div>
                <Header as='h2' className='mb4'>
                  {fullname}
                </Header>
                <div className='flex align-center'>
                  <span>{status}</span>
                </div>
              </div>
              <Dropdown
                direction='left'
                icon={null}
                onChange={_handleOptionDropdownChange}
                options={[
                  {
                    key  : 1,
                    icon : 'download',
                    value: 'download-profile',
                    text : 'Download Profile'
                  }
                ]}
                selectOnBlur={false}
                trigger={<Button basic icon='ellipsis vertical'/>}
                value={null}/>
            </div>

            <Button
              color='teal'
              content='Book!'
              // disabled={clientDetail.item.summary ? clientDetail.item.summary.has_pending_agreements : false }
              fluid
              onClick={_handleBookBtnClick}
              size='large'/>
            <Button
              className='mt8'
              color='teal'
              content='Check In'
              disabled={
                clientDetail.item.summary
                  ? clientDetail.item.summary.has_pending_agreements
                  : false
              }
              fluid
              onClick={_handleExpressCheckInBtnClick}
              size='large'/>

            {(clientDetail.item.summary
              ? clientDetail.item.summary.has_pending_agreements
              : false) && (
              <Message
                content={
                  <>
                    <span>Client hasn&apos;t signed agreements.</span>{' '}
                    <a onClick={_handleMessageClick}>Update here.</a>
                  </>
                }
                icon='warning circle'
                warning/>
            )}

            <Menu
              className='petkennect-profile-menu'
              color='teal'
              fluid
              vertical>
              <Menu.Item
                active={activeMenuItem === 'info'}
                link
                name='info'
                onClick={_handleMenuItemClick}>
                Client Info
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'pets'}
                link
                name='pets'
                onClick={_handleMenuItemClick}>
                Pets
                <Label color='teal'>
                  {clientPet.pagination.meta.total_items
                    || clientPet.items.length}
                </Label>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'comments'}
                link
                name='comments'
                onClick={_handleMenuItemClick}>
                Internal Comments
                {clientComment.pending_comments.length > 0 ? (
                  <Icon color='orange' name='warning circle' size='large'/>
                ) : (
                  <Label color='teal'>
                    {clientComment.pagination.meta.total_items
                      || clientComment.items.length}
                  </Label>
                )}
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'documents'}
                link
                name='documents'
                onClick={_handleMenuItemClick}>
                Documents
                <Label color='teal'>
                  {clientDocument.pagination.meta.total_items
                    || clientDocument.items.length}
                </Label>
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'agreements'}
                link
                name='agreements'
                onClick={_handleMenuItemClick}>
                Agreements
                {(
                  clientDetail.item.summary
                    ? clientDetail.item.summary.has_pending_agreements
                    : false
                ) ? (
                    <Icon color='orange' name='warning circle' size='large'/>
                  ) : (
                    <Label color='teal'>{clientAgreement.items.length}</Label>
                  )}
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'reserves'}
                link
                name='reserves'
                onClick={_handleMenuItemClick}>
                Service History
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'email_messages'}
                link
                name='email_messages'
                onClick={_handleMenuItemClick}>
                Email Messages
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'accounting'}
                link
                name='accounting'
                onClick={_handleMenuItemClick}>
                Accounting
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            className='petkennect-profile-body'
            computer={11}
            mobile={16}
            tablet={16}>
            {activeMenuItem === 'info' && <InformationSection/>}
            {activeMenuItem === 'pets' && <PetSection/>}
            {activeMenuItem === 'comments' && <CommentSection/>}
            {activeMenuItem === 'documents' && <DocumentSection/>}
            {activeMenuItem === 'agreements' && <AgreementSection/>}
            {activeMenuItem === 'reserves' && <ReservesSection/>}
            {activeMenuItem === 'email_messages' && <MessageHistorySection/>}
            {activeMenuItem === 'accounting' && <AccountingSection/>}
          </Grid.Column>
        </Grid>
      </Segment>

      <ExpressCheckInForm/>
    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      clientDetail   : clientDetailDuck.selectors.detail(state),
      clientAgreement: clientAgreementDuck.selectors.list(state),
      clientComment  : clientCommentDuck.selectors.list(state),
      clientDocument : clientDocumentDuck.selectors.list(state),
      clientPet      : clientPetDuck.selectors.list(state)
    }),
    {
      getClient                : clientDetailDuck.creators.get,
      getClientAgreements      : clientAgreementDuck.creators.get,
      getClientComments        : clientCommentDuck.creators.get,
      getClientDocuments       : clientDocumentDuck.creators.get,
      getClientPets            : clientPetDuck.creators.get,
      setReservationCheckInItem:
        petReservationCheckInDetailDuck.creators.setItem,
      resetItem          : clientDetailDuck.creators.resetItem,
      resetClientComments: clientCommentDuck.creators.reset,
      resetClientPets    : clientPetDuck.creators.reset,
      resetReserveItem   : petReservationDetailDuck.creators.resetItem
    }
  )
)(ClientShow)
