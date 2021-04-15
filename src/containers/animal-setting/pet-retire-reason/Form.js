import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import petRetireReasonDetailDuck from '@reducers/pet/retire-reason/detail'

const PetRetireReasonForm = (props) => {
  const {
    petRetireReasonDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {
    if(petRetireReasonDetail.item.id)
      props.get(petRetireReasonDetail.item.id)
  }, [ petRetireReasonDetail.item.id ])
  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petRetireReasonDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petRetireReasonDetail.mode), [
    petRetireReasonDetail.mode
  ])
  const isUpdating = Boolean(petRetireReasonDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Retire Reason
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
  withRouter,
  connect(
    (state) => {
      const petRetireReasonDetail = petRetireReasonDetailDuck.selectors.detail(state)

      return {
        petRetireReasonDetail,
        initialValues: petRetireReasonDetail.item
      }
    },
    {
      get      : petRetireReasonDetailDuck.creators.get,
      post     : petRetireReasonDetailDuck.creators.post,
      put      : petRetireReasonDetailDuck.creators.put,
      resetItem: petRetireReasonDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-retire-reason-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: Yup.string().required('Name is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetRetireReasonForm)
