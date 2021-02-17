import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Checkbox, Form, TextArea } from 'semantic-ui-react'
import loadable from '@loadable/component'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'

import authDuck from '@reducers/auth'
import clientCommentDetailDuck from '@reducers/client/comment/detail'

export const formId = 'client-comment-form'

const FormError = loadable(() => import('@components/Common/FormError'))

function ClientCommentForm(props) {
  const {
    auth,
    clientCommentDetail,
    currentTenant,
    error, handleSubmit, reset // redux-form
  } = props

  const { client: clientId } = useParams()

  const _handleSubmit = values => {
    values = parseFormValues(values)
    values = { ...values, client_id: clientId }

    if(isUpdating)
      return props.put(values)
        .then(() => props.resetItem())
        .catch(parseResponseError)
    else
      return props.post({ ...values, employee: currentTenant.employee.id, location: auth.location })
        .then(() => props.resetItem())
        .catch(parseResponseError)
  }

  const isUpdating = clientCommentDetail.mode === 'UPDATE'

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={TextArea}
            label='Internal Comment'
            name='comment'
            placeholder='Enter comment'
            required/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Follow Up'
            name='follow_up'
            parse={Number}
            type='checkbox'/>
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
    ({ auth, ...state }) => {
      const clientCommentDetail = clientCommentDetailDuck.selectors.detail(state)
      const currentTenant =  authDuck.selectors.getCurrentTenant(auth)

      return {
        auth,
        clientCommentDetail,
        currentTenant,
        // for redux form
        initialValues: { ...clientCommentDetail.item }
      }
    },
    {
      post     : clientCommentDetailDuck.creators.post,
      put      : clientCommentDetailDuck.creators.put,
      resetItem: clientCommentDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        comment: Yup.string().required('Internal Comment is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ClientCommentForm)
