import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Divider, Form, Header, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate, formatIntToBool, parseBoolToInt } from '@lib/utils/functions'

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

        <Header as='h4' className='Cls-pethead'>Other Information</Header>

        <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={Form.Input}
            label='Coloring'
            name='info_coloring'
            placeholder='Enter coloring'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Received dog from'
            name='info_received_from'
            placeholder='Enter received dog from'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Crate Trained'
            name='info_crate_trained'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Housebroken'
            name='info_housebroken'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Formal training'
            name='info_formal_training'
            parse={parseBoolToInt}
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Health</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Medical restrictions'
            name='health_medical_restrictions'
            placeholder='Enter medical restrictions'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Allergies/Concerns'
            name='health_allergies_concerns'
            placeholder='Enter allergies/concerns'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Flea/Tick Preventive'
            name='health_flea_tick_preventive'
            parse={parseBoolToInt}
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Hesitates to Eat</Header>

        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Peanut Butter'
            name='hesitate_peanut_butter'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Wet Food'
            name='hesitate_wet_food'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Water'
            name='hesitate_water'
            parse={parseBoolToInt}
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Overall Temperament'
            name='temp_overall'
            placeholder='Enter overall temperament'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Bitten Human'
            name='temp_bitten_human'
            placeholder='Enter bitten human'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Dog Fights'
            name='temp_dog_fights'
            placeholder='Enter dog fights'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Any Fears'
            name='temp_any_fears'
            placeholder='Enter any fears'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Select}
            label='Prefer Men/Women'
            name='temp_prefer'
            options={[
              { key: 1, value: true, text: 'Men' }, // backend issue
              { key: 2, value: false, text: 'Women' }
            ]}
            placeholder='Select preference'
            selectOnBlur={false}/>
          <Form.Field/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Jumped Fences'
            name='temp_jumped_fences'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Shared Water Bowls'
            name='temp_shared_water_bowls'
            parse={parseBoolToInt}
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Day Care Info</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Reason for Removal'
            name='daycare_removed_reason'
            placeholder='Enter reason for removal'/>
          <Form.Field/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Any other notes'
            name='daycare_notes'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Attended Day Care'
            name='daycare_attended'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Removed from Day Care'
            name='daycare_removed'
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
    state => {
      const petDetail =  petDetailDuck.selectors.detail(state)

      return {
        petDetail,
        initialValues: petDetail.item
      }
    }
    ,
    {}
  ),
  reduxForm({
    form            : 'pet-create-additional-info',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        info_crate_trained         : Yup.mixed().required(),
        info_housebroken           : Yup.mixed().required(),
        info_formal_training       : Yup.mixed().required(),
        health_flea_tick_preventive: Yup.mixed().required(),
        daycare_attended           : Yup.mixed().required(),
        daycare_removed            : Yup.mixed().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }

  })
)(FormAdditionalInfo)

