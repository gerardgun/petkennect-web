import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Divider, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import petDetailDuck from '@reducers/pet/detail'

const PetForm = props => {
  const {
    petDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => props.resetItem()

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: petDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post(values)
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petDetail.mode), [ petDetail.mode ])
  const isUpdating = Boolean(petDetail.item.id)

  return (
    <Modal
      className='form-modal side'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Pet</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              autoFocus
              component={FormField}
              control={Form.Input}
              label='Name *'
              name='name'
              placeholder='Enter name'/>
            <Field
              component={FormField}
              control={Form.Select}
              label='Breed *'
              name='breed_id'
              options={[
                { key: 1, value: 1, text: 'Shitzu' },
                { key: 2, value: 2, text: 'Yorkshire Terrier' },
                { key: 3, value: 3, text: 'Siberian Husky' },
                { key: 4, value: 4, text: 'Shitzu X' }
              ]}
              placeholder='Select breed'
              search
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Form.Input}
              label='Date of birth'
              name='date_birth'
              type='date'/>
            <Field
              component={FormField}
              control={Form.Select}
              label='Sex *'
              name='sex'
              options={[
                { key: 1, value: 1, text: 'Male' },
                { key: 2, value: 2, text: 'Female' }
              ]}
              placeholder='Select sex'
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Input}
              label='Weight'
              name='weight'
              placeholder='Enter weight'
              type='number'/>
            <Field
              component={FormField}
              control={Form.Select}
              label='Reason'
              name='reason_id'
              options={[
                { key: 1, value: 1, text: 'Reason 1' },
                { key: 2, value: 2, text: 'Reason 2' }
              ]}
              placeholder='Select reason'
              search
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Form.Select}
              label='Dog size'
              name='size'
              options={[
                { key: 1, value: 1, text: 'Small' },
                { key: 2, value: 2, text: 'Medium' },
                { key: 3, value: 3, text: 'Large' },
                { key: 4, value: 4, text: 'Giant' }
              ]}
              placeholder='Select size'
              selectOnBlur={false}/>
            <Form.Field/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.TextArea}
              label='Special instructions'
              name='special_instructions'
              placeholder='Enter description'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.TextArea}
              label='Behavioral'
              name='behavioral'
              placeholder='Enter description'/>
          </Form.Group>
          <Form.Group>
            <Field
              component={FormField}
              control={Form.Checkbox}
              label='Fixed'
              name='fixed'
              type='checkbox'/>
            <Field
              component={FormField}
              control={Form.Checkbox}
              label='Retire'
              name='retire'
              type='checkbox'/>
          </Form.Group>

          <Divider/>
          <Header as='h4'>Vaccinations</Header>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Input}
              label='Rabies'
              name='date_rabies'
              type='date'/>
            <Field
              component={FormField}
              control={Form.Input}
              label='Bordetella'
              name='date_bordetella'
              type='date'/>
            <Field
              component={FormField}
              control={Form.Input}
              label='Notification set on'
              name='date_notification_set_on'
              type='date'/>
            <Field
              component={FormField}
              control={Form.Input}
              label='Bordetella'
              name='date_bordetella'
              type='date'/>
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
    state => {
      const petDetail = petDetailDuck.selectors.detail(state)

      return {
        petDetail,
        initialValues: petDetail.item
      }
    },
    {
      post     : petDetailDuck.creators.post,
      put      : petDetailDuck.creators.put,
      resetItem: petDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'client-pet-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        document_type_id: YupFields.num_required,
        file            : YupFields.whenIsUpdating(YupFields.nullable, YupFields.file)
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetForm)
