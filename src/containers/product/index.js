import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import productListConfig from '@lib/constants/list-configs/product'
import productChildListConfig from '@lib/constants/list-configs/product/child'

import productDuck from '@reducers/product'
import productDetailDuck from '@reducers/product/detail'
import productFamilyDuck from '@reducers/product/family'

const ProductIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(productDetailDuck.selectors.detail)
  const productFamilyList = useSelector(productFamilyDuck.selectors.list)
  const history = useHistory()

  useEffect(() => {
    dispatch(
      productDuck.creators.get()
    )

    if(productFamilyList.items.length === 0)
      dispatch(
        productFamilyDuck.creators.get()
      )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        productDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        productDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, item) => {
    if(button === 'delete')
      dispatch(
        productDetailDuck.creators.setItem(item, 'DELETE')
      )
    else if(button === 'edit')
      history.replace(`/products/${item.id}`)
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Header as='h2'>Products</Header>

        <Table
          childProps={{
            config: productChildListConfig
          }}
          config={productListConfig}
          duck={productDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>
      </Segment>

      <CreateFormModal/>

      <ModalDelete duckDetail={productDetailDuck}/>

    </Layout>
  )
}

export default ProductIndex
