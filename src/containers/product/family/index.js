import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import { useChangeStatusEffect } from 'src/hooks/Shared'
import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import ProductFamilyCreateFormModal from './create/form/modal'
import Table from '@components/Table'
import config from '@lib/constants/list-configs/product/family'

import productFamilyDuck from '@reducers/product/family'
import productFamilyDetailDuck from '@reducers/product/family/detail'

const ProductFamilyIndex = props => {
  const {
    productFamilyDetail
  } = props

  useChangeStatusEffect(props.getProductFamilies, productFamilyDetail.status)

  useEffect(() => {
    props.getProductFamilies()
  }, [])

  const _handleRowButtonClick = (option, item) => {
    if(option === 'delete')
      props.setProductFamily(item, 'DELETE')
  }

  const _handleCreateClick = () => {
    props.setProductFamily(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setProductFamily(item, 'UPDATE')
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Header as='h2'>Product Families</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              as={Link} color='teal'
              content='New Product Family'
              onClick={_handleCreateClick}/>
          </Grid.Column>
        </Grid>

        <Table
          config={config}
          duck={productFamilyDuck}
          onRowButtonClick={_handleRowButtonClick}
          onRowClick={_handleRowClick}/>

      </Segment>

      {/* Form to create and edit the product family */}
      <ProductFamilyCreateFormModal/>

      {/* Modal to delete the product family */}
      <ModalDelete duckDetail={productFamilyDetailDuck}/>
    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      productFamilyDetail: productFamilyDetailDuck.selectors.detail(state)
    }),
    {
      getProductFamilies: productFamilyDuck.creators.get,
      setProductFamily  : productFamilyDetailDuck.creators.setItem
    }
  )
)(ProductFamilyIndex)

