import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'

import { Button, Form, Header, Modal, TextArea } from 'semantic-ui-react'

import petNoteDetailDuck from '@reducers/pet/note/detail'

function PetNoteCreateFormModal(props) {
  const {
    petNoteDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const { mode, status } = petNoteDetail

  const { pet: petId } = useParams()

  const _handleSubmit = values => {
    values = parseFormValues(values)
    values = { ...values, pet_id: petId }

    return props.post(values)
      .then(() => props.resetItem())
      .catch(parseResponseError)
  }

  const _handleClose = () => {
    props.resetItem()
  }

  const saving = [ 'POSTING', 'PUTTING' ].includes(status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='small'>
      <Modal.Content>
        <Header as='h2'>
          {mode === 'CREATE' ? 'New' : 'Update'} Note
        </Header>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={TextArea}
              label='Description'
              name='description'
              placeholder='Enter description'
              required/>
          </Form.Group>

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                basic
                className='w120'
                color='teal'
                content='Cancel'
                disabled={saving}
                onClick={_handleClose}
                type='button'/>
              <Button
                className='w120'
                color='teal'
                content='Done'
                disabled={saving}
                loading={saving}
                type='submit'/>
            </Form.Field>
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
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => ({
      petNoteDetail: petNoteDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: petNoteDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'client-document-type-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetNoteCreateFormModal)
