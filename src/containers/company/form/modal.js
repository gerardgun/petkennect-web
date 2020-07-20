import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import CompanyForm, { formId } from './'

import companyDetailDuck from '@reducers/company/detail'

const CompanyEditModal = props => {
  const {
    companyDetail
  } = props

  const _handleClose = () => {
    props.resetItem()
  }

  const isUpdating = Boolean(companyDetail.item.id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(companyDetail.status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(companyDetail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='large'>
      <Modal.Content>
        <Header as='h2'>{isUpdating ? 'Update' : 'New'} Company</Header>

        <CompanyForm/>

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
              content={isUpdating ? 'Save changes' : 'Add Company'}
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
      companyDetail: companyDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: companyDetailDuck.creators.resetItem
    }
  )
)(CompanyEditModal)
