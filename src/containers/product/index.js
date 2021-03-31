import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import ProductFamilyFormModal from './create'
import ProductVariationsFormModal from './../product-variations/create'
import Table from '@components/Table'
import productListConfig from '@lib/constants/list-configs/product'
import productChildListConfig from '@lib/constants/list-configs/product/child'

import productDuck from '@reducers/product'
import productDetailDuck from '@reducers/product/detail'
import productFamilyDuck from '@reducers/product/family'
import productFamilyDetailDuck from '@reducers/product/family/detail'
import productVariationsDetailDuck from '@reducers/product/product-variations/detail'

const ProductList = ({ product, productDetail, productVariationsDetail, ...props }) => {
  const history = useHistory()

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(productDetail.status)) props.getProducts()
  }, [ productDetail.status ])

  useEffect(() => {
    if(productVariationsDetail.status === 'PUT') props.getProducts()
  }, [ productVariationsDetail.status ])

  useEffect(() => {
    props.getProducts()
  }, [])

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setProduct(product.selector.selected_items[0], 'DELETE')
  }

  const _handleRowClick = (e, item) => {
    if(e.currentTarget.dataset.itemExpand === 'true')
      props.setProductVariations(item, 'UPDATE')
    else
      history.replace(`/product/${item.id}`)
  }

  const _handleCreateClick = () => {
    props.setProduct(null, 'CREATE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={4} mobile={12} tablet={4}>
            <Header as='h2'>Products</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={10} tablet={12}>
            <Button
              as={Link} color='teal'
              content='New Product'
              onClick={_handleCreateClick}/>
          </Grid.Column>
        </Grid>

        <Table
          childProps={{
            config: productChildListConfig
          }}
          config={productListConfig}
          duck={productDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>

      </Segment>
      <ProductFamilyFormModal/>
      <ProductVariationsFormModal/>
      <ModalDelete duckDetail={productFamilyDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      product                : productFamilyDuck.selectors.list(state),
      productDetail          : productFamilyDetailDuck.selectors.detail(state),
      productVariationsDetail: productVariationsDetailDuck.selectors.detail(state)
    }),
    {
      getProducts         : productDuck.creators.get,
      setProduct          : productDetailDuck.creators.setItem,
      setProductVariations: productVariationsDetailDuck.creators.setItem
    }
  )
)(ProductList)
