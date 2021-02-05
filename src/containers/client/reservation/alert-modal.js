import React from 'react'

import { Button, Icon, Header, Modal } from 'semantic-ui-react'

const AlertModal = props => {
  const {
    isOpened,
    onReply
  } = props

  const _handleConfirmClick = () =>{
    onReply()
  }

  return (
    <Modal
      className='ui-delete-modal'
      open={isOpened}
      size='small'>
      <Modal.Content style={{ textAlign: 'center', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <Icon
          circular color='blue' name='info circle'
          size='big' style={{ backgroundColor: 'blue', boxShadow: 'none', fontSize: '2.5rem' }}/>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Header as='h2' style={{ fontWeight: 500 }}>
        No Variation Exists!
        </Header>
        {
          <>
            <p style={{ color: 'gray' }}>
              This location and pet does not have a Price Variation.
            </p>
          </>
        }

      </Modal.Content>
      <Modal.Actions className='form-modal-action-button'>

        <Button
          className='w120'
          color='teal'
          content='OK' onClick={_handleConfirmClick}/>

      </Modal.Actions>
    </Modal>
  )
}

export default AlertModal
