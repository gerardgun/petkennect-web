import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import ClientForm, { formId } from './'
import ClientFormWizard from './wizard'

import clientDetailDuck from '@reducers/client/detail'

const ClientFormModal = ({ clientDetail, ...props }) => {
  const { mode, status } = clientDetail

  const _handleClose = () => {
    props.resetItem()
  }

  const saving = [ 'POSTING', 'PUTTING' ].includes(status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='large'>
      <Modal.Content>
        <Header as='h2'>{mode === 'UPDATE' ? 'Update' : 'New'} Client</Header>

        {
          mode === 'CREATE' && <ClientFormWizard/>
        }
        {
          mode === 'UPDATE' && (
            <>
              <ClientForm/>
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
                    color='teal'
                    content='Save changes'
                    disabled={saving}
                    form={formId}
                    loading={saving}
                    type='submit'/>
                </Form.Field>
              </Form.Group>
            </>
          )
        }

      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: clientDetailDuck.creators.resetItem
    }
  )
)(ClientFormModal)
