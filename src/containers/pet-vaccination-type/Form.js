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

import petVaccinationTypeDetailDuck from '@reducers/pet/vaccination-type/detail'

const PetVaccinationTypeForm = (props) => {
  const {
    petVaccinationTypeDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {
    if(petVaccinationTypeDetail.item.id)
      props.get(petVaccinationTypeDetail.item.id)
  }, [ petVaccinationTypeDetail.item.id ])
  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petVaccinationTypeDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petVaccinationTypeDetail.mode), [
    petVaccinationTypeDetail.mode
  ])
  const isUpdating = Boolean(petVaccinationTypeDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Vaccination Type
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

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Checkbox}
              label='Is Required ?'
              name='is_required'
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
      const petVaccinationTypeDetail = petVaccinationTypeDetailDuck.selectors.detail(state)

      return {
        petVaccinationTypeDetail,
        initialValues: petVaccinationTypeDetail.item
      }
    },
    {
      get      : petVaccinationTypeDetailDuck.creators.get,
      post     : petVaccinationTypeDetailDuck.creators.post,
      put      : petVaccinationTypeDetailDuck.creators.put,
      resetItem: petVaccinationTypeDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-vaccination-type-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: Yup.string().required('Name is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetVaccinationTypeForm)
