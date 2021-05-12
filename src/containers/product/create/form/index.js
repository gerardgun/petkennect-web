import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Checkbox, Form, Grid, Icon, Input, Segment, Select, TextArea } from 'semantic-ui-react'
import * as yup from 'yup'
import _kebabCase from 'lodash/kebabCase'
import _keyBy from 'lodash/keyBy'
import _mapValues from 'lodash/mapValues'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import petKindDuck from '@reducers/pet/kind'
import productDetailDuck from '@reducers/product/detail'
import productCategoryDuck from '@reducers/category'
import productFamilyDuck from '@reducers/product/family'

const ProductCreateForm = props => {
  const {
    change, error, handleSubmit, initialize, reset // redux-form
  } = props

  const dispatch = useDispatch()
  const petKindList = useSelector(petKindDuck.selectors.list)
  const productCategoryList = useSelector(productCategoryDuck.selectors.list)
  const productFamilyList = useSelector(productFamilyDuck.selectors.list)
  const detail = useSelector(productDetailDuck.selectors.detail)

  useEffect(() => {
    if(productCategoryList.items.length === 0)
      dispatch(
        productCategoryDuck.creators.get()
      )

    if(productFamilyList.items.length === 0)
      dispatch(
        productFamilyDuck.creators.get()
      )

    if(petKindList.items.length === 0)
      dispatch(
        petKindDuck.creators.get()
      )
  }, [])

  useEffect(() => {
    if(detail.status === 'GOT' || detail.status === 'PUT')
      initialize({
        ...detail.item,
        categories: _mapValues(_keyBy(detail.item.categories, id => id), () => true)
      })
  }, [ detail.status ])

  const _handleClose = () => {
    dispatch(
      productDetailDuck.creators.resetItem()
    )
  }

  const _handleNameChange = name => {
    change('slug', _kebabCase(name))
  }

  const _handleSubmit = values => {
    values = {
      ...values,
      categories: Object.entries(values.categories)
        .filter(([ , value ]) => value)
        .map(([ categoryId ]) => categoryId)
    }

    if(editing)
      return dispatch(productDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .catch(parseResponseError)
    else
      return dispatch(productDetailDuck.creators.post({ ...values, short_description: values.description }))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='product' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          label='Name'
          name='name'
          onChange={_handleNameChange}
          placeholder='Enter name'
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          icon={
            <Icon
              circular inverted link
              name='linkify'/>
          }
          label='Slug'
          labelPosition='left'
          name='slug'
          placeholder='Enter slug'
          readOnly/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          label='Family'
          name='product_family'
          options={
            productFamilyList.items
              .map(item => ({ key: item.id, text: item.name, value: item.id }))
          }
          placeholder='Select an option'
          required
          selectOnBlur={false}/>
        <Field
          component={FormField}
          control={Select}
          label='Pet Species'
          name='pet_class_id'
          options={
            petKindList.items
              .map(item => ({ key: item.id, text: item.name, value: item.id }))
          }
          placeholder='Select an option'
          required
          selectOnBlur={false}/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={TextArea}
          label='Description'
          name='description'
          placeholder='Enter description'
          required/>
      </Form.Group>
      <Form.Group>
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

      <br/>
      <Form.Group>
        <Form.Field>
          <label className='mb12'>Categories</label>

          <Grid>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Segment>
                {
                  productCategoryList.items.map(item => (
                    <Field
                      component={FormField}
                      control={Checkbox}
                      key={item.id}
                      label={`${item.name}`}
                      name={`categories[${item.id}]`}
                      type='checkbox'/>
                  ))
                }
              </Segment>
            </Grid.Column>
            <Grid.Column
              computer={8} mobile={16} tablet={8}>
              Select the categories where this product will appear.
              Remember that a product can belong to many categories at the same time.
            </Grid.Column>
          </Grid>
        </Form.Field>
      </Form.Group>

      {
        error && (
          <Form.Group widths='equal'>
            <Form.Field>
              <FormError message={error}/>
            </Form.Field>
          </Form.Group>
        )
      }
    </Form>
  )
}

export default reduxForm({
  form    : 'product',
  validate: values => {
    const schema = {
      name          : yup.string().required('Name is required'),
      categories    : yup.array().required('Choose at least one attribute'),
      pet_class_id  : yup.mixed().required('Pet Species is required'),
      product_family: yup.mixed().required('Product Family is required'),
      description   : yup.string().required('Description is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ProductCreateForm)
