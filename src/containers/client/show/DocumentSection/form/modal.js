import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import ClientDocumentForm, { formId } from './'
import ClientDocumentFormUpload from './upload'

import clientDocumentDetailDuck from '@reducers/client/document/detail'

const ClientDocumentFormModal = ({ clientDocumentDetail, ...props }) => {
  const { mode, status } = clientDocumentDetail

  const _handleClose = () => {
    props.resetItem()
  }

  const saving = [ 'POSTING', 'PUTTING' ].includes(status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}>
      <Modal.Content>
        <Header as='h2'>{mode === 'UPDATE' ? 'Update' : 'New'} Document</Header>

        {
          mode === 'CREATE' && <ClientDocumentFormUpload/>
        }
        {
          mode === 'UPDATE' && <ClientDocumentForm/>
        }

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
)(ClientDocumentFormModal)
