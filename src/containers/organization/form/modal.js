import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import OrganizationForm, { formId } from './'

import organizationDetailDuck from '@reducers/organization/detail'

const OrganizationEditModal = props => {
  const {
    organizationDetail
  } = props

  const _handleClose = () => {
    props.resetItem()
  }

  const isUpdating = Boolean(organizationDetail.item.id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(organizationDetail.status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(organizationDetail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='large'>
      <Modal.Content>
        <Header as='h2'>{isUpdating ? 'Update' : 'New'} Organization</Header>

        <OrganizationForm/>

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
              content={isUpdating ? 'Save changes' : 'Add Organization'}
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
      organizationDetail: organizationDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: organizationDetailDuck.creators.resetItem
    }
  )
)(OrganizationEditModal)
