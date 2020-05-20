import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import productDetailDuck from '@reducers/product/detail'
import categoryDuck from '@reducers/category'
import YupFields from '@lib/constants/yup-fields'

const FormInformation = props => {
  const { category, error, handleSubmit, reset } = props

  const categoryHasChild = (_id) => {
    return Boolean(category.items.find(_category => _category.parent === _id))
  }

  return (
    <Tab.Pane className='form-primary-segment-tab'>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Name *'
            name='name'
            placeholder='Name'/>

          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Slug'
            name='slug'
            placeholder='Auto generated'
            readOnly/>

          <Field
            component={FormField}
            control={Form.Input}
            label='Short Description *'
            name='short_description'
            placeholder='Short Description'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Description'
            name='description'
            placeholder='Description'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Price *'
            name='price'
            placeholder='Price'
            type='number'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Stock *'
            name='stock'
            placeholder='Stock'
            type='number'/>
          <Field
            closeOnChange
            component={FormField}
            control={Form.Dropdown}
            fluid
            label='Categories *'
            multiple
            name='categories'
            options={category.items
              .filter(_category => !categoryHasChild(_category.id))
              .map(_category=> ({
                key  : _category.id,
                value: _category.id,
                text : `${_category.name}`
              }))}
            placeholder='Search categories'
            search
            selection
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Outstanding'
            name='is_outstanding'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Package'
            name='is_package'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Active'
            name='is_active'/>
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
    </Tab.Pane>
  )
}

export default compose(
  connect(
    (state) => {
      const productDetail = productDetailDuck.selectors.detail(state)

      return {
        productDetail,
        initialValues: productDetail.item,
        category     : categoryDuck.selectors.list(state)
      }
    },
    {}
  ),
  reduxForm({
    form              : 'product-create-information',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name             : YupFields.name,
        categories       : Yup.array().of(Yup.mixed()).min(1).label('Categories'),
        short_description: Yup.string().required('Short Description is required'),
        price            : Yup.number().required('Price is required'),
        stock            : Yup.number().required('Stock is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

