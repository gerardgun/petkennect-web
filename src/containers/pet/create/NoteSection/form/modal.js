import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import loadable from '@loadable/component'

import  { formId } from './'

import petNoteDetailDuck from '@reducers/pet/note/detail'
const PetNoteForm = loadable(() => import('./'))

const PetNoteFormModal = ({ petNoteDetail, ...props }) => {
  const { mode, status } = petNoteDetail

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
      size='small'>
      <Modal.Content>
        <Header as='h2'>
          {mode === 'CREATE' ? 'New' : 'Update'} Note
        </Header>

        <PetNoteForm/>

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
      petNoteDetail: petNoteDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: petNoteDetailDuck.creators.resetItem
    }
  )
)(PetNoteFormModal)
