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
import YupFields from '@lib/constants/yup-fields'

import petBreedDetailDuck from '@reducers/pet/breed/detail'
import petClassDuck from '@reducers/pet/class'

const PetBreedForm = (props) => {
  const {
    petBreedDetail,
    petClass,
    getPetClasses,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {
    getPetClasses()
  }, [ petBreedDetail.item.id ])
  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petBreedDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petBreedDetail.mode), [
    petBreedDetail.mode
  ])
  const isUpdating = Boolean(petBreedDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Pet Breed
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Name'
              name='name'
              placeholder='Enter name'/>
            <Field
              component={FormField}
              control={Select}
              label='Size'
              name='size'
              options={[
                { key: 1, value: 'S', text: 'Small' },
                { key: 2, value: 'M', text: 'Medium' },
                { key: 3, value: 'L', text: 'Large' },
                { key: 4, value: 'G', text: 'Giant' }
              ]}
              placeholder='Select size'
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Pet Class'
              name='pet_class'
              options={petClass.items.map(_petClass=>({
                key  : _petClass.id,
                value: _petClass.id,
                text : `${_petClass.name}`
              }))}
              placeholder='Select an option'
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
      const petBreedDetail = petBreedDetailDuck.selectors.detail(state)
      const petClass = petClassDuck.selectors.list(state)

      return {
        petBreedDetail,
        petClass,
        initialValues: petBreedDetail.item
      }
    },
    {
      getPetClasses: petClassDuck.creators.get,
      post         : petBreedDetailDuck.creators.post,
      put          : petBreedDetailDuck.creators.put,
      resetItem    : petBreedDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-breed-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name     : Yup.string().required(),
        size     : Yup.string().required(),
        pet_class: YupFields.num_required
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetBreedForm)
