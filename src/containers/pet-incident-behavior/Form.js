import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import YupFields from '@lib/constants/yup-fields'

import petIncidentBehaviorDetailDuck from '@reducers/pet/incident-behavior/detail'

const PetIncidentBehaviorForm = (props) => {
  const {
    petIncidentBehaviorDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {
    if(petIncidentBehaviorDetail.item.id)
      props.get()
  }, [ petIncidentBehaviorDetail.item.id ])
  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petIncidentBehaviorDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petIncidentBehaviorDetail.mode), [
    petIncidentBehaviorDetail.mode
  ])
  const isUpdating = Boolean(petIncidentBehaviorDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Incident Behavior
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Input}
              label='Name *'
              name='name'
              placeholder='Enter name'/>
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
      const petIncidentBehaviorDetail = petIncidentBehaviorDetailDuck.selectors.detail(state)

      return {
        petIncidentBehaviorDetail,
        initialValues: petIncidentBehaviorDetail.item
      }
    },
    {
      get      : petIncidentBehaviorDetailDuck.creators.get,
      post     : petIncidentBehaviorDetailDuck.creators.post,
      put      : petIncidentBehaviorDetailDuck.creators.put,
      resetItem: petIncidentBehaviorDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-incident-behavior-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: YupFields.name
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetIncidentBehaviorForm)
