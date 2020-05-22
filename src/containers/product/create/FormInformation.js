import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Form, Tab, Header } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import productDetailDuck from '@reducers/product/detail'
import categoryDuck from '@reducers/category'
import productPackageDuck from '@reducers/product/package'

import YupFields from '@lib/constants/yup-fields'

import _groupBy  from 'lodash/groupBy'
import _orderBy  from 'lodash/orderBy'
import { useMemo } from 'react'

const FormInformation = props => {
  const {
    watchedShortDescription = '',
    productDetail,
    category,
    error,
    handleSubmit,
    reset
  } = props
  useEffect(() => {
    if(productDetail.item.id && productDetail.status === 'GOT')
      props.initialize({
        ...productDetail.item
      })
  }, [ productDetail.status , productDetail.item.id  ])

  const getPosibleSlug = (value = '') =>
    value.toLowerCase().split(' ').join('-')

  const groupAndCategories = useMemo(() => {
    const _categories = category.items
    const groupByParentCategory = _groupBy(_categories,'parent')
    const rootCategories = _orderBy(groupByParentCategory[null], [ 'order','id' ],[ 'asc','asc' ])

    let result = []
    rootCategories
      .forEach(_rootCategory => {
        const childrenCategory = groupByParentCategory[_rootCategory.id]
        if(childrenCategory) {
          result = [ ...result,{ ..._rootCategory, disabled: true }, ..._orderBy(childrenCategory, [ 'order','id' ],[ 'asc','asc' ]) ]

          return
        }
        result = [ ...result,{ ..._rootCategory } ]
      })

    return result
  }, [ category.items ])

  const _renderItemCategory = (_category) => {
    if(_category.parent === null)
      return   <div className='drop-down-group'>{_category.name}</div>

    return  <div className='drop-down-item-group'>{_category.name}</div>
  }

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={productDetail.status === 'GETTING'}>
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
            placeholder={getPosibleSlug(props.watchedName)}
            readOnly/>

        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            closeOnChange
            component={FormField}
            control={Form.Dropdown}
            fluid
            label='Categories *'
            multiple
            name='categories'
            options={groupAndCategories.map(_category=> ({
              key     : _category.id,
              value   : _category.id,
              text    : `${_category.name}`,
              disabled: Boolean(_category.disabled),
              content : _renderItemCategory(_category)
            }))}
            placeholder='Search categories'
            search
            selection
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group className='text-area-container' widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Short Description *'
            maxLength='160'
            name='short_description'
            placeholder='Short Description'/>
          <Header className='text-area-counter' color='grey' size='tiny'>{watchedShortDescription.length}/160 characteres</Header>
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
            component={FormField}
            control={Form.Select}
            disabled={props.watchedIsPackage && Boolean(props.productPackage.items.length)}
            label='Is Package *'
            name='is_package'
            options={[
              {
                key  : 1,
                value: true,
                text : 'Yes'
              },
              {
                key  : 2,
                value: false,
                text : 'No'

              }
            ]}
            placeholder='Select option'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Outstanding'
            name='is_outstanding'/>
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
        initialValues          : productDetail.item,
        category               : categoryDuck.selectors.list(state),
        productPackage         : productPackageDuck.selectors.list(state),
        watchedName            : formValueSelector('product-create-information')(state,'name'),
        watchedShortDescription: formValueSelector('product-create-information')(state,'short_description'),
        watchedCategories      : formValueSelector('product-create-information')(state,'categories'),
        watchedIsPackage       : formValueSelector('product-create-information')(state,'is_package')
      }
    },
    { }
  ),
  reduxForm({
    form            : 'product-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        name             : YupFields.name,
        categories       : Yup.array().of(Yup.mixed()).min(1).label('Categories'),
        short_description: Yup.string().required('Short Description is required'),
        price            : Yup.number().required('Price is required'),
        stock            : Yup.number().required('Stock is required'),
        is_package       : Yup.boolean().oneOf([ false, true ]).required('Is package is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

