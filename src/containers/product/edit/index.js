import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Divider, Grid, Segment, Button, Header } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'

import ProductCreateForm from '@containers/product/create/form'
import ProductEditSeoForm from '@containers/product/edit/form/seo'
import ProductEditVariationsForm from '@containers/product/edit/form/variations'

import productDetailDuck from '@reducers/product/detail'

const ProductEdit = () => {
  const detail = useSelector(productDetailDuck.selectors.detail)
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const [ section, setSection ] = useState('information')

  useEffect(() => {
    dispatch(
      productDetailDuck.creators.get(params.id)
    )

    return () => {
      dispatch(
        productDetailDuck.creators.resetItem()
      )
    }
  }, [])

  const _handleCancelBtnClick = () => {
    history.goBack()
  }

  const _handleSectionBtnClick = (e, { name }) => setSection(name)

  const saving = [ 'POSTING', 'PUTTING' ].includes(detail.status)

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid>
          <Grid.Column verticalAlign='middle' width={8}>
            <Header as='h2'>Edit Product</Header>
          </Grid.Column >
          <Grid.Column textAlign='right' width={8}>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              disabled={saving}
              onClick={_handleCancelBtnClick}
              type='button'/>
            <Button
              color='teal'
              content='Save Changes'
              disabled={saving}
              form='product'
              loading={saving}
              type='submit'/>
          </Grid.Column>
        </Grid>

        <Divider/>

        <Button
          basic={section !== 'information'} color='teal'
          content='Information' name='information'
          onClick={_handleSectionBtnClick}/>
        <Button
          basic={section !== 'variations'} color='teal'
          content='Variations' name='variations'
          onClick={_handleSectionBtnClick}/>
        <Button
          basic={section !== 'seo'} color='teal'
          content='SEO' name='seo'
          onClick={_handleSectionBtnClick}/>

        <Divider/>

        {
          section === 'information' && (
            <ProductCreateForm/>
          )
        }
        {
          section === 'variations' && (
            <ProductEditVariationsForm/>
          )
        }
        {
          section === 'seo' && (
            <ProductEditSeoForm/>
          )
        }
      </Segment>
    </Layout>
  )
}

export default ProductEdit
