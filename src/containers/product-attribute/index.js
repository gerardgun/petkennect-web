import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import ProductAttributeCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'

import productAttributeDuck from '@reducers/product/product-attribute'
import productAttributeDetailDuck from '@reducers/product/product-attribute/detail'

const ProductAttributeList = ({ productAttribute, productAttributeDetail, ...props }) => {
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()

  const history = useHistory()

  useChangeStatusEffect(props.getProductAttributes, productAttributeDetail.status)

  useEffect(() => {
    if(productAttributeDetail.status === 'DELETED') props.getProductAttributes()
  }, [ productAttributeDetail.status ])

  useEffect(() => {
    props.getProductAttributes()
  }, [])

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(productAttribute.selector.selected_items[0], 'DELETE')
      _handleOpenDeleteModal()
    }
  }

  const _handleRowOptionClick = (option, item) => {
    props.setItem(item)
    history.push(`/product-attribute-value/${item.id}`)
  }

  const _handleCreateClick = ()=> {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Header as='h2'>Products Attributes</Header>
          </Grid.Column>
          <Grid.Column
            computer={8} mobile={16} tablet={8}
            textAlign='right'>
            <Button
              as={Link} color='teal'
              content='New Attribute'
              onClick={_handleCreateClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={productAttributeDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>

      </Segment>
      <ProductAttributeCreate/>
      <ModalDelete
        duckDetail={productAttributeDetailDuck}
        onClose={_handleCloseDeleteModal}
        open={openDeleteModal}/>

    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      productAttribute      : productAttributeDuck.selectors.list(state),
      productAttributeDetail: productAttributeDetailDuck.selectors.detail(state)

    }),
    {
      getProductAttributes: productAttributeDuck.creators.get,
      setItem             : productAttributeDetailDuck.creators.setItem
    }
  )
)(ProductAttributeList)
