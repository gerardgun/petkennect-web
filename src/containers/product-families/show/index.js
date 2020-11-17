import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Grid, Segment, Button, Form, Header } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import useModal from '@components/Modal/useModal'

import { parseFormValues, parseResponseError } from '@lib/utils/functions'
import FormError from '@components/Common/FormError'

import ProductFormFirst,{ formId } from './../form/first'
import ProductFormThird from './../form/third'
import ProductFormSecond from './../form/second'

import categoryDuck from '@reducers/category'
import productFamiliesDetailDuck from '@reducers/product/product-families/detail'
import productClassesDetailDuck from '@reducers/product/product-classes/detail'

const ProductFamilyShow = (props) => {
  const {
    productFamiliesDetail,
    category,
    error,
    reset,
    handleSubmit,
    submitting // redux-form
  } = props

  const [ { _handleOpen } ] = useModal()
  const { id } = useParams()
  const history = useHistory()

  const [ ActiveInfoItem, setActiveInfoItem ] = useState('information')
  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  useEffect(() => {
    props.getCategories()
    props.getProductFamilies(id)

    return () => {
      props.resetItem()
      props.resetProductClasses()
    }
  }, [])

  // eslint-disable-next-line no-unused-vars
  const _handleDeleteClick = () => {
    _handleOpen()
  }

  const _handleCancelBtnClick = () =>{
    history.replace('/product-families')
  }

  const _handleSubmit = values => {
    values = parseFormValues(values)
    values.categories = values.categories.map((item,index) => {
      return  item == false ? null : category.items[index].id
    }).filter(function(el) {
      return el != null
    })

    return props.put({ id: productFamiliesDetail.item.id, ...values })
      .then(_handleCancelBtnClick)
      .catch(parseResponseError)
  }

  return (
    <Layout>

      <Segment className='segment-content' padded='very'>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id={formId} onReset={reset}>
          <Grid className='petkennect-profile-body-header div-client-info-edit-button'>
            <Grid.Column textAlign='left' width={8}>
              <Header as='h2'>Edit Product </Header>
            </Grid.Column >
            <Grid.Column textAlign='right' width={8}>
              <Button
                basic
                className='w120'
                color='teal'
                content='Cancel' disabled={submitting}
                onClick={_handleCancelBtnClick}
                size='small'/>
              <Button
                className='ml16'
                color='teal'
                content='Save Changes'
                disabled={submitting}
                loading={submitting}
                // eslint-disable-next-line react/jsx-handler-names
                onClick={handleSubmit(_handleSubmit)}
                size='small'/>
            </Grid.Column>

          </Grid>
          <div className='petkennect-profile-body-content'>
            <div className='div-client-info-button'>
              <Button
                basic={ActiveInfoItem !== 'information'} color='teal'
                content='Information' name='information'
                onClick={_handleInfoItemClick}/>
              <Button
                basic={ActiveInfoItem !== 'variations'} color='teal'
                content='Variations' name='variations'
                onClick={_handleInfoItemClick}/>
              <Button
                basic={ActiveInfoItem !== 'seo'} color='teal'
                content='SEO' name='seo'
                onClick={_handleInfoItemClick}/>
            </div>
          </div>
          {ActiveInfoItem === 'information'  && (
            <>
              <Grid className='mt32'>
                <ProductFormFirst/>
              </Grid>

            </>
          )}
          {ActiveInfoItem === 'variations'  && (
            <>
              <ProductFormSecond/>
            </>
          )}
          {ActiveInfoItem === 'seo'  && (
            <>
              <ProductFormThird/>
            </>
          )}
          {
            error && (
              <Form.Group widths='equal'>
                <Form.Field>
                  <FormError message={error}/>
                </Form.Field>
              </Form.Group>
            )
          }

          <Field component='input' name='id' type='hidden'/>
        </Form>

      </Segment>

    </Layout>

  )
}

export default compose(
  connect(
    ({ ...state }) => {
      const productFamiliesDetail = productFamiliesDetailDuck.selectors.detail(state)
      const categories =  categoryDuck.selectors.list(state)

      return {
        initialValues: { ...productFamiliesDetail.item, categories: categories.items.map((item)=>{
          return (productFamiliesDetail.item.categories && productFamiliesDetail.item.categories.filter(function(id) {
            return id == item.id}).length > 0 ? true : false
          )
        }) },
        productFamiliesDetail: productFamiliesDetail,
        category             : categories
      }
    },
    {
      getCategories      : categoryDuck.creators.get,
      getProductFamilies : productFamiliesDetailDuck.creators.get,
      resetItem          : productFamiliesDetailDuck.creators.resetItem,
      resetProductClasses: productClassesDetailDuck.creators.resetItem,
      setItem            : productFamiliesDetailDuck.creators.setItem,
      put                : productFamiliesDetailDuck.creators.put
    }),
  reduxForm({
    form              : formId,
    enableReinitialize: true
  })
)(ProductFamilyShow)
