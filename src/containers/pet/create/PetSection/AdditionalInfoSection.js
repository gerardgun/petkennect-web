import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Header, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import { syncValidate, formatIntToBool, parseBoolToInt } from '@lib/utils/functions'

import petDetailDuck from '@reducers/pet/detail'

const FormAdditionalInformation = props => {
  const { reset, handleSubmit } = props

  return (
    <Tab.Pane className='form-primary-segment-tab'>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Header as='h3'>Other Information</Header>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Form.Input}
            label='Coloring'
            name='info_coloring'
            placeholder='Coloring'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Received Dog From'
            name='info_received_from'
            placeholder='Received Dog From'/>
          <Form.Field/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Crate Trained'
            name='info_crate_trained'
            parse={parseBoolToInt}/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Housebroken'
            name='info_housebroken'
            parse={parseBoolToInt}/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Formal Training'
            name='info_formal_training'
            parse={parseBoolToInt}/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>

        <Header as='h3'>Health</Header>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Medical Restrictions'
            name='health_medical_restrictions'
            placeholder='Medical Restrictions'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Allergies/Concerns'
            name='health_allergies_concerns'
            placeholder='Allergies/Concerns'/>
          <Form.Field/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Flea/Tick Preventive'
            name='health_flea_tick_preventive'
            parse={parseBoolToInt}/>
        </Form.Group>

        <Header as='h3'>Hesitates at Eat</Header>

        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Peanut Butter'
            name='hesitate_peanut_butter'
            parse={parseBoolToInt}/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Wet food'
            name='hesitate_wet_food'
            parse={parseBoolToInt}/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Water'
            name='hesitate_water'
            parse={parseBoolToInt}/>
        </Form.Group>

        <Header as='h3'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Overall Temperament'
            name='temp_overall'
            placeholder='Overal Temperament'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Bittem Human'
            name='temp_bitten_human'
            placeholder='Days'/>
          <Form.Field/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Dog Fights'
            name='temp_dog_fights'
            placeholder='Dog Fights'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Any Fears'
            name='temp_any_fears'
            placeholder='Any Fears'/>
          <Form.Field/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Prefer Men/Women'
            name='temp_prefer'
            placeholder='Prefer Men/Women'/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>

        <Header as='h3'>Day Care Info</Header>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Reason for Removal'
            name='daycare_removed_reason'
            placeholder='Reason for Removal'/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Any Other Notes'
            name='daycare_notes'
            placeholder='Enter Description'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Attended Day Care'
            name='daycare_attended'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Removed from Day Care'
            name='daycare_removed'/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>

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
    form              : 'pet-create-additional-info',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {}

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormAdditionalInformation)

