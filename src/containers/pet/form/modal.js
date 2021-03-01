// changes
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import loadable from '@loadable/component'

import  { formId } from './'

import petDetailDuck from '@reducers/pet/detail'

const PetForm = loadable(() => import('./'))

const PetFormModal = ({ clientId, petDetail, ...props }) => {
  const _handleClose = () => {
    props.resetItem()
  }

  const isUpdating = Boolean(petDetail.item.id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(petDetail.status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(petDetail.mode)

  return (
    <>
      <Modal
        className='form-modal'
        onClose={_handleClose}
        open={opened}
        size='large'>
        <Modal.Content>
          <Header as='h2'>{isUpdating ? 'Update' : 'New'} Pet</Header>

          <PetForm clientsId={clientId}/>

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
                content={isUpdating ? 'Save changes' : 'Add Pet'}
                disabled={saving}
                form={formId}
                loading={saving}
                type='submit'/>
            </Form.Field>
          </Form.Group>

        </Modal.Content>
      </Modal>
    </>
  )
}

export default compose(
  connect(
    state => ({
      petDetail: petDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: petDetailDuck.creators.resetItem
    }
  )
)(PetFormModal)
