import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import ServiceReservationCreateForm from './index'

import serviceVariationDetailDuck from '@reducers/service/variation/detail'

const ServiceReservationCreateFormModal = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceVariationDetailDuck.selectors.detail)

  const _handleClose = () => {
    dispatch(
      serviceVariationDetailDuck.creators.resetItem()
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
      size='small'>
      <Modal.Content>
        <Header as='h2'>{editing ? 'Update' : 'Add'} Group Class</Header>

        <ServiceReservationCreateForm/>

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
              content={editing ? 'Save changes' : 'Create Group Class'}
              disabled={saving}
              form='service-group-class'
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Modal.Content>
    </Modal>
  )
}

export default ServiceReservationCreateFormModal
