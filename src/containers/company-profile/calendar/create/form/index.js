import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  Form,
  Input,
  TextArea
} from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import companyProfileCalendarDetailDuck from '@reducers/company-profile/calendar/detail'

const CompanyProfileCalendarForm = (props) => {
  const {
    error,
    handleSubmit,
    reset,
    initialize // redux-form
  } = props
  const dispatch = useDispatch()
  const detail = useSelector(companyProfileCalendarDetailDuck.selectors.detail)

  useEffect(() => {
    if(editing)
      initialize({
        ...detail.item
      })
    // Set default data for new register
    else
      initialize({})
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(companyProfileCalendarDetailDuck.creators.resetItem())
  }

  const _handleSubmit = (values) => {
    if(editing)
      return dispatch(
        companyProfileCalendarDetailDuck.creators.put({ id: detail.item.id, ...values })
      )
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(companyProfileCalendarDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='company-profile-calendar' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Calendar Name'
          name='name'
          placeholder='Enter Calendar Name'
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={TextArea}
          label='Description'
          name='description'
          placeholder='Enter Description'/>
      </Form.Group>
      {error && (
        <Form.Group widths='equal'>
          <Form.Field>
            <FormError message={error}/>
          </Form.Field>
        </Form.Group>
      )}
    </Form>
  )
}

export default reduxForm({
  form    : 'company-profile-calendar',
  validate: (values) => {
    const schema = {
      name: Yup.string().required('Calendar Name is required')
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(CompanyProfileCalendarForm)
