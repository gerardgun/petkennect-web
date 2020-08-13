import React from 'react'
import { connect } from 'react-redux'
import { withRouter  } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate, parseFormValues } from '@lib/utils/functions'

import employeeTitleDetailDuck from '@reducers/employee/title/detail'

export const formId = 'employee-title-form'

const EmployeeTitleForm = props => {
  const {
    employeeTitleDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const _handleSubmit = values => {
    values = parseFormValues(values)

    if(updating)
      return props.put(values)
        .then(() => props.resetItem())
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(() => props.resetItem())
        .catch(parseResponseError)
  }

  const updating = Boolean(employeeTitleDetail.item.id)

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <Field component='input' name='id' type='hidden'/>
        <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={Input}
            label='Name'
            name='name'
            placeholder='Enter name'
            required/>
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
    </>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const employeeTitleDetail = employeeTitleDetailDuck.selectors.detail(state)

      return {
        employeeTitleDetail,
        initialValues: { ...employeeTitleDetail.item }
      }
    },
    {
      post     : employeeTitleDetailDuck.creators.post,
      put      : employeeTitleDetailDuck.creators.put,
      resetItem: employeeTitleDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: YupFields.name
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EmployeeTitleForm)
