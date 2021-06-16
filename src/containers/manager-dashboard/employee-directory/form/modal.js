import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import EmployeeForm, { formId } from './'

import personalInformationDetailDuck from '@reducers/staff-management/information/personal-detail/detail'

const EmployeeFormModal = props => {
  const {
    personalInformationDetail
  } = props

  const _handleClose = () => {
    props.resetItem()
  }

  const isUpdating = personalInformationDetail.mode === 'UPDATE' ? true : false

  const saving = [ 'POSTING', 'PUTTING' ].includes(personalInformationDetail.status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(personalInformationDetail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='large'>
      <Modal.Content>
        <Header as='h2'>{isUpdating ? 'Update' : 'New'} Employee</Header>

        <EmployeeForm/>

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
              content={isUpdating ? 'Save changes' : 'Add Employee'}
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
      personalInformationDetail: personalInformationDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: personalInformationDetailDuck.creators.resetItem
    }
  )
)(EmployeeFormModal)
