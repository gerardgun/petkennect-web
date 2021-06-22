import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import SetupOpenLineAddonServiceSettingForm from './index'

import setupOpenLineAddonServiceSettingDetailDuck from '@reducers/service/addon/general/open-line-service/detail'
import { formValueSelector } from 'redux-form'

const selector = formValueSelector('setup-open-line-addon-service')

const SetupOpenLineAddonServiceSettingFormModal = () => {
  const dispatch = useDispatch()
  const detail = useSelector(setupOpenLineAddonServiceSettingDetailDuck.selectors.detail)
  const price = useSelector(state => selector(state, 'price'))

  const _handleClose = () => {
    dispatch(
      setupOpenLineAddonServiceSettingDetailDuck.creators.resetItem()
    )
  }

  const _handleUpdatePricingBtnClick = () => {
    return dispatch(setupOpenLineAddonServiceSettingDetailDuck.creators.postPrice({ service_variation_id: detail.item.id, ...price }))
      .then(_handleClose)
      // .catch(parseResponseError)
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
        <Header as='h2'>{editing ? 'Update' : 'New'} Open Line Item</Header>

        <SetupOpenLineAddonServiceSettingForm/>

        <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            {
              editing && (
                <Button
                  color='violet'
                  content='Update Pricing'
                  disabled={saving}
                  onClick={_handleUpdatePricingBtnClick}
                  type='button'/>
              )
            }
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
              content={editing ? 'Save changes' : 'Create Open Line Item'}
              disabled={saving}
              form='setup-open-line-addon-service'
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Modal.Content>
    </Modal>
  )
}

export default SetupOpenLineAddonServiceSettingFormModal
