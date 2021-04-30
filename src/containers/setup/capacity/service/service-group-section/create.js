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
import serviceGroupPetKindDetailDuck from '@reducers/pet/kind/detail' // wip

const ServiceGroupPetKindFormModal = (props) => {
  const {
    petKindList,
    serviceGroupPetKindDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(()=> {
    if(serviceGroupPetKindDetail.item.id) props.get(serviceGroupPetKindDetail.item.id)

    if(petKindList.items.length === 0) props.getPetKinds()
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
              label='Service Group'
              name='service_group_id'
              options={[
                { text: 'Day Services', value: 'Day Services' },
                { text: 'Boarding', value: 'Boarding' },
                { text: 'Training', value: 'Training' },
                { text: 'Grooming', value: 'Grooming' }
              ]}
              placeholder='Select service group'
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
      const serviceGroupPetKindDetail = serviceGroupPetKindDetailDuck.selectors.detail(state)

      return {
        petKindList  : petKindDuck.selectors.list(state),
        serviceGroupPetKindDetail,
        initialValues: serviceGroupPetKindDetail.item
      }
    },
    {
      get        : serviceGroupPetKindDetailDuck.creators.get,
      getPetKinds: petKindDuck.creators.get,
      post       : serviceGroupPetKindDetailDuck.creators.post,
      put        : serviceGroupPetKindDetailDuck.creators.put,
      resetItem  : serviceGroupPetKindDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'service-group-pet-kind',
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {

      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ServiceGroupPetKindFormModal)
