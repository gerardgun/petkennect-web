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
            placeholder='Enter name'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Breed *'
            name='breed_id'
            options={[
              { key: 1, value: 1, text: 'Shitzu' },
              { key: 2, value: 2, text: 'Yorkshire Terrier' },
              { key: 3, value: 3, text: 'Siberian Husky' },
              { key: 4, value: 4, text: 'Shitzu X' }
            ]}
            placeholder='Select breed'
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Date of birth'
            name='date_birth'
            type='date'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Weight'
            name='weight'
            placeholder='Enter weight'
            type='number'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Sex'
            name='sex'
            options={[
              { key: 1, value: 1, text: 'Male' },
              { key: 2, value: 2, text: 'Female' }
            ]}
            placeholder='Select sex'
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Dog size'
            name='size'
            options={[
              { key: 1, value: 1, text: 'Small' },
              { key: 2, value: 2, text: 'Medium' },
              { key: 3, value: 3, text: 'Large' },
              { key: 4, value: 4, text: 'Giant' }
            ]}
            placeholder='Select size'
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Select}
            label='Reason'
            name='reason_id'
            options={[
              { key: 1, value: 1, text: 'Owner Surrender' },
              { key: 2, value: 2, text: 'Deceased' },
              { key: 3, value: 3, text: 'Temporary Home' },
              { key: 4, value: 4, text: 'Other' }
            ]}
            placeholder='Select reason'
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Standing Reservation'
            name='standing_reservation'
            options={[
              { key: 1, value: 1, text: 'Yes' },
              { key: 2, value: 2, text: 'No' }
            ]}
            placeholder='Select option'
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Input}
            label='&nbsp;'
            name='standing_reservation_days'
            placeholder='Days'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Special instructions'
            name='special_instructions'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Behavioral'
            name='behavioral'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Fixed'
            name='fixed'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Retire'
            name='retire'
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Vaccinations</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Rabies'
            name='date_rabies'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Bordetella'
            name='date_bordetella'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Notification set on'
            name='date_notification_set_on'
            type='date'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='DHLPP'
            name='date_dhlpp'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Neg. Fecal'
            name='date_neg_fecal'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Influenza'
            name='date_influenza'
            type='date'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='All current'
            name='all_current'
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Tested'
            name='date_tested'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Result'
            name='result'
            options={[
              { key: 1, value: 1, text: 'Pass' },
              { key: 2, value: 2, text: 'Fail' }
            ]}
            placeholder='Select result'
            selectOnBlur={false}/>
          <Form.Field/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Temperament test observations'
            name='temperament_observations'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Strike 1'
            name='date_strike_1'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Strike 2'
            name='date_strike_2'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Strike 3'
            name='date_strike_3'
            type='date'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Daycare'
            name='temperament_day_care'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Aggressive'
            name='temperament_aggressive'
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
        breed_id: YupFields.num_required
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

