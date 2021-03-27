import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, TextArea,Grid, Input, Segment, Select, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import productFamilyDuck from '@reducers/product/family'
import productFamilyDetailDuck from '@reducers/product/family/detail'
import categoryDuck from '@reducers/category'

export const formId = 'product-form'

const ProductFormFirst = props => {
  const {
    productFamily,
    category,
    error, handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    props.getProductFamilies()
    props.getCategories()
  }, [])

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>
        <Grid className='mt32'>
          <Grid.Column  computer={12} mobile={16} tablet={10}>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label='Product name'
                name='name'
                required
                type='text'/>
            </Form.Group> </Grid.Column>
          <Grid.Column computer={4} mobile={16} tablet={6}>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Checkbox}
                label='Active'
                name='is_active'
                type='checkbox'/>
              <Field
                component={FormField}
                control={Checkbox}
                label='Outstanding'
                name='is_outstanding'
                type='checkbox'/>
            </Form.Group>
          </Grid.Column>
        </Grid>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            label='Family'
            name='family'
            options={
              productFamily.items.map(item => ({
                key  : item.id,
                value: item.id,
                text : item.name
              }))
            }
            placeholder='Select product family'
            required
            selectOnBlur={false}/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={TextArea}
            label='Description'
            name='description'
            placeholder='Enter description'
            required/>
        </Form.Group>

        <Grid className='mt32'>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <label>Categories</label>
            <Segment>
              {
                category.items.length > 0  && category.items.filter(_ => _.id == _.parent || _.parent == null).map((item)=>(
                  <>
                    <Field
                      component={FormField}
                      control={Checkbox}
                      label={`${item.name}`}
                      name={`categories[${item.index}]`}
                      type='checkbox'/>
                    <div className='ml16'>
                      {
                        category.items.filter(_ => _.id != _.parent && _.parent == item.id).map((item)=>(
                          <>
                            <Field
                              component={FormField}
                              control={Checkbox}
                              label={`${item.name}`}
                              name={`categories[${item.index}]`}
                              type='checkbox'/>
                          </>
                        ))
                      }
                    </div>
                  </>
                ))
              }
            </Segment>
          </Grid.Column>
          <Grid.Column
            className='div_text_center' computer={8} mobile={16}
            tablet={8}>
          Select the categories where this product will appear. Remember that a product can belong to many categories at the same time.
          </Grid.Column>
        </Grid>
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
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const productDetail = productFamilyDetailDuck.selectors.detail(state)
      const categories =  categoryDuck.selectors.list(state)

      return {
        initialValues: { ...productDetail.item, categories: categories.items.map((item)=>{
          return (productDetail.item.categories && productDetail.item.categories.filter(function(id) {
            return id == item.id}).length > 0 ? true : false
          )
        }) },
        productFamily: productFamilyDuck.selectors.list(state),
        category     : categories
      }
    },
    {
      getProductFamilies: productFamilyDuck.creators.get,
      getCategories     : categoryDuck.creators.get,
      resetItem         : productFamilyDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form                    : formId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true,
    validate                : (values) => {
      const schema = {
        name       : Yup.string().required('Product name is required'),
        family     : Yup.string().required('Family is required'),
        description: Yup.string().required('Description is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ProductFormFirst)
