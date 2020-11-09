import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import ProductClassesCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'

import productClassesDuck from '@reducers/product/product-classes'
import productClassesDetailDuck from '@reducers/product/product-classes/detail'

const ProductClassesList = ({ productClasses, productClassesDetail, ...props }) => {
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()

  useChangeStatusEffect(props.getProductClasses, productClassesDetail.status)

  useEffect(() => {
    if(productClassesDetail.status === 'DELETED') props.getProductClasses()
  }, [ productClassesDetail.status ])

  useEffect(() => {
    props.getProductClasses()
  }, [])

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(productClasses.selector.selected_items[0], 'DELETE')
      _handleOpenDeleteModal()
    }
  }

  const _handleCreateClick = ()=> {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Header as='h2'>Product Classes</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              as={Link} color='teal'
              content='New Class'
              onClick={_handleCreateClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={productClassesDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>

      </Segment>
      <ProductClassesCreate/>
      <ModalDelete
        duckDetail={productClassesDetailDuck}
        onClose={_handleCloseDeleteModal}
        open={openDeleteModal}/>

    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      productClasses      : productClassesDuck.selectors.list(state),
      productClassesDetail: productClassesDetailDuck.selectors.detail(state)

    }),
    {
      getProductClasses: productClassesDuck.creators.get,
      setItem          : productClassesDetailDuck.creators.setItem
    }
  )
)(ProductClassesList)

