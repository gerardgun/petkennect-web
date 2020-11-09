import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Header, Modal } from 'semantic-ui-react'

import ProductFormWizard from './wizard'

import productFamiliesDetailDuck from '@reducers/product/product-families/detail'

const ProductFormModal = ({ productFamiliesDetail, ...props }) => {
  const { mode } = productFamiliesDetail

  const _handleClose = () => {
    props.resetItem()
  }

  const opened = [ 'CREATE', 'UPDATE' ].includes(mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='large'>
      <Modal.Content>
        <Header as='h2'>{mode === 'UPDATE' ? 'Update' : 'New'} Product</Header>

        <ProductFormWizard/>

      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => ({
      productFamiliesDetail: productFamiliesDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: productFamiliesDetailDuck.creators.resetItem
    }
  )
)(ProductFormModal)
