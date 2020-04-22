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
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>

        <Header as='h4'>Other Information</Header>

        <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={Form.Input}
            label='Coloring'
            name='coloring'
            placeholder='Enter coloring'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Received dog from'
            name='received_dog_from'
            placeholder='Enter received dog from'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Crate Trained'
            name='crate_trained'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Housebroken'
            name='housebroken'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Formal training'
            name='formal_training'
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Health</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Medical restrictions'
            name='medical_restrictions'
            placeholder='Enter medical restrictions'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Allergies/Concerns'
            name='allergies_concerns'
            placeholder='Enter allergies/concerns'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Flea/Tick Preventive'
            name='flea_tick_preventive'
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Hesitates to Eat</Header>

        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Peanut Butter'
            name='peanut_butter'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Wet Food'
            name='wet_food'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Water'
            name='water'
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Overall Temperament'
            name='overal_temperament'
            placeholder='Enter overall temperament'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Bitten Human'
            name='bitten_human'
            placeholder='Enter bitten human'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Dog Fights'
            name='dog_fights'
            placeholder='Enter dog fights'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Any Fears'
            name='any_fears'
            placeholder='Enter any fears'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Prefer Men/Women'
            name='prefer_men_women'
            placeholder='Enter prefer'/>
          <Form.Field/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Jumped Fences'
            name='jumped_fences'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Shared Water Bowls'
            name='shared_water_bowls'
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Day Care Info</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Reason for Removal'
            name='reason_removal'
            placeholder='Enter reason for removal'/>
          <Form.Field/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Any other notes'
            name='any_other_notes'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Attended Day Care'
            name='attended_day_care'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Removed from Day Care'
            name='removed_from_day_care'
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
    form            : 'pet-create-additional-info',
    destroyOnUnmount: false
  })
)(FormAdditionalInfo)

