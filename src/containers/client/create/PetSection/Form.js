import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
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
              name='description'
              component={FormField}
              control={Form.TextArea}
              label='Description'
              placeholder='Enter description'
              autoFocus
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='document_type_id'
              component={FormField}
              control={Form.Select}
              options={[
                { key: 1, value: 1, text : 'Vet Letter' },
                { key: 2, value: 2, text : 'Medication Instructions' },
                { key: 3, value: 3, text : 'Pet Photo' },
                { key: 4, value: 4, text : 'PDF' },
              ]}
              label='Document Type *'
              placeholder='Select type'
              search
              selectOnBlur={false}
            />
            <Field
              name='file'
              component={FormField}
              control={Form.Input}
              label='File *'
              type='file'
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
