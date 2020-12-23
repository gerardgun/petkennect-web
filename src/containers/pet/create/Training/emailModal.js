import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Select, Form, Header, Icon, Input, Label } from 'semantic-ui-react'
import TextAreaEditor from '@components/Common/TextAreaEditor'
import FormField from '@components/Common/FormField'

const Emailmodal = ()=>{
  return (
    <>

      <Form id='email-modal' onReset='' onSubmit=''>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Email'
            name='email'
            placeholder='Enter email'
            readOnly
            required
            type='email'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={Input}
            label='Subject'
            name='subject'
            placeholder='Enter subject'
            required/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            label='Type'

            name='type'
            options={[
              { key: 1, value: 1, text: 'Training Contract only' },
              { key: 2, value: 2, text: 'Training Contract and Client Forms' },
              { key: 3, value: 3, text: 'Follow Up and Feedback' },
              { key: 4, value: 4, text: 'Follow Up emailed on' }
            ]}
            placeholder='Select type'
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={TextAreaEditor}
            label='Description'
            name='body_text'
            required/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Attachments</Header>
        <Label
          basic color='grey' size='large'
          style={{ fontWeight: '400' }}>
          <Icon name='attach'/>
        </Label>

        <Field component='input' name='id' type='hidden'/>
      </Form>
    </>
  )
}

export default compose(
  connect(() => {

  }),
  reduxForm({
    form: 'email-modal'

  })

)(Emailmodal)
