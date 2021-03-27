import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'
import loadable from '@loadable/component'

import categoryDuck from '@reducers/category'
import categoryDetailDuck from '@reducers/category/detail'
import { useChangeStatusEffect } from '@hooks/Shared'

const Layout = loadable(() => import('@components/Common/Layout'))
const ModalDelete = loadable(() => import('@components/Modal/Delete'))
const CategoryForm = loadable(() => import('./Form'))
const SortableList = loadable(() => import('./SortableList'))

const CategoryList = ({ ...props }) => {
  const { categoryDetail : { status } = {}, category } = props

  useEffect(() => {
    props.getCategories()
  }, [])

  useChangeStatusEffect(props.getCategories, status)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleUpdateClick = (id) => {
    props.setItem({ id }, 'UPDATE')
  }

  const _handleDeleteClick = (id) => {
    props.setItem({ id }, 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>Categories</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={16} tablet={12}>
            <Button content='Download' disabled/>
            <Button
              as={Link} color='teal'
              content='New Category'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <SortableList items={category.items} onDelete={_handleDeleteClick} onUpdate={_handleUpdateClick}/>

      </Segment>

      <CategoryForm/>
      <ModalDelete duckDetail={categoryDetailDuck}/>
    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      categoryDetail: categoryDetailDuck.selectors.detail(state),
      category      : categoryDuck.selectors.list(state)
    }), {
      getCategories: categoryDuck.creators.get,
      setItem      : categoryDetailDuck.creators.setItem
    })
)(CategoryList)
