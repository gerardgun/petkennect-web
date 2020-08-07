import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import EmployeeTitleForm, { formId } from './'

import employeeTitleDetailDuck from '@reducers/employee/title/detail'

const EmployeeTitleFormModal = props => {
  const {
    employeeTitleDetail
  } = props

  const _handleClose = () => {
    props.resetItem()
  }

  const isUpdating = Boolean(employeeTitleDetail.item.id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(employeeTitleDetail.status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(employeeTitleDetail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='small'>
      <Modal.Content>
        <Header as='h2'>{isUpdating ? 'Update' : 'New'} Employee Title</Header>

        <EmployeeTitleForm/>

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
              content={isUpdating ? 'Save changes' : 'Add Title'}
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
      employeeTitleDetail: employeeTitleDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: employeeTitleDetailDuck.creators.resetItem
    }
  )
)(EmployeeTitleFormModal)
