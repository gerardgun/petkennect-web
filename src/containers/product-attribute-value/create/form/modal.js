import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import ProductAttributeValueCreateForm from './index'

import productAttributeValueDetailDuck from '@reducers/product/product-attribute-value/detail'

const ProductAttributeValueCreateFormModal = () => {
  const dispatch = useDispatch()
  const detail = useSelector(productAttributeValueDetailDuck.selectors.detail)

  const _handleClose = () => {
    dispatch(
      productAttributeValueDetailDuck.creators.resetItem()
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
        <Header as='h2'>{editing ? 'Update' : 'New'} Value</Header>

        <ProductAttributeValueCreateForm/>

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
              content={editing ? 'Save changes' : 'Create Value'}
              disabled={saving}
              form='product-attribute-value'
              loading={saving}
              saving={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Modal.Content>
    </Modal>
  )
}

export default ProductAttributeValueCreateFormModal
