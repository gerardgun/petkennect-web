import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import ClientDocumentFormSend, { formId } from './'

import clientDocumentDetailDuck from '@reducers/client/document/detail'

const ClientDocumentFormSendModal = ({ clientDocumentDetail, ...props }) => {
  const _handleClose = () => {
    props.resetItem()
  }

  const saving = clientDocumentDetail.status === 'SENDING'
  const opened = clientDocumentDetail.mode === 'SEND'

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='large'>
      <Modal.Content>
        <Header as='h2'>Send Email</Header>

        <ClientDocumentFormSend/>

        <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              disabled={saving}
              onClick={_handleClose}
              type='button'/>
            <Button
              className='w120'
              color='teal'
              content='Done'
              disabled={saving}
              form={formId}
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>

      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => ({
      clientDocumentDetail: clientDocumentDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: clientDocumentDetailDuck.creators.resetItem
    }
  )
)(ClientDocumentFormSendModal)
