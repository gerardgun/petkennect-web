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

import BreedManagementDetailDuck from '@reducers/pet/breed-manager-setting/detail'
import petKindDuck from '@reducers/pet/kind'

const PetBreedForm = (props) => {
  const {
    petBreedDetail,
    error,
    petKind,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {
    props.getPetKinds()
    if(petBreedDetail.item.id)
      props.getBreedingDetails(petBreedDetail.item.id)
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
              name='breed'
              placeholder='Enter Breed'/>
            <Field
              component={FormField}
              control={Select}
              label='Size'
              name='size'
              options={[
                { key: 1, value: 'Small', text: 'Small' },
                { key: 2, value: 'Medium', text: 'Medium' },
                { key: 3, value: 'Large', text: 'Large' },
                { key: 4, value: 'Giant', text: 'Giant' }
              ]}
              placeholder='Select size'
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Coloring'
              name='coloring'
              placeholder='Enter Color'/>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Weight'
              name='weight_range:'
              placeholder='Enter Weight'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Pet Species'
              name='species'
              options={petKind.items.map(item=>({
                key  : item.id,
                value: item.name,
                text : `${item.name}`
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
      const petBreedDetail = BreedManagementDetailDuck.selectors.detail(state)
      const petKind = petKindDuck.selectors.list(state)

      return {
        petKind,
        petBreedDetail,
        initialValues: { ...petBreedDetail.item }
      }
    },
    {
      getPetKinds       : petKindDuck.creators.get,
      post              : BreedManagementDetailDuck.creators.post,
      put               : BreedManagementDetailDuck.creators.put,
      resetItem         : BreedManagementDetailDuck.creators.resetItem,
      getBreedingDetails: BreedManagementDetailDuck.creators.get
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
