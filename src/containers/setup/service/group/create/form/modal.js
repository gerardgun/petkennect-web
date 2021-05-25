import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import ServiceGroupCreateForm from './index'
import { GroupType } from '@lib/constants/service'

import serviceGroupDetailDuck from '@reducers/service/group/detail'

const ServiceGroupCreateFormModal = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceGroupDetailDuck.selectors.detail)

  const _handleClose = () => {
    dispatch(
      serviceGroupDetailDuck.creators.resetItem()
    )
  }

  const editing = Boolean(detail.item.id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(detail.status)
  const open = [ 'CREATE', 'UPDATE' ].includes(detail.mode)
  const isProtected = Object.keys(GroupType).includes(detail.item.type)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='small'>
      <Modal.Content>
        <Header as='h2'>{editing ? 'Update' : 'New'} Service Group</Header>

        <ServiceGroupCreateForm/>

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
              content={editing ? 'Save changes' : 'Create Area'}
              disabled={saving || isProtected}
              form='service-group'
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Modal.Content>
    </Modal>
  )
}

export default ServiceGroupCreateFormModal
