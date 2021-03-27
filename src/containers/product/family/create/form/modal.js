import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import ProductFamilyCreateForm, { formId } from './index'

import productFamilyDetailDuck from '@reducers/product/family/detail'

const ProductFamilyCreateFormModal = props => {
  const {
    productFamilyDetail
  } = props

  const _handleClose = props.resetProductFamily

  const loading = [ 'POSTING', 'PUTTING' ].includes(productFamilyDetail.status)
  const open = [ 'CREATE', 'UPDATE' ].includes(productFamilyDetail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='small'>
      <Modal.Content>
        <Header as='h2'>{productFamilyDetail.mode === 'CREATE' ? 'New' : 'Update'} Product Family</Header>

        <ProductFamilyCreateForm/>

        <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              disabled={loading}
              onClick={_handleClose}
              type='button'/>
            <Button
              className='w120'
              color='teal'
              content='Done'
              disabled={loading}
              form={formId}
              loading={loading}
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
      productFamilyDetail: productFamilyDetailDuck.selectors.detail(state)
    }),
    {
      resetProductFamily: productFamilyDetailDuck.creators.resetItem
    }
  )
)(ProductFamilyCreateFormModal)
