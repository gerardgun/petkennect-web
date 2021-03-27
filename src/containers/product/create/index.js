import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Header, Modal } from 'semantic-ui-react'

import ProductFormWizard from './wizard'

import productFamilyDetailDuck from '@reducers/product/family/detail'

import './styles.scss'

const ProductFormModal = ({ productFamilyDetail, ...props }) => {
  const { mode } = productFamilyDetail

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
      productFamilyDetail: productFamilyDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: productFamilyDetailDuck.creators.resetItem
    }
  )
)(ProductFormModal)
