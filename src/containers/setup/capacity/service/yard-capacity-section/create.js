import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import petKindDuck from '@reducers/pet/kind'
import petKindSizeDetailDuck from  '@reducers/pet/kind/size/detail'

const PetKindSizeForm = (props) => {
  const {
    petKindList,
    serviceGroupPetKindDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(()=> {
    if(serviceGroupPetKindDetail.item.id) props.get(serviceGroupPetKindDetail.item.id)
  }, [ serviceGroupPetKindDetail.item.id ])

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: serviceGroupPetKindDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(serviceGroupPetKindDetail.item.id)
  const open = [ 'CREATE', 'UPDATE' ].includes(serviceGroupPetKindDetail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'New'} Service Group
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Species'
              name='pet_kind_id'
              options={
                petKindList.items.map(({ id, name }) => ({
                  text : name,
                  value: id
                }))
              }
              placeholder='Select Species'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Yard'
              name='pet_kind_size_id'
              options={[
                { value: 1, text: 'Mini' },
                { value: 2, text: 'Small' },
                { value: 3, text: 'Medium' },
                { value: 4, text: 'Large' },
                { value: 5, text: 'Giant' }
              ]}
              placeholder='Select Yard'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Max Capacity Per Day'
              name='max_capacity_per_day'
              placeholder='0'
              required
              type='number'/>
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
                className='w120'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Done'}
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
      const serviceGroupPetKindDetail = petKindSizeDetailDuck.selectors.detail(state)

      return {
        petKindList  : petKindDuck.selectors.list(state),
        serviceGroupPetKindDetail,
        initialValues: serviceGroupPetKindDetail.item
      }
    },
    {
      get      : petKindSizeDetailDuck.creators.get,
      post     : petKindSizeDetailDuck.creators.post,
      put      : petKindSizeDetailDuck.creators.put,
      resetItem: petKindSizeDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'pet-kind-size-capacity',
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {

      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetKindSizeForm)
