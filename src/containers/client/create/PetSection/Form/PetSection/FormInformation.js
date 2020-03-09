import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Divider, Form, Header, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import petDetailDuck from '@reducers/pet/detail'

const FormInformation = props => {
  const {
    petDetail,
    error, handleSubmit, initialized, reset // redux-form
  } = props

  useEffect(() => {
    if(petDetail.status === 'GOT' && !initialized) props.initialize(petDetail.item)
  }, [ petDetail.status ])

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={petDetail.status === 'GETTING'}>
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            name='name'
            component={FormField}
            control={Form.Input}
            label='Name *'
            placeholder='Enter name'
            autoFocus
            autoComplete='off'
          />
          <Field
            name='breed_id'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 1, text : 'Shitzu' },
              { key: 2, value: 2, text : 'Yorkshire Terrier' },
              { key: 3, value: 3, text : 'Siberian Husky' },
              { key: 4, value: 4, text : 'Shitzu X' },
            ]}
            label='Breed *'
            placeholder='Select breed'
            search
            selectOnBlur={false}
          />
          <Field
            name='date_birth'
            component={FormField}
            control={Form.Input}
            label='Date of birth'
            type='date'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='weight'
            component={FormField}
            control={Form.Input}
            label='Weight'
            placeholder='Enter weight'
            type='number'
          />
          <Field
            name='sex'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 1, text : 'Male' },
              { key: 2, value: 2, text : 'Female' },
            ]}
            label='Sex'
            placeholder='Select sex'
            search
            selectOnBlur={false}
          />
          <Field
            name='size'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 1, text : 'Small' },
              { key: 2, value: 2, text : 'Medium' },
              { key: 3, value: 3, text : 'Large' },
              { key: 4, value: 4, text : 'Giant' },
            ]}
            label='Dog size'
            placeholder='Select size'
            selectOnBlur={false}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='reason_id'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 1, text : 'Owner Surrender' },
              { key: 2, value: 2, text : 'Deceased' },
              { key: 3, value: 3, text : 'Temporary Home' },
              { key: 4, value: 4, text : 'Other' },
            ]}
            label='Reason'
            placeholder='Select reason'
            search
            selectOnBlur={false}
          />
          <Field
            name='standing_reservation'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 1, text : 'Yes' },
              { key: 2, value: 2, text : 'No' },
            ]}
            label='Standing Reservation'
            placeholder='Select option'
            selectOnBlur={false}
          />
          <Field
            name='standing_reservation_days'
            component={FormField}
            control={Form.Input}
            label='&nbsp;'
            placeholder='Days'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='special_instructions'
            component={FormField}
            control={Form.TextArea}
            label='Special instructions'
            placeholder='Enter description'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='behavioral'
            component={FormField}
            control={Form.TextArea}
            label='Behavioral'
            placeholder='Enter description'
          />
        </Form.Group>
        <Form.Group>
          <Field
            name='fixed'
            component={FormField}
            control={Form.Checkbox}
            label='Fixed'
            type='checkbox'
          />
          <Field
            name='retire'
            component={FormField}
            control={Form.Checkbox}
            label='Retire'
            type='checkbox'
          />
        </Form.Group>

        <Divider />
        <Header as='h4'>Vaccinations</Header>

        <Form.Group widths='equal'>
          <Field
            name='date_rabies'
            component={FormField}
            control={Form.Input}
            label='Rabies'
            type='date'
          />
          <Field
            name='date_bordetella'
            component={FormField}
            control={Form.Input}
            label='Bordetella'
            type='date'
          />
          <Field
            name='date_notification_set_on'
            component={FormField}
            control={Form.Input}
            label='Notification set on'
            type='date'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='date_dhlpp'
            component={FormField}
            control={Form.Input}
            label='DHLPP'
            type='date'
          />
          <Field
            name='date_neg_fecal'
            component={FormField}
            control={Form.Input}
            label='Neg. Fecal'
            type='date'
          />
          <Field
            name='date_influenza'
            component={FormField}
            control={Form.Input}
            label='Influenza'
            type='date'
          />
        </Form.Group>
        <Form.Group>
          <Field
            name='all_current'
            component={FormField}
            control={Form.Checkbox}
            label='All current'
            type='checkbox'
          />
        </Form.Group>

        <Divider />
        <Header as='h4'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            name='date_tested'
            component={FormField}
            control={Form.Input}
            label='Tested'
            type='date'
          />
          <Field
            name='result'
            component={FormField}
            control={Form.Select}
            options={[
              { key: 1, value: 1, text : 'Pass' },
              { key: 2, value: 2, text : 'Fail' },
            ]}
            label='Result'
            placeholder='Select result'
            selectOnBlur={false}
          />
          <Form.Field />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='temperament_observations'
            component={FormField}
            control={Form.TextArea}
            label='Temperament test observations'
            placeholder='Enter description'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='date_strike_1'
            component={FormField}
            control={Form.Input}
            label='Strike 1'
            type='date'
          />
          <Field
            name='date_strike_2'
            component={FormField}
            control={Form.Input}
            label='Strike 2'
            type='date'
          />
          <Field
            name='date_strike_3'
            component={FormField}
            control={Form.Input}
            label='Strike 3'
            type='date'
          />
        </Form.Group>
        <Form.Group>
          <Field
            name='temperament_day_care'
            component={FormField}
            control={Form.Checkbox}
            label='Daycare'
            type='checkbox'
          />
          <Field
            name='temperament_aggressive'
            component={FormField}
            control={Form.Checkbox}
            label='Aggressive'
            type='checkbox'
          />
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
}

export default compose(
  connect(
    state => ({
      petDetail: petDetailDuck.selectors.detail(state)
    }),
    {}
  ),
  reduxForm({
    form            : 'pet-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        name    : YupFields.name,
        breed_id: YupFields.num_required,
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

