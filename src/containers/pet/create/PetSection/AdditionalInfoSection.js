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
  const { reset, handleSubmit } = props;

  return (
    <Tab.Pane className='form-primary-segment-tab'>
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Header as='h3'>Other Information</Header>

        <Form.Group widths='equal'>
          <Field
            name='name'
            component={FormField}
            control={Form.Input}
            label='Coloring'
            placeholder='Coloring'
            autoFocus
            autoComplete='off'
          />
          <Field
            name='bread'
            component={FormField}
            control={Form.Input}
            label='Received Dog From'
            placeholder='Received Dog From'
            autoComplete='off'
          />
          <Form.Field />
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            name='fixed'
            component={FormField}
            control={Form.Checkbox}
            label='Crate Trained'
          />
          <Field
            name='retire'
            component={FormField}
            control={Form.Checkbox}
            label='Housebroken'
          />
          <Field
            name='retire'
            component={FormField}
            control={Form.Checkbox}
            label='Formal Training'
          />
          <Form.Field />
          <Form.Field />
        </Form.Group>

        <Header as='h3'>Health</Header>

        <Form.Group widths='equal'>
          <Field
            name='name'
            component={FormField}
            control={Form.Input}
            label='Medical Restrictions'
            placeholder='Medical Restrictions'
            autoComplete='off'
          />
          <Field
            name='bread'
            component={FormField}
            control={Form.Input}
            label='Allergies/Concerns'
            placeholder='Allergies/Concerns'
            autoComplete='off'
          />
          <Form.Field />
        </Form.Group>
        <Form.Group>
          <Field
            name='retire'
            component={FormField}
            control={Form.Checkbox}
            label='Flea/Tick Preventive'
          />
        </Form.Group>

        <Header as='h3'>Hesitates at Eat</Header>

        <Form.Group>
          <Field
            name='retire'
            component={FormField}
            control={Form.Checkbox}
            label='Peanut Butter'
          />
          <Field
            name='retire'
            component={FormField}
            control={Form.Checkbox}
            label='Wet food'
          />
          <Field
            name='retire'
            component={FormField}
            control={Form.Checkbox}
            label='Water'
          />
        </Form.Group>

        <Header as='h3'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            name='Days'
            component={FormField}
            control={Form.Input}
            label='Overall Temperament'
            placeholder='Overal Temperament'
            autoComplete='off'
          />
          <Field
            name='Days'
            component={FormField}
            control={Form.Input}
            label='Bittem Human'
            placeholder='Days'
            autoComplete='off'
          />
          <Form.Field />
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            name='Days'
            component={FormField}
            control={Form.Input}
            label='Dog Fights'
            placeholder='Dog Fights'
            autoComplete='off'
          />
          <Field
            name='Days'
            component={FormField}
            control={Form.Input}
            label='Any Fears'
            placeholder='Any Fears'
            autoComplete='off'
          />
          <Form.Field />
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            name='Days'
            component={FormField}
            control={Form.Input}
            label='Prefer Men/Women'
            placeholder='Prefer Men/Women'
            autoComplete='off'
          />
          <Form.Field />
          <Form.Field />
        </Form.Group>

        <Header as='h3'>Day Care Info</Header>

        <Form.Group widths='equal'>
          <Field
            name='Days'
            component={FormField}
            control={Form.Input}
            label='Reason for Removal'
            placeholder='Reason for Removal'
            autoComplete='off'
          />
          <Form.Field />
          <Form.Field />
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            label="Any Other Notes"
            name="behavioral"
            component={FormField}
            control={Form.TextArea}
            placeholder="Enter Description"
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            name='fixed'
            component={FormField}
            control={Form.Checkbox}
            label='Attended Day Care'
          />
          <Field
            name='retire'
            component={FormField}
            control={Form.Checkbox}
            label='Removed from Day Care'
          />
          <Form.Field />
          <Form.Field />
        </Form.Group>

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
    form: 'pet-create-additional-info',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {}

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

