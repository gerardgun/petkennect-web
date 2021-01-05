import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import ratingKeyDetailDuck from '@reducers/rating-key/detail'

const RatingkeyForm = props => {
  const {
    ratingKeyDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: ratingKeyDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(ratingKeyDetail.mode), [ ratingKeyDetail.mode ])
  const isUpdating = Boolean(ratingKeyDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='medium'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header cls-MainHeader'>{isUpdating ? 'Update' : 'Add'} Performance Rating Key</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Rating Key'

              name='rating_key'
              options={[
                { key: 1, value: 1, text: '1' },
                { key: 2, value: 2, text: '2' },
                { key: 3, value: 3, text: '3' },
                { key: 4, value: 4, text: '4' },
                { key: 5, value: 5, text: '5' },
                { key: 6, value: 6, text: '6' }
              ]}
              placeholder='Select Rating Key'
              required
              selectOnBlur={false}/>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Name'
              name='name'
              placeholder='Enter name'
              required/>
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
                className='cls-cancelButton'
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
      const ratingKeyDetail = ratingKeyDetailDuck.selectors.detail(state)

      return {
        ratingKeyDetail,
        initialValues: ratingKeyDetail.item
      }
    },
    {
      post     : ratingKeyDetailDuck.creators.post,
      put      : ratingKeyDetailDuck.creators.put,
      resetItem: ratingKeyDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'rating-key-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required('Name is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(RatingkeyForm)
