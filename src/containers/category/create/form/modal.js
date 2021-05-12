import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Header, Modal } from 'semantic-ui-react'

import CategoryCreateForm from './'

import productCategoryDetailDuck from '@reducers/category/detail'

const CategoryCreateFormModal = () => {
  const dispatch = useDispatch()
  const detail = useSelector(productCategoryDetailDuck.selectors.detail)

  const _handleClose = () => {
    dispatch(
      productCategoryDetailDuck.creators.resetItem()
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
        <Header as='h2'>{editing ? 'Update' : 'New'} Category</Header>

        <CategoryCreateForm/>

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
              content={editing ? 'Save changes' : 'Create Category'}
              disabled={saving}
              form='category'
              loading={saving}
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Modal.Content>
    </Modal>
  )
}

export default CategoryCreateFormModal
