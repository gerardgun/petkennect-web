import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import ProductFamiliesFormModal from './create'
import ProductVariationsFormModal from './../product-variations/create'

import productFamiliesDuck from '@reducers/product/product-families'
import productFamiliesDetailDuck from '@reducers/product/product-families/detail'
import productVariationsDetailDuck from '@reducers/product/product-variations/detail'

const ProductList = ({ product, productDetail, productVariationsDetail, ...props }) => {
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()
  const history = useHistory()

  useEffect(() => {
    if(productDetail.status === 'DELETED' || productDetail.status === 'POSTED' || productDetail.status === 'PUT')
      props.getProducts()
  }, [ productDetail.status ])

  useEffect(() => {
    if(productVariationsDetail.status === 'PUT')
      props.getProducts()
  }, [ productVariationsDetail.status ])

  useEffect(() => {
    props.getProducts()
  }, [])

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(product.selector.selected_items[0], 'DELETE')
      _handleOpenDeleteModal()
    }
  }

  const _handleRowClick = (e, item) => {
    if(item.variations)
      history.replace(`/product-families/show/${item.id}`)
    else
      props.setProductVariations(item, 'UPDATE')
  }

  const _handleCreateClick = ()=> {
    props.setItem(null, 'CREATE')
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
        <Table duck={productFamiliesDuck} onOptionClick={_handleOptionClick} onRowClick={_handleRowClick}/>
      </Segment>
      <ProductFamiliesFormModal/>
      <ProductVariationsFormModal/>
      <ModalDelete
        duckDetail={productFamiliesDetailDuck}
        onClose={_handleCloseDeleteModal}
        open={openDeleteModal}/>

    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      product                : productFamiliesDuck.selectors.list(state),
      productDetail          : productFamiliesDetailDuck.selectors.detail(state),
      productVariationsDetail: productVariationsDetailDuck.selectors.detail(state)
    }),
    {
      getProducts         : productFamiliesDuck.creators.get,
      setItem             : productFamiliesDetailDuck.creators.setItem,
      setProductVariations: productVariationsDetailDuck.creators.setItem
    }
  )
)(ProductList)
