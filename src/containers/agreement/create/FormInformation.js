import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Checkbox, Form, Input, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import TextAreaEditor from '@components/Common/TextAreaEditor'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import agreementDetailDuck from '@reducers/agreement/detail'

const AgreementCreate = props => {
  const {
    agreementDetail,
    error, handleSubmit, initialized, reset // redux-form
  } = props

  useEffect(() => {
    if(!initialized && agreementDetail.item.id)
      props.initialize({
        ...agreementDetail.item
      })
  }, [ agreementDetail.status, agreementDetail.item.id ])

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={agreementDetail.status === 'GETTING'}>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Name'
            name='name'
            placeholder='Enter name'
            required/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={TextAreaEditor}
            label='Body'
            name='body'
            placeholder='Enter Body'
            required/>
        </Form.Group>

        <Form.Group>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
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
    state => ({
      agreementDetail: agreementDetailDuck.selectors.detail(state)
    }),
    {
      // nothing
    }
  ),
  reduxForm({
    form            : 'agreement-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        name: YupFields.name,
        body: Yup.string().required('Body description is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(AgreementCreate)
