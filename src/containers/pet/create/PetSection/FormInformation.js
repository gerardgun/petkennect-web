import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Header, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

const FormInformation = props => {
  const { error, handleSubmit, reset } = props

  return (
    <Tab.Pane className='form-primary-segment-tab'>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Form.Input}
            label='Name *'
            name='name'
            placeholder='Name'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Bread *'
            name='bread'
            placeholder='Enter lastname'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Date of Birth'
            name='date_of_birth'
            placeholder='Date of Birth'
            type='date'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Weight'
            name='weight'
            placeholder='Enter spouse'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Sex'
            name='contact_location_id'
            options={[
              { key: 1, value: 'M', text: 'Male' },
              { key: 2, value: 'F', text: 'Female' }
            ]}
            placeholder='Sex'
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Dog Size'
            name='dob_size'
            options={[
              { key: 1, value: 'small', text: 'Small' },
              { key: 2, value: 'small', text: 'Medium' }
            ]}
            placeholder='Dog Size'
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Select}
            label='Reason'
            name='reason'
            options={[
              { key: 1, value: 'small', text: 'Temporary Home' }
            ]}
            placeholder='Reason'
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Standing Reservation'
            name='standing_reservation'
            options={[
              { key: 1, value: 'small', text: 'Milo' }
            ]}
            placeholder='Standing Reservation'
            selectOnBlur={false}/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Days'
            name='Days'
            placeholder='Days'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Special Instructions'
            name='special_instructions'
            placeholder='Lorem ipsum...'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Behavioral'
            name='behavioral'
            placeholder='Lorem ipsum...'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Fixed'
            name='fixed'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Retire'
            name='retire'/>
          <Form.Field/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>

        <Header as='h3'>Vaccionations</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Rabies'
            name='rabies'
            placeholder='Rabies'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Bortedella'
            name='bortedella'
            placeholder='Bortedella'
            type='date'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Notification Set On'
            name='notification_set_on'
            type='date'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='DHLPP'
            name='rabies'
            placeholder='Rabies'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Neg. Fecal'
            name='bortedella'
            placeholder='Bortedella'
            type='date'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Influenza'
            name='notification_set_on'
            type='date'/>
        </Form.Group>

        <Header as='h3'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Tested'
            name='rabies'
            placeholder='Rabies'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Result'
            name='reason'
            options={[
            ]}
            placeholder='Result'
            selectOnBlur={false}/>
          <Form.Field/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Temperament Test Observations'
            name='behavioral'
            placeholder=''/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Strike 1'
            name='rabies'
            placeholder='Strike 1'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Strike 2'
            name='bortedella'
            placeholder='Strike 2'
            type='date'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Strike 3'
            name='notification_set_on'
            type='date'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Daycare'
            name='fixed'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Aggressive'
            name='retire'/>
          <Form.Field/>
          <Form.Field/>
          <Form.Field/>
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
  connect(
    () => ({}),
    {}
  ),
  reduxForm({
    form            : 'pet-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {}

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

