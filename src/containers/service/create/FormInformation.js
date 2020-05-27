import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import serviceDetailDuck from '@reducers/service/detail'

const FormInformation = props => {
  const {
    serviceDetail,
    // match,
    error, handleSubmit, initialized, reset // redux-form
  } = props

  useEffect(() => {
    if(!initialized && serviceDetail.item.id)
      props.initialize({
        ...serviceDetail.item
      })
  }, [ serviceDetail.status, serviceDetail.item.id ])

  // const isUpdating = match.params.id

  return (

    <Tab.Pane className='form-primary-segment-tab' loading={serviceDetail.status === 'GETTING'}>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Field component='input' name='type' type='hidden'/>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Name *'
            name='name'
            placeholder='Enter name'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.TextArea}
            label='Description *'
            name='description'
            placeholder='Enter description'/>

        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Active'
            name='is_active'
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
      </Form>
    </Tab.Pane>
  )
}

export default compose(
  withRouter,
  connect(
    ({  ...state }) => {
      return {
        serviceDetail: serviceDetailDuck.selectors.detail(state)
      }
    },
    {}
  ),
  reduxForm({
    form            : 'service-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        name: YupFields.name
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

