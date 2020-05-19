import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Layout'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import CategoryForm from  './Form'

import categoryDuck from '@reducers/category'
import categoryDetailDuck from '@reducers/category/detail'
import { useChangeStatusEffect } from '@hooks/Shared'
import SortableList from './SortableList'

const CategoryList = ({ ...props }) => {
  const { categoryDetail : { status } = {}, category } = props
  const [ open, { _handleOpen, _handleClose } ] = useModal()

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
    props.setItem({ id })
    _handleOpen()
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Categories</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button content='Download' disabled/>
            <Button
              as={Link} color='teal' content='New Category'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <SortableList items={category.items} onDelete={_handleDeleteClick} onUpdate={_handleUpdateClick}/>

      </Segment>
      <CategoryForm/>
      <ModalDelete
        duckDetail={categoryDetailDuck}
        onClose={_handleClose}
        open={open}/>

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
