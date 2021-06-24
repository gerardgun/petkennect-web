import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import CompanyProfileCalendarForm from './index'

import companyProfileCalendarDetailDuck from '@reducers/company-profile/calendar/detail'

const CompanyProfileCalendarFormModal = () => {
  const dispatch = useDispatch()
  const detail = useSelector(companyProfileCalendarDetailDuck.selectors.detail)

  const _handleClose = () => {
    dispatch(
      companyProfileCalendarDetailDuck.creators.resetItem()
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
        <Header as='h2'>{editing ? 'Update' : 'New'} Calendar</Header>

        <CompanyProfileCalendarForm/>

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
              content={editing ? 'Save changes' : 'Create Calendar'}
              disabled={saving}
              form='company-profile-calendar'
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Modal.Content>
    </Modal>
  )
}

export default CompanyProfileCalendarFormModal
