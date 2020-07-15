import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Dropdown, Tab, Grid, Button, Form } from 'semantic-ui-react'

import TableSortableList from '@components/Table/Sortable'

import productDuck from '@reducers/product'
import productPackageDuck from '@reducers/product/package'
import productPackageDetailDuck from '@reducers/product/package/detail'

import {  useDebounce } from '@hooks/Shared'
import { useParams } from 'react-router-dom'

const ProductPackageSection = props => {
  const { product, productPackage, productPackageDetail } = props
  const { id } = useParams()

  const [ searchValue, setSeachValue ] = useState(null)

  useEffect(()=> {
    props.getProductsPackages(id)
  }, [])
  useEffect(()=> {
    if(productPackageDetail.status === 'POSTED')
      setSeachValue(null)
  },[ productPackageDetail.status ])

  useEffect(()=> {
    return ()=> props.setProductFilters({ search: '' })
  }, [])

  const { _handleDebounce } = useDebounce((text)=> {
    if(!text) setSeachValue(null)
    props.setProductFilters({ search: text })
    props.getProducts()
  })

  const _handleSearchChange = (_, { searchQuery }) => _handleDebounce(searchQuery)

  const  _handleChange = (e,data)=>{
    setSeachValue(data.value)
  }

  const _handleAddClick = () => {
    props.post({ product: searchValue })
  }

  return (
    <Tab.Pane
      className='form-primary-segment-tab'
      loading={productPackage.status === 'GETTING'}>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      {/* <Grid.Column textAlign='right' width={16}> */}
      <Form>

        <Form.Group widths={3}>
          <Form.Field
            clearable
            control={Dropdown}
            fluid
            icon='search'
            loading={product.status === 'GETTING'}
            onChange={_handleChange}
            onSearchChange={_handleSearchChange}
            options={product.items
              .filter(_product=> !_product.is_package)
              .map(_product=> ({
                key  : _product.id,
                value: _product.id,
                text : _product.name
              }))}
            placeholder='Search product by name...'
            search
            selection
            value={searchValue}/>

          <Button
            color='teal' content='Add' disabled={!searchValue || productPackage.status === 'POSTING'}
            icon='add'
            labelPosition='left'
            loading={productPackageDetail.status === 'POSTING'}
            onClick={_handleAddClick}/>
        </Form.Group>
      </Form>

      {/* </Grid.Column> */}
      <Grid.Column textAlign='right' width={16} >
        <TableSortableList duck={productPackageDuck} duckDetail={productPackageDetailDuck}/>
      </Grid.Column>

    </Tab.Pane>
  )
}

export default compose(
  connect(
    (state) => {
      const product = productDuck.selectors.list(state)
      const productPackage = productPackageDuck.selectors.list(state)
      const productPackageDetail = productPackageDetailDuck.selectors.detail(state)

      return {
        product,
        productPackage,
        productPackageDetail
      }
    },
    {

      getProducts        : productDuck.creators.get,
      post               : productPackageDetailDuck.creators.post,
      getProductsPackages: productPackageDuck.creators.get,
      setProductFilters  : productDuck.creators.setFilters

    }
  )
)(ProductPackageSection)

