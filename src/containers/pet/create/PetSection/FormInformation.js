import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Header, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import petDetailDuck from '@reducers/pet/detail'

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
            label='Breed *'
            name='breed'
            placeholder='Enter lastname'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Date of Birth'
            name='born_at'
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
            name='sex'
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
            name='size'
            options={[
              { key: 1, value: 1, text: 'Small' },
              { key: 2, value: 2, text: 'Medium' },
              { key: 3, value: 3, text: 'Large' },
              { key: 4, value: 4, text: 'Giant' }
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
              { key: 1, value: 1, text: 'Owner Surrender' },
              { key: 2, value: 2, text: 'Deceased' },
              { key: 3, value: 3, text: 'Temporary Home' },
              { key: 4, value: 4, text: 'Other' }
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
            name='standing_reservation_days'
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
            name='behavioral_comments'
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
            name='retired'/>
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
            name='vac_rabies_date'
            placeholder='Rabies'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Bortedella'
            name='vac_bortedella_date'
            placeholder='Bortedella'
            type='date'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Notification Set On'
            name='vac_notification_set_on'
            type='date'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='DHLPP'
            name='vac_dhlpp_date'
            placeholder='Rabies'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Neg. Fecal'
            name='vac_neg_fecal_date'
            placeholder='Bortedella'
            type='date'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Notification Set On'
            name='vac_notification_set_on'
            type='date'/>
        </Form.Group>

        <Header as='h3'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Tested'
            name='tem_test_date'
            placeholder='Rabies'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Result'
            name='temp_test_result'
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
            name='temp_test_observations'
            placeholder=''/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Strike 1'
            name='temp_strikes.date_strike_1'
            placeholder='Strike 1'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Strike 2'
            name='temp_strikes.date_strike_2'
            placeholder='Strike 2'
            type='date'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Strike 3'
            name='temp_strikes.date_strike_3'
            type='date'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Daycare'
            name='temp_daycare'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Aggressive'
            name='temp_aggressive'
            type='checkbox'/>
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
    (state) => {
      const petDetail = petDetailDuck.selectors.detail(state)

      return {
        petDetail,
        initialValues: petDetail.item
      }
    },
    {}
  ),
  reduxForm({
    form              : 'pet-create-information',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {}

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

