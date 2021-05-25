import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import ServiceTypeCreateForm from './index'

import serviceDetailDuck from '@reducers/service/detail'

const formOptions = [
  { text: 'Reservations', value: 'reservation' },
  { text: 'Boarding Activities', value: 'boarding-activity' },
  { text: 'Group Classes', value: 'group-class' },
  { text: 'Class Sessions', value: 'group-class-session' }
]

const ServiceTypeCreateFormModal = () => {
  const dispatch = useDispatch()
  const detail = useSelector(serviceDetailDuck.selectors.detail)
  const [ form, setForm ] = useState(formOptions[0].value)

  const _handleClose = () => {
    dispatch(
      serviceDetailDuck.creators.resetItem()
    )
  }

  const _handleFormBtnClick = e => {
    setForm(e.currentTarget.dataset.form)
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
        <Header as='h2'>{editing ? 'Update' : 'Add'} Reservation and Class</Header>

        {
          !editing && (
            <Button.Group basic className='service-type-form-buttons' fluid>
              {
                formOptions.map(({ value, text }) => (
                  <Button
                    color={value === form ? 'teal' : null}
                    content={text}
                    data-form={value}
                    key={value}
                    onClick={_handleFormBtnClick}
                    type='button'/>
                ))
              }
            </Button.Group>
          )
        }

        <ServiceTypeCreateForm/>

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
              content={editing ? 'Save changes' : 'Create Service Type'}
              disabled={saving}
              form='service-type'
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Modal.Content>
    </Modal>
  )
}

export default ServiceTypeCreateFormModal
