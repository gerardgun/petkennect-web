import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Select, Input, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import serviceAttributeDetailDuck from '@reducers/service/service-attribute/detail'

const ServiceAttributeCreateForm = props => {
  const {
    serviceAttributeDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: serviceAttributeDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(serviceAttributeDetail.mode), [ serviceAttributeDetail.mode ])
  const isUpdating = Boolean(serviceAttributeDetail.item.id)
  const disableType = serviceAttributeDetail.item.type != 'D' && serviceAttributeDetail.item.type != 'R'

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Attribute</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
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
              control={Select}
              disabled={disableType && isUpdating}
              label='Type'
              name='type'
              options={[
                { key: 1, value: 'D', text: 'Dropdown' },
                { key: 2, value: 'R', text: 'Radio' },
                { key: 3, value: 'K', text: 'Kennel' },
                { key: 4, value: 'L', text: 'Location' },
                { key: 5, value: 'S', text: 'Pet Size' },
                { key: 6, value: 'Y', text: 'Yard' }
              ]}
              placeholder='Select an option'
              required
              selectOnBlur={false}/>
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
    state => {
      const serviceAttributeDetail = serviceAttributeDetailDuck.selectors.detail(state)

      return {
        serviceAttributeDetail,
        initialValues: serviceAttributeDetail.item
      }
    },
    {
      post     : serviceAttributeDetailDuck.creators.post,
      put      : serviceAttributeDetailDuck.creators.put,
      resetItem: serviceAttributeDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'service-attribute-create-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required('Name is required'),
        type: Yup.string().required('Type is reqired')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ServiceAttributeCreateForm)
