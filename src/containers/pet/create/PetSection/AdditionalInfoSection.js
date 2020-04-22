import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Header, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

const FormInformation = props => {
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
            name='name'
            placeholder='Coloring'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Received Dog From'
            name='bread'
            placeholder='Received Dog From'/>
          <Form.Field/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Crate Trained'
            name='fixed'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Housebroken'
            name='retire'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Formal Training'
            name='retire'/>
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
            name='name'
            placeholder='Medical Restrictions'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Allergies/Concerns'
            name='bread'
            placeholder='Allergies/Concerns'/>
          <Form.Field/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Flea/Tick Preventive'
            name='retire'/>
        </Form.Group>

        <Header as='h3'>Hesitates at Eat</Header>

        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Peanut Butter'
            name='retire'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Wet food'
            name='retire'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Water'
            name='retire'/>
        </Form.Group>

        <Header as='h3'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Overall Temperament'
            name='Days'
            placeholder='Overal Temperament'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Bittem Human'
            name='Days'
            placeholder='Days'/>
          <Form.Field/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Dog Fights'
            name='Days'
            placeholder='Dog Fights'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Any Fears'
            name='Days'
            placeholder='Any Fears'/>
          <Form.Field/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Prefer Men/Women'
            name='Days'
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
            name='Days'
            placeholder='Reason for Removal'/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Any Other Notes'
            name='behavioral'
            placeholder='Enter Description'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Attended Day Care'
            name='fixed'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Removed from Day Care'
            name='retire'/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>

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
    form            : 'pet-create-additional-info',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {}

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

