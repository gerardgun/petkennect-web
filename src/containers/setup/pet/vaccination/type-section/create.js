import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import petKindDuck from '@reducers/pet/kind'
import petVaccinationTypeDetailDuck from '@reducers/pet/vaccination-type/detail'

const PetVaccinationTypeForm = (props) => {
  const {
    petKind,
    petVaccinationTypeDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(()=> {
    if(petVaccinationTypeDetail.item.id) props.get(petVaccinationTypeDetail.item.id)

    props.getPetKinds()
  }, [ petVaccinationTypeDetail.item.id ])

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

  const isUpdating = Boolean(petVaccinationTypeDetail.item.id)
  const isOpened = useMemo(() => {
    return petVaccinationTypeDetail.mode === 'CREATE' || petVaccinationTypeDetail.mode === 'UPDATE'
  }, [ petVaccinationTypeDetail.mode ])
  const petSpeciesOptions = useMemo(() => {
    return petKind.items.map(item => ({
      key  : item.id,
      value: item.id,
      text : item.name
    }))
  }, [ petKind.status ])

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
            {isUpdating ? 'Update' : 'New'} Vaccination Type
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
              label='Pet Species'
              name='pet_class'
              options={petSpeciesOptions}
              placeholder='Select pet species'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
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
                basic
                className='w120'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Add Vaccination'}
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
        petKind      : petKindDuck.selectors.list(state),
        initialValues: petVaccinationTypeDetail.item
      }
    },
    {
      get        : petVaccinationTypeDetailDuck.creators.get,
      getPetKinds: petKindDuck.creators.get,
      post       : petVaccinationTypeDetailDuck.creators.post,
      put        : petVaccinationTypeDetailDuck.creators.put,
      resetItem  : petVaccinationTypeDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-vaccination-type-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name     : Yup.string().required('Name is required'),
        pet_class: Yup.number().required('Pet species is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetVaccinationTypeForm)
