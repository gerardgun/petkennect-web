import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Select, TextArea } from 'semantic-ui-react'
import loadable from '@loadable/component'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'
import { NoteTypeOptions } from '@lib/constants/pet'

import petNoteDetailDuck from '@reducers/pet/note/detail'

export const formId = 'pet-note-form'
const FormError = loadable(() => import('@components/Common/FormError'))

function PetNoteForm(props) {
  const {
    petNoteDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const { pet: petId } = useParams()

  const _handleSubmit = values => {
    values = parseFormValues(values)
    values = { ...values, pet_id: petId }

    if(isUpdating)
      return props.put(values)
        .then(() => props.resetItem())
        .catch(parseResponseError)
    else
      return props.post(values)
        .then(() => props.resetItem())
        .catch(parseResponseError)
  }

  const isUpdating = petNoteDetail.mode === 'UPDATE'

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
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
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            label='Type'
            name='type'
            options={NoteTypeOptions}
            placeholder='Select a type'
            required
            selectOnBlur={false}/>
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

        <Field component='input' name='id' type='hidden'/>
      </Form>
    </>
  )
}

export default compose(
  connect(
    state => {
      const petNoteDetail = petNoteDetailDuck.selectors.detail(state)

      return {
        petNoteDetail,
        // for redux form
        initialValues: { ...petNoteDetail.item }
      }
    },
    {
      post     : petNoteDetailDuck.creators.post,
      put      : petNoteDetailDuck.creators.put,
      resetItem: petNoteDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        description: Yup.string().required('Description is required'),
        type       : Yup.string().required('Type is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetNoteForm)
