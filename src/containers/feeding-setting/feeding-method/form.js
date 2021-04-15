import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import feedingMethodDetailDuck from '@reducers/pet/feeding-setting/feeding-method/detail'

const FeedingMethodForm = (props) => {
  const {
    feedingMethodDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(() => {
    if(feedingMethodDetail.item.id)
      props.get(feedingMethodDetail.item.id)
  }, [ feedingMethodDetail.item.id ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: feedingMethodDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(feedingMethodDetail.mode), [
    feedingMethodDetail.mode
  ])
  const isUpdating = Boolean(feedingMethodDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Feeding Method
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Feeding Method'
              name='name'
              placeholder='Enter method'
              required/>
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
                content='Save'
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
  connect(
    (state) => {
      const feedingMethodDetail = feedingMethodDetailDuck.selectors.detail(state)

      return {
        feedingMethodDetail,
        initialValues: { ...feedingMethodDetail.item }
      }
    },
    {
      get      : feedingMethodDetailDuck.creators.get,
      post     : feedingMethodDetailDuck.creators.post,
      put      : feedingMethodDetailDuck.creators.put,
      resetItem: feedingMethodDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'feeding-method-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: Yup.string().required('Method is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FeedingMethodForm)
