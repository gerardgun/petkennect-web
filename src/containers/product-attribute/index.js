import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import productAttributeListConfig from '@lib/constants/list-configs/product/product-attribute'

import productAttributeDuck from '@reducers/product/product-attribute'
import productAttributeDetailDuck from '@reducers/product/product-attribute/detail'

const ProductAttributeIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(productAttributeDetailDuck.selectors.detail)
  const history = useHistory()

  useEffect(() => {
    dispatch(
      productAttributeDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        productAttributeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        productAttributeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, item) => {
    if(button === 'delete')
      dispatch(
        productAttributeDetailDuck.creators.setItem(item, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        productAttributeDetailDuck.creators.setItem(item, 'UPDATE')
      )
    else if(button === 'list_values')
      history.push(`/products/attributes/${item.id}/values`)
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Header as='h2'>Product Attributes</Header>

        <Table
          config={productAttributeListConfig}
          duck={productAttributeDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>
      </Segment>

      <CreateFormModal/>
      <ModalDelete duckDetail={productAttributeDetailDuck}/>
    </Layout>
  )
}

export default ProductAttributeIndex
