import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input } from 'semantic-ui-react'
import * as yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { GroupType } from '@lib/constants/service'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import serviceGroupDetailDuck from '@reducers/service/group/detail'

const ServiceGroupCreateForm = props => {
  const {
    error, handleSubmit, reset, initialize // redux-form
  } = props

  const dispatch = useDispatch()
  const detail = useSelector(serviceGroupDetailDuck.selectors.detail)

  useEffect(() => {
    if(editing)
      initialize(detail.item)
  }, [ detail.item.id ])

  const _handleClose = () => {
    dispatch(
      serviceGroupDetailDuck.creators.resetItem()
    )
  }

  const _handleSubmit = values => {
    if(editing)
      return dispatch(serviceGroupDetailDuck.creators.put({ id: detail.item.id, ...values }))
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return dispatch(serviceGroupDetailDuck.creators.post(values))
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const editing = Boolean(detail.item.id)
  const isProtected = Object.keys(GroupType).includes(detail.item.type)

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='service-group' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
      <Form.Group widths='equal'>
        <Field
          component={FormField}
          control={Input}
          label='Service Group Name'
          name='name'
          placeholder='Enter group name'
          readOnly={isProtected}
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
  )
}

export default reduxForm({
  form    : 'service-group',
  validate: values => {
    const schema = {
      name: yup.string().required('Name is required')
    }

    return syncValidate(yup.object().shape(schema), values)
  }
})(ServiceGroupCreateForm)
