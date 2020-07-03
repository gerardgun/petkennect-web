import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import ModalFilter from '@components/Modal/Filter'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import productDuck from '@reducers/product'
import productDetailDuck from '@reducers/product/detail'

const ProductList = ({ product, productDetail, ...props }) => {
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()
  const [ openFilterModal, { _handleOpen: _handleOpenFilterModal, _handleClose: _handleCloseFilterModal } ] = useModal()

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
          <Grid.Column width={4}>
            <Header as='h2'>Products</Header>
          </Grid.Column>
          <Grid.Column textAlign='right' width={12}>
            <Button
              basic content='Filter'
              onClick={_handleOpenFilterModal}/>
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
      <ModalFilter
        duck={productDuck}
        onClose={_handleCloseFilterModal}
        open={openFilterModal}/>

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
