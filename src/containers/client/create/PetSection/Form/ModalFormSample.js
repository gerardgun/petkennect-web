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
    error, handleSubmit, pristine, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => props.resetItem()

  const _handleSubmit = values => {
    if(isUpdating) {
      return props.put({ id: petDetail.item.id, ...values})
        .then(_handleClose)
        .catch(parseResponseError)
    } else {
      return props.post(values)
        .then(_handleClose)
        .catch(parseResponseError)
    }
  }

  const isOpened = useMemo(() => getIsOpened(petDetail.mode), [ petDetail.mode ])
  const isUpdating = Boolean(petDetail.item.id)

  return (
    <Modal
      className='form-modal side'
      open={isOpened}
      onClose={_handleClose}
      size='large'
    >
      <Modal.Content>
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Pet</Header>
          <Field name='id' component='input' type='hidden' />
          <Form.Group widths='equal'>
            <Field
              name='name'
              component={FormField}
              control={Form.Input}
              label='Name *'
              placeholder='Enter name'
              autoFocus
              autoComplete='off'
            />
            <Field
              name='breed_id'
              component={FormField}
              control={Form.Select}
              options={[
                { key: 1, value: 1, text : 'Shitzu' },
                { key: 2, value: 2, text : 'Yorkshire Terrier' },
                { key: 3, value: 3, text : 'Siberian Husky' },
                { key: 4, value: 4, text : 'Shitzu X' },
              ]}
              label='Breed *'
              placeholder='Select breed'
              search
              selectOnBlur={false}
            />
            <Field
              name='date_birth'
              component={FormField}
              control={Form.Input}
              label='Date of birth'
              type='date'
            />
            <Field
              name='sex'
              component={FormField}
              control={Form.Select}
              options={[
                { key: 1, value: 1, text : 'Male' },
                { key: 2, value: 2, text : 'Female' },
              ]}
              label='Sex *'
              placeholder='Select sex'
              search
              selectOnBlur={false}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='weight'
              component={FormField}
              control={Form.Input}
              label='Weight'
              placeholder='Enter weight'
              type='number'
            />
            <Field
              name='reason_id'
              component={FormField}
              control={Form.Select}
              options={[
                { key: 1, value: 1, text : 'Reason 1' },
                { key: 2, value: 2, text : 'Reason 2' },
              ]}
              label='Reason'
              placeholder='Select reason'
              search
              selectOnBlur={false}
            />
            <Field
              name='size'
              component={FormField}
              control={Form.Select}
              options={[
                { key: 1, value: 1, text : 'Small' },
                { key: 2, value: 2, text : 'Medium' },
                { key: 3, value: 3, text : 'Large' },
                { key: 4, value: 4, text : 'Giant' },
              ]}
              label='Dog size'
              placeholder='Select size'
              selectOnBlur={false}
            />
            <Form.Field />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='special_instructions'
              component={FormField}
              control={Form.TextArea}
              label='Special instructions'
              placeholder='Enter description'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='behavioral'
              component={FormField}
              control={Form.TextArea}
              label='Behavioral'
              placeholder='Enter description'
            />
          </Form.Group>
          <Form.Group>
            <Field
              name='fixed'
              component={FormField}
              control={Form.Checkbox}
              label='Fixed'
              type='checkbox'
            />
            <Field
              name='retire'
              component={FormField}
              control={Form.Checkbox}
              label='Retire'
              type='checkbox'
            />
          </Form.Group>

          <Divider />
          <Header as='h4'>Vaccinations</Header>

          <Form.Group widths='equal'>
            <Field
              name='date_rabies'
              component={FormField}
              control={Form.Input}
              label='Rabies'
              type='date'
            />
            <Field
              name='date_bordetella'
              component={FormField}
              control={Form.Input}
              label='Bordetella'
              type='date'
            />
            <Field
              name='date_notification_set_on'
              component={FormField}
              control={Form.Input}
              label='Notification set on'
              type='date'
            />
            <Field
              name='date_bordetella'
              component={FormField}
              control={Form.Input}
              label='Bordetella'
              type='date'
            />
          </Form.Group>

          {
            error && (
              <Form.Group widths="equal">
                <Form.Field>
                  <FormError message={error} />
                </Form.Field>
              </Form.Group>
            )
          }

          <Form.Group widths='equal' className='form-modal-actions'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                type="button"
                onClick={_handleClose}
              />
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save'}
                disabled={submitting}
                loading={submitting}
              />
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
      post: petDetailDuck.creators.post,
      put: petDetailDuck.creators.put,
      resetItem: petDetailDuck.creators.resetItem,
    }
  ),
  reduxForm({
    form              : 'client-pet-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate: values  => {
      const schema = {
        document_type_id: YupFields.num_required,
        file: YupFields.whenIsUpdating(YupFields.nullable, YupFields.file),
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetForm)
