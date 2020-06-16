import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import locationDetailDuck from '@reducers/location/detail'

const LocationCreate = props => {
  const {
    locationDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => {
    props.resetItem()
    reset()
  }

  const _handleSubmit = values => {
    let finalValues = Object.entries(values)
      .filter(([ , value ]) => value !== null)
      .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

    if(isUpdating)
      return props.put({ id: locationDetail.item.id, ...finalValues })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post(finalValues)
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(locationDetail.mode), [ locationDetail.mode ])
  const isUpdating = Boolean(locationDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header cls-MainHeader'>{isUpdating ? 'Update' : 'New'} Location</Header>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Code *'
              name='code'
              placeholder='Enter code'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Name *'
              name='name'
              placeholder='Enter name'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Address 1'
              name='addresses[0]'
              placeholder='Enter address'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Address 2'
              name='addresses[1]'
              placeholder='Enter address'/>
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
      const locationDetail = locationDetailDuck.selectors.detail(state)
      const initialValues = { ...locationDetail.item }

      return {
        locationDetail,
        initialValues
      }
    },
    {
      post     : locationDetailDuck.creators.post,
      put      : locationDetailDuck.creators.put,
      resetItem: locationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'location-form',
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        code: Yup.string().required('Code is required').min(4).matches(/^[A-Z0-9-]+\s*$/, 'Code format must be uppercase. i.e: 02-RH'),
        name: YupFields.name
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(LocationCreate)
