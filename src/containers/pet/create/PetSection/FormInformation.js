import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Header, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'


const FormInformation = props => {
  const { error, handleSubmit, reset } = props;


  return (
    <Tab.Pane className='form-primary-segment-tab'>
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            name='name'
            component={FormField}
            control={Form.Input}
            label='Name *'
            placeholder='Name'
            autoFocus
            autoComplete='off'
          />
          <Field
            name='bread'
            component={FormField}
            control={Form.Input}
            label='Bread *'
            placeholder='Enter lastname'
            autoComplete='off'
          />
          <Field
            name='date_of_birth'
            component={FormField}
            control={Form.Input}
            label='Date of Birth'
            placeholder='Date of Birth'
            type="date"
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='weight'
            component={FormField}
            control={Form.Input}
            label='Weight'
            placeholder='Enter spouse'
            autoComplete='off'
          />
          <Field
            name='contact_location_id'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 'M', text : 'Male' },
              { key: 2, value: 'F', text : 'Female' },
            ]}
            label='Sex'
            placeholder='Sex'
            selectOnBlur={false}
          />
          <Field
            name='dob_size'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 'small', text : 'Small' },
              { key: 2, value: 'small', text : 'Medium' },
            ]}
            label='Dog Size'
            placeholder='Dog Size'
            selectOnBlur={false}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='reason'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 'small', text : 'Temporary Home' },
            ]}
            label='Reason'
            placeholder='Reason'
            selectOnBlur={false}
          />
          <Field
            name='standing_reservation'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 'small', text : 'Milo' },
            ]}
            label='Standing Reservation'
            placeholder='Standing Reservation'
            selectOnBlur={false}
          />
          <Field
            name='Days'
            component={FormField}
            control={Form.Input}
            label='Days'
            placeholder='Days'
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            label="Special Instructions"
            name="special_instructions"
            component={FormField}
            control={Form.TextArea}
            placeholder="Lorem ipsum..."
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            label="Behavioral"
            name="behavioral"
            component={FormField}
            control={Form.TextArea}
            placeholder="Lorem ipsum..."
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='fixed'
            component={FormField}
            control={Form.Checkbox}
            label='Fixed'
          />
          <Field
            name='retire'
            component={FormField}
            control={Form.Checkbox}
            label='Retire'
          />
          <Form.Field />
          <Form.Field />
          <Form.Field />
        </Form.Group>

        <Header as='h3'>Vaccionations</Header>

        <Form.Group widths='equal'>
          <Field
            name='rabies'
            component={FormField}
            control={Form.Input}
            label='Rabies'
            placeholder='Rabies'
            type="date"
          />
          <Field
            name='bortedella'
            component={FormField}
            control={Form.Input}
            label='Bortedella'
            placeholder='Bortedella'
            type="date"
          />
          <Field
            name='notification_set_on'
            component={FormField}
            control={Form.Input}
            label='Notification Set On'
            type='date'
            autoComplete='off'
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            name='rabies'
            component={FormField}
            control={Form.Input}
            label='DHLPP'
            placeholder='Rabies'
            type="date"
          />
          <Field
            name='bortedella'
            component={FormField}
            control={Form.Input}
            label='Neg. Fecal'
            placeholder='Bortedella'
            type="date"
          />
          <Field
            name='notification_set_on'
            component={FormField}
            control={Form.Input}
            label='Influenza'
            type='date'
            autoComplete='off'
          />
        </Form.Group>

        <Header as='h3'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            name='rabies'
            component={FormField}
            control={Form.Input}
            label='Tested'
            placeholder='Rabies'
            type="date"
          />
          <Field
            name='reason'
            component={FormField}
            control={Form.Select}
            options={[
            ]}
            label='Result'
            placeholder='Result'
            selectOnBlur={false}
          />
          <Form.Field />
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            label="Temperament Test Observations"
            name="behavioral"
            component={FormField}
            control={Form.TextArea}
            placeholder=""
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            name='rabies'
            component={FormField}
            control={Form.Input}
            label='Strike 1'
            placeholder='Strike 1'
            type="date"
          />
          <Field
            name='bortedella'
            component={FormField}
            control={Form.Input}
            label='Strike 2'
            placeholder='Strike 2'
            type="date"
          />
          <Field
            name='notification_set_on'
            component={FormField}
            control={Form.Input}
            label='Strike 3'
            type='date'
            autoComplete='off'
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            name='fixed'
            component={FormField}
            control={Form.Checkbox}
            label='Daycare'
          />
          <Field
            name='retire'
            component={FormField}
            control={Form.Checkbox}
            label='Aggressive'
          />
          <Form.Field />
          <Form.Field />
          <Form.Field />
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
      </Form>
    </Tab.Pane>
  )
};

export default compose(
  connect(
    state => ({
    }),
    {}
  ),
  reduxForm({
    form: 'pet-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {}

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

