import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input } from 'semantic-ui-react'
import * as yup from 'yup'
import _kebabCase from 'lodash/kebabCase'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

// import productCategoryDuck from '@reducers/category'
import productCategoryDetailDuck from '@reducers/category/detail'

const CategoryCreateForm = props => {
  const {
    change, error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(productCategoryDetailDuck.selectors.detail)
  // const list = useSelector(productCategoryDuck.selectors.list)

  useEffect(() => {
    if(editing) initialize(detail.item)
  }, [])

  // const getCategoryParentOptions = () => {
  //   let options = list.items
  //     .filter(({ parent_category }) => parent_category === null)
  //     .map(({ id, name }) => ({
  //       key  : id,
  //       value: id,
  //       text : name
  //     }))

  //   options.push({
  //     key  : 'NO_PARENT',
  //     value: null,
  //     text : 'No Parent'
  //   })

  //   return options
  // }

  const _handleClose = () => {
    dispatch(
      productCategoryDetailDuck.creators.resetItem()
    )
  }

  const _handleNameChange = name => {
    change('slug', _kebabCase(name))
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(productCategoryDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(productCategoryDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)
  // const categoryParentOptions = useMemo(() => getCategoryParentOptions(), [])

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='category' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          label='Name'
          name='name'
          onChange={_handleNameChange}
          placeholder='Enter name'/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Slug'
          name='slug'
          placeholder='Enter slug'
          readOnly/>
      </Form.Group>
      {/* <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Select}
          disabled={editing}
          label='Nest in'
          name='parent_category'
          options={categoryParentOptions}
          placeholder='Select a parent category'
          search
          selectOnBlur={false}/>
      </Form.Group> */}

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
  form    : 'category',
  validate: values  => {
    const schema = {
      name           : yup.string().required('Name is required'),
      slug           : yup.string().required('Slug is required'),
      parent_category: yup.mixed()
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(CategoryCreateForm)
