import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'

import CreateFormModal from './create/form/modal'
import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import productCategoryListConfig from '@lib/constants/list-configs/product/category'

import productCategoryDuck from '@reducers/category'
import productCategoryDetailDuck from '@reducers/category/detail'

const CategoryIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(productCategoryDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      productCategoryDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        productCategoryDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        productCategoryDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, item) => {
    if(button === 'delete')
      dispatch(
        productCategoryDetailDuck.creators.setItem(item, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        productCategoryDetailDuck.creators.setItem(item, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Header as='h2'>Product Categories</Header>

        <Table
          config={productCategoryListConfig}
          duck={productCategoryDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>
      </Segment>

      <CreateFormModal/>
      <ModalDelete duckDetail={productCategoryDetailDuck}/>

    </Layout>
  )
}

export default CategoryIndex
