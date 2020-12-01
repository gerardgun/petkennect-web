import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from '@hooks/Shared'

import NotificationFormSendModal from '@containers/notification/send/modal'
import NotificationForm from './create'

import clientDocumentDuck from '@reducers/client/document'
import clientDocumentDetailDuck from '@reducers/client/document/detail'

import notificationDuck from '@reducers/notification'
import notificationDetailDuck from '@reducers/notification/detail'

const NotificationList = ({ clientDocument, notification, notificationDetail ,...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getNotifications, notificationDetail.status)

  useEffect(() => {
    props.getNotifications()
  }, [])

  const _handleNewBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleOptionClick = option => {
    switch (option) {
      case 'delete':
        props.setItem(notification.selector.selected_items[0], 'DELETE')
        _handleOpen()

        return
      case 'send_email':
        props.setEmailItem(clientDocument.selector.selected_items[0], 'SEND')

        return
      default:
        return
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2'>Notifications </Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={14} tablet={8}>
            <Button color='teal' content='Add Notification' onClick={_handleNewBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={notificationDuck}
          onOptionClick={_handleOptionClick}/>
      </Segment>

      <NotificationFormSendModal/>
      <ModalDelete
        duckDetail={notificationDetailDuck}
        onClose={_handleClose}
        open={open}/>
      <NotificationForm/>
    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      clientDocument      : clientDocumentDuck.selectors.list(state),
      clientDocumentDetail: clientDocumentDetailDuck.selectors.detail(state),
      notification        : notificationDuck.selectors.list(state),
      notificationDetail  : notificationDetailDuck.selectors.detail(state)
    }),
    {
      getNotifications: notificationDuck.creators.get,
      setItem         : notificationDetailDuck.creators.setItem,
      setEmailItem    : clientDocumentDetailDuck.creators.setItem
    })
)(NotificationList)
