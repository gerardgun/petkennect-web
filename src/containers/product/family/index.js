import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import productFamilyListConfig from '@lib/constants/list-configs/product/family'

import productFamilyDuck from '@reducers/product/family'
import productFamilyDetailDuck from '@reducers/product/family/detail'

const ProductFamilyIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(productFamilyDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      productFamilyDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        productFamilyDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        productFamilyDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, item) => {
    if(button === 'delete')
      dispatch(
        productFamilyDetailDuck.creators.setItem(item, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        productFamilyDetailDuck.creators.setItem(item, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Header as='h2'>Product Families</Header>

        <Table
          config={productFamilyListConfig}
          duck={productFamilyDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>
      </Segment>

      {/* Form to create and edit the product family */}
      <CreateFormModal/>

      {/* Modal to delete the product family */}
      <ModalDelete duckDetail={productFamilyDetailDuck}/>
    </Layout>
  )
}

export default ProductFamilyIndex

