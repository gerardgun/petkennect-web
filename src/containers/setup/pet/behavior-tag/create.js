import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import ratingKeyDetailDuck from '@reducers/rating-key/detail'

const BehaviorTagForm = props => {
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
          <Header as='h2' className='segment-content-header cls-MainHeader'>{isUpdating ? 'Update' : 'Add'} Behavior Tags</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Enter Tag'
              name='behavior_tag'
              placeholder='Enter Tag'
              selectOnBlur={false}/>
          </Form.Group>
          <br/>
          <label>Applies To</label>
          <br/>
          <Form.Group>
            <Field
              component={FormField} control={Checkbox}
              name='all'
              type='checkbox'/>
            <label className='mt20'>All</label>
          </Form.Group>
          <Form.Group>
            <Field
              component={FormField} control={Checkbox}
              name='general'
              type='checkbox'/>
            <label className='mt20 mr40'>General</label>
            <Field
              component={FormField} control={Checkbox}
              name='day_services'
              type='checkbox'/>
            <label className='mt20 mr40'>Day Services</label>
            <Field
              component={FormField} control={Checkbox}
              name='boarding'
              type='checkbox'/>
            <label className='mt20 mr40'>Boarding</label>
            <Field
              component={FormField} control={Checkbox}
              name='training'
              type='checkbox'/>
            <label className='mt20 mr40'>Training</label>
            <Field
              component={FormField} control={Checkbox}
              name='grooming'
              type='checkbox'/>
            <label className='mt20'>Grooming</label>
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
                basic
                className='cls-cancelButton'
                color='teal'
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
    form              : 'behavior-tag-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        behavior_tag: Yup.string().required('Tag is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(BehaviorTagForm)
