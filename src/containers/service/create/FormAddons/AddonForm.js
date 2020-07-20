import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Header, Input, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import { parseResponseError, syncValidate } from '@lib/utils/functions'

import serviceAddonDetailDuck from '@reducers/service/addon/detail'
import YupFields from '@lib/constants/yup-fields'

const ServiceAddonForm = (props) => {
  const {
    serviceAddonDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: serviceAddonDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(serviceAddonDetail.mode), [ serviceAddonDetail.mode ])
  const isUpdating = Boolean(serviceAddonDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Addon
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Field
            component='input' defaultValue={true} name='group_code'
            type='hidden'/>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Name'
              name='name'
              placeholder='Enter name'
              required/>

          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Price'
              name='price'
              placeholder='Enter price'
              required
              type='number'/>
          </Form.Group>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              label='Active'
              name='is_active'
              toggle
              type='checkbox'/>
          </Form.Group>

          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
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
    (state) => {
      const serviceAddonDetail = serviceAddonDetailDuck.selectors.detail(state)

      return {
        serviceAddonDetail,
        initialValues: serviceAddonDetail.item

      }
    },
    {
      post     : serviceAddonDetailDuck.creators.post,
      put      : serviceAddonDetailDuck.creators.put,
      resetItem: serviceAddonDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'service-addon-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name : YupFields.name,
        price: Yup.string().required('Price is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ServiceAddonForm)
