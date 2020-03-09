import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Divider, Form, Header, Tab } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import petDetailDuck from '@reducers/pet/detail'

const FormAdditionalInfo = props => {
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

        <Header as='h4'>Other Information</Header>

        <Form.Group widths='equal'>
          <Field
            name='coloring'
            component={FormField}
            control={Form.Input}
            label='Coloring'
            placeholder='Enter coloring'
            autoFocus
          />
          <Field
            name='received_dog_from'
            component={FormField}
            control={Form.Input}
            label='Received dog from'
            placeholder='Enter received dog from'
          />
        </Form.Group>
        <Form.Group>
          <Field
            name='crate_trained'
            component={FormField}
            control={Form.Checkbox}
            label='Crate Trained'
            type='checkbox'
          />
          <Field
            name='housebroken'
            component={FormField}
            control={Form.Checkbox}
            label='Housebroken'
            type='checkbox'
          />
          <Field
            name='formal_training'
            component={FormField}
            control={Form.Checkbox}
            label='Formal training'
            type='checkbox'
          />
        </Form.Group>

        <Divider />
        <Header as='h4'>Health</Header>

        <Form.Group widths='equal'>
          <Field
            name='medical_restrictions'
            component={FormField}
            control={Form.Input}
            label='Medical restrictions'
            placeholder='Enter medical restrictions'
          />
          <Field
            name='allergies_concerns'
            component={FormField}
            control={Form.Input}
            label='Allergies/Concerns'
            placeholder='Enter allergies/concerns'
          />
        </Form.Group>
        <Form.Group>
          <Field
            name='flea_tick_preventive'
            component={FormField}
            control={Form.Checkbox}
            label='Flea/Tick Preventive'
            type='checkbox'
          />
        </Form.Group>

        <Divider />
        <Header as='h4'>Hesitates to Eat</Header>

        <Form.Group>
          <Field
            name='peanut_butter'
            component={FormField}
            control={Form.Checkbox}
            label='Peanut Butter'
            type='checkbox'
          />
          <Field
            name='wet_food'
            component={FormField}
            control={Form.Checkbox}
            label='Wet Food'
            type='checkbox'
          />
          <Field
            name='water'
            component={FormField}
            control={Form.Checkbox}
            label='Water'
            type='checkbox'
          />
        </Form.Group>

        <Divider />
        <Header as='h4'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            name='overal_temperament'
            component={FormField}
            control={Form.Input}
            label='Overall Temperament'
            placeholder='Enter overall temperament'
          />
          <Field
            name='bitten_human'
            component={FormField}
            control={Form.Input}
            label='Bitten Human'
            placeholder='Enter bitten human'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='dog_fights'
            component={FormField}
            control={Form.Input}
            label='Dog Fights'
            placeholder='Enter dog fights'
          />
          <Field
            name='any_fears'
            component={FormField}
            control={Form.Input}
            label='Any Fears'
            placeholder='Enter any fears'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='prefer_men_women'
            component={FormField}
            control={Form.Input}
            label='Prefer Men/Women'
            placeholder='Enter prefer'
          />
          <Form.Field />
        </Form.Group>
        <Form.Group>
          <Field
            name='jumped_fences'
            component={FormField}
            control={Form.Checkbox}
            label='Jumped Fences'
            type='checkbox'
          />
          <Field
            name='shared_water_bowls'
            component={FormField}
            control={Form.Checkbox}
            label='Shared Water Bowls'
            type='checkbox'
          />
        </Form.Group>

        <Divider />
        <Header as='h4'>Day Care Info</Header>

        <Form.Group widths='equal'>
          <Field
            name='reason_removal'
            component={FormField}
            control={Form.Input}
            label='Reason for Removal'
            placeholder='Enter reason for removal'
          />
          <Form.Field />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='any_other_notes'
            component={FormField}
            control={Form.TextArea}
            label='Any other notes'
            placeholder='Enter description'
          />
        </Form.Group>
        <Form.Group>
          <Field
            name='attended_day_care'
            component={FormField}
            control={Form.Checkbox}
            label='Attended Day Care'
            type='checkbox'
          />
          <Field
            name='removed_from_day_care'
            component={FormField}
            control={Form.Checkbox}
            label='Removed from Day Care'
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
    form            : 'pet-create-additional-info',
    destroyOnUnmount: false,
  })
)(FormAdditionalInfo)

