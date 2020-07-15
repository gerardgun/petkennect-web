import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import petIncidentActionDetailDuck from '@reducers/pet/incident-action/detail'

const PetIncidentActionForm = (props) => {
  const {
    petIncidentActionDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {
    if(petIncidentActionDetail.item.id)
      props.get(petIncidentActionDetail.item.id)
  }, [ petIncidentActionDetail.item.id ])
  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petIncidentActionDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petIncidentActionDetail.mode), [
    petIncidentActionDetail.mode
  ])
  const isUpdating = Boolean(petIncidentActionDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Incident Action
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
              control={Select}
              label='Result'
              name='result_type'
              options={[
                { key: 'N', value: 'N',text: 'Neither' } ,
                { key: 'R',value: 'R', text: 'Removal from Camp' }
              ]}
              placeholder='Select an option'
              required
              selectOnBlur={false}/>
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
      const petIncidentActionDetail = petIncidentActionDetailDuck.selectors.detail(state)

      return {
        petIncidentActionDetail,
        initialValues: petIncidentActionDetail.item
      }
    },
    {
      get      : petIncidentActionDetailDuck.creators.get,
      post     : petIncidentActionDetailDuck.creators.post,
      put      : petIncidentActionDetailDuck.creators.put,
      resetItem: petIncidentActionDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-incident-action-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name       : Yup.string().required('Name is required'),
        result_type: Yup.string().required('Result is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetIncidentActionForm)
