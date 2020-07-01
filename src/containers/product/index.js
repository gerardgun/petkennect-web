import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Input } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import ModalFilter from '@components/Modal/Filter'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import productDuck from '@reducers/product'
import productDetailDuck from '@reducers/product/detail'
import { useDebounceText } from '@hooks/Shared'

const ProductList = ({ /* product ,*/  productDetail, ...props }) => {
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()
  const [ openFilterModal, { _handleOpen: _handleOpenFilterModal, _handleClose: _handleCloseFilterModal } ] = useModal()

  useEffect(() => {
    if(productDetail.status === 'DELETED') props.getProducts()
  }, [ productDetail.status ])

  useEffect(() => {
    props.getProducts()
  }, [])

  const { _handleChangeText } = useDebounceText((text)=> {
    props.setFilters({ search: text })
    props.getProducts()
  })

  const _handleRowOptionClick = (option, item) => {
    if(option === 'edit')
    {props.history.push(`product/${item.id}`)}

    else if(option === 'delete')
    {
      props.setItem(item)
      _handleOpenDeleteModal()
    }
  }
  const  _handleRowClick = (option,item) => {
    props.history.push(`product/${item.id}`)
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
            <Input
              icon='search' onChange={_handleChangeText}
              placeholder='Search...'/>
            <Button
              content='Download' disabled icon='cloud download'
              labelPosition='left'/>
            <Button
              content='Filter' icon='filter'
              labelPosition='left'
              onClick={_handleOpenFilterModal}/>
            <Button
              as={Link} className='cls-saveButton' color='teal'
              content='New Product'
              onClick={_handleCreateClick}
              to='/product/create'/>
          </Grid.Column>
        </Grid>
        <Table
          duck={productDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
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
      setFilters : productDuck.creators.setFilters,
      setItem    : productDetailDuck.creators.setItem
    }
  )
)(ProductList)
