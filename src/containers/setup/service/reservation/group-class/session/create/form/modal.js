import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import ServiceVariationReleaseCreateForm from './index'

import serviceVariationReleaseDetailDuck from '@reducers/service/variation/release/detail'

const ServiceVariationReleaseCreateFormModal = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationReleaseDetailDuck.selectors.detail)

  const _handleClose = () => {
    dispatch(
      serviceVariationReleaseDetailDuck.creators.resetItem()
    )
  }

  const editing = Boolean(detail.item.id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(detail.status)
  const open = [ 'CREATE', 'UPDATE' ].includes(detail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='large'>
      <Modal.Content>
        <Header as='h2'>{editing ? 'Update' : 'Add'} Class Session</Header>

        <ServiceVariationReleaseCreateForm/>

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
              content={editing ? 'Save changes' : 'Create Class Session'}
              disabled={saving}
              form='service-variation-release'
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Modal.Content>
    </Modal>
  )
}

export default ServiceVariationReleaseCreateFormModal
