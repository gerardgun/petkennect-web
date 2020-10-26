import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import productDuck from '@reducers/product'
import productDetailDuck from '@reducers/product/detail'

const ProductList = ({ product, productDetail, ...props }) => {
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()

  useEffect(() => {
    if(productDetail.status === 'DELETED') props.getProducts()
  }, [ productDetail.status ])

  useEffect(() => {
    props.getProducts()
  }, [])

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(product.selector.selected_items[0], 'DELETE')
      _handleOpenDeleteModal()
    }
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
              onClick={_handleCreateClick}
              to='/product/create'/>
          </Grid.Column>
        </Grid>
        <Table duck={productDuck} onOptionClick={_handleOptionClick}/>
      </Segment>

      <ModalDelete
        duckDetail={productDetailDuck}
        onClose={_handleCloseDeleteModal}
        open={openDeleteModal}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ product, ...state }) => ({
      product,
      productDetail: productDetailDuck.selectors.detail(state)
    }),
    {
      getProducts: productDuck.creators.get,
      setItem    : productDetailDuck.creators.setItem
    }
  )
)(ProductList)
