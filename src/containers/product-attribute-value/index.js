import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import ProductAttributeValueCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'
import productAttributeValueListConfig from '@lib/constants/list-configs/product/product-attribute-value'

import productAttributeDetailDuck from '@reducers/product/product-attribute/detail'
import productAttributeValueDuck from '@reducers/product/product-attribute-value'
import productAttributeValueDetailDuck from '@reducers/product/product-attribute-value/detail'

const ProductAttributeList = ({ productAttributeDetail, productAttributeValue, productAttributeValueDetail, ...props }) => {
  const { id: productAttributeId } = useParams()

  useChangeStatusEffect(() => props.getProductAttributesValue(productAttributeId), productAttributeValueDetail.status, [ 'POSTED', 'PUT' ])

  useEffect(() => {
    if(productAttributeValueDetail.status === 'DELETED') props.getProductAttributesValue(productAttributeId)
  }, [ productAttributeValueDetail.status ])

  useEffect(() => {
    props.getProductAttributesValue(productAttributeId)
  }, [])

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(productAttributeValue.selector.selected_items[0], 'DELETE')
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
          <Grid.Column computer={8} mobile={16} tablet={12}>
            <Header as='h2'>Products Attributes / {productAttributeDetail.item.type == 'C' ? 'Color' : 'Dimension'}</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={10} tablet={4}>
            <Button
              as={Link} color='teal'
              content='New Value'
              onClick={_handleCreateClick}/>
          </Grid.Column>
        </Grid>
        <Table
          config={productAttributeValueListConfig}
          duck={productAttributeValueDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>

      </Segment>
      <ProductAttributeValueCreate/>
      <ModalDelete duckDetail={productAttributeValueDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => {
      const productAttributeDetail = productAttributeDetailDuck.selectors.detail(state)

      return {
        productAttributeDetail,
        productAttributeValue      : productAttributeValueDuck.selectors.list(state),
        productAttributeValueDetail: productAttributeValueDetailDuck.selectors.detail(state)
      }
    },
    {
      getProductAttributesValue: productAttributeValueDuck.creators.get,
      setItem                  : productAttributeValueDetailDuck.creators.setItem
    }
  )
)(ProductAttributeList)
