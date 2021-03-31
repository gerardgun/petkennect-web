import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Input, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import petIncidentTypeDetailDuck from '@reducers/pet/incident-type/detail'

const PetIncidentTypeForm = (props) => {
  const {
    petIncidentTypeDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(() => {
    if(petIncidentTypeDetail.item.id)
      props.get(petIncidentTypeDetail.item.id)
  }, [ petIncidentTypeDetail.item.id ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petIncidentTypeDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const _handleBlurLimit = (e, value) => {
    if(!value)
      props.change('has_limit',false)
  }

  const isOpened = useMemo(() => getIsOpened(petIncidentTypeDetail.mode), [
    petIncidentTypeDetail.mode
  ])
  const isUpdating = Boolean(petIncidentTypeDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Incident Type
          </Header>
          <Field component='input' name='id' type='hidden'/>
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
              label='Group Play Removal Limit'
              name='groupLimit'
              placeholder='Enter group play limit'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Service Removal Limit'
              name='serviceLimit'
              placeholder='Enter service limit'
              required/>
          </Form.Group>
          {

            props.watchedHasLimit  && (
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Limit of accidents'
                  name='limit'
                  onBlur={_handleBlurLimit}
                  placeholder='Enter size'
                  required
                  type='number'/>
              </Form.Group>
            )
          }

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
      const petIncidentTypeDetail = petIncidentTypeDetailDuck.selectors.detail(state)

      return {
        petIncidentTypeDetail,
        initialValues  : { ...petIncidentTypeDetail.item, has_limit: Boolean(petIncidentTypeDetail.item.limit) },
        watchedLimit   : formValueSelector('pet-incident-type-form')(state,'limit'),
        watchedHasLimit: formValueSelector('pet-incident-type-form')(state,'has_limit')
      }
    },
    {
      get      : petIncidentTypeDetailDuck.creators.get,
      post     : petIncidentTypeDetailDuck.creators.post,
      put      : petIncidentTypeDetailDuck.creators.put,
      resetItem: petIncidentTypeDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-incident-type-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name : Yup.string().required('Name is required'),
        limit: Yup.number().min(1, 'Limit must be greater than 1').when('has_limit', {
          is  : true,
          then: (m) => m.required('Limit is Required')
        })
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetIncidentTypeForm)
