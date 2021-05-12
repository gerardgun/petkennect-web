import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header, Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import productAttributeValueListConfig from '@lib/constants/list-configs/product/product-attribute-value'
import productAttributeValueColorListConfig from '@lib/constants/list-configs/product/product-attribute-value/color'

import productAttributeDuck from '@reducers/product/product-attribute'
import productAttributeDetailDuck from '@reducers/product/product-attribute/detail'
import productAttributeValueDuck from '@reducers/product/product-attribute-value'
import productAttributeValueDetailDuck from '@reducers/product/product-attribute-value/detail'

const ProductAttributeValueIndex = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const detail = useSelector(productAttributeValueDetailDuck.selectors.detail)
  const productAttributeDetail = useSelector(productAttributeDetailDuck.selectors.detail)
  const productAttributeList = useSelector(productAttributeDuck.selectors.list)

  useEffect(() => {
    dispatch(
      productAttributeValueDuck.creators.get({
        product_attribute_id: parseInt(params.id, 10)
      })
    )
  }, [])

  useEffect(() => {
    if(productAttributeList.status === 'GOT' && productAttributeList.items.length > 0) {
      const productAttribute = productAttributeList.items.find(({ id }) => id === parseInt(params.id, 10))

      dispatch(
        productAttributeDetailDuck.creators.setItem(productAttribute)
      )
    }
  }, [ productAttributeList.status ])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        productAttributeValueDuck.creators.get({
          product_attribute_id: parseInt(params.id, 10)
        })
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        productAttributeValueDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, item) => {
    if(button === 'delete')
      dispatch(
        productAttributeValueDetailDuck.creators.setItem(item, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        productAttributeValueDetailDuck.creators.setItem(item, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Header as='h2'>Product Attributes / {productAttributeDetail.item.name}</Header>

        <Table
          config={productAttributeDetail.item.type === 'C' ? productAttributeValueColorListConfig : productAttributeValueListConfig}
          duck={productAttributeValueDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>
      </Segment>

      <CreateFormModal/>
      <ModalDelete duckDetail={productAttributeValueDetailDuck}/>
    </Layout>
  )
}

export default ProductAttributeValueIndex
