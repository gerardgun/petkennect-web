import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'
import YupFields from '@lib/constants/yup-fields'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import categoryDetailDuck from '@reducers/category/detail'
import categoryDuck from '@reducers/category'

const CategoryForm = props => {
  const {
    category,
    categoryDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(() => {
    if(categoryDetail.item.id)
      props.get(categoryDetail.item.id)
  }, [ categoryDetail.item.id ])

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: categoryDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const categoryHasChild = (_id) => {
    return Boolean(category.items.find(_category => _category.parent === _id))
  }

  const isOpened = useMemo(() => getIsOpened(categoryDetail.mode), [ categoryDetail.mode ])
  const isUpdating = Boolean(categoryDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header cls-MainHeader'>{isUpdating ? 'Update' : 'Add'} Category</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Form.Input}
              label='Name'
              name='name'
              placeholder='Enter name'/>
          </Form.Group>
          {/* {!isUpdating */}
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Select}
              disabled={isUpdating && categoryHasChild(categoryDetail.item.id)}
              label='Nest in'
              name='parent'
              options={[ ...category.items
                .filter(_category => _category.parent === null)
                .map((_category) => ({
                  key  : _category.id,
                  value: _category.id,
                  text : `${_category.name}`
                })),
              { key: 'NO_PARENT',value: null, text: 'No Parent' } ]
              }
              placeholder='Select a parent category'
              search
              selectOnBlur={false}/>
          </Form.Group>
          {/* } */}
          {
            error && (
              <Form.Group widths='equal'>
                <Form.Field>
                  <FormError message={error}/>
                </Form.Field>
              </Form.Group>
            )
          }

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                className='cls-cancelButton'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                className='cls-saveButton'
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const categoryDetail = categoryDetailDuck.selectors.detail(state)

      return {
        categoryDetail,
        initialValues: categoryDetail.item,
        category     : categoryDuck.selectors.list(state)
      }
    },
    {
      get      : categoryDetailDuck.creators.get,
      post     : categoryDetailDuck.creators.post,
      put      : categoryDetailDuck.creators.put,
      resetItem: categoryDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'category-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name  : YupFields.name,
        parent: Yup.mixed()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(CategoryForm)
