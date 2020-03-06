import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button, Divider, Form, Header, Segment, Tab } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import clientDetailDuck from '@reducers/client/detail'

const AuthorizedPeopleList = ({ fields, meta: { error, submitFailed }, title = 'Some title' }) => {
  const authorizedPersonInitialState = {
    name: '',
    relation: ''
  }

  return (
    <>
      <Divider />
      <Header as='h4'>{title}</Header>
      <Segment className='form-primary-segment' padded='very'>
        {
          fields.map((item, index) => (
            <Form.Group key={index} widths='equal'>
              <Field
                name={`${item}.name`}
                component={FormField}
                control={Form.Input}
                label='Name'
                placeholder='Enter names'
                autoComplete='off'
              />
              <Field
                name={`${item}.relation`}
                component={FormField}
                control={Form.Input}
                label='Relation'
                placeholder='Enter relation'
                autoComplete='off'
              />
              <Form.Button icon='trash alternate outline' label='&nbsp;' onClick={() => fields.remove(index)} type='button' />
            </Form.Group>
          ))
        }
        <div style={{ textAlign: 'center' }}>
          <Button content='Add person' onClick={() => fields.push({ ...authorizedPersonInitialState })} type='button' />
        </div>
        {
          submitFailed && error && (
            <Form.Group widths="equal">
              <Form.Field>
                <FormError message={error} />
              </Form.Field>
            </Form.Group>
          )
        }
      </Segment>
    </>
  )
}

const FormEmergencyData = props => {
  const {
    clientDetail,
    error, handleSubmit, initialized, reset // redux-form
  } = props

  useEffect(() => {
    if(clientDetail.item.id && !initialized) props.initialize(clientDetail.item)
  }, [ clientDetail.status ])

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={clientDetail.status === 'GETTING'}>
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            name='parent_name'
            component={FormField}
            control={Form.Input}
            label='Name'
            placeholder='Enter names'
            autoFocus
            autoComplete='off'
          />
          <Field
            name='parent_lastname'
            component={FormField}
            control={Form.Input}
            label='Lastname'
            placeholder='Enter lastname'
            autoComplete='off'
          />
          <Field
            name='parent_relationship'
            component={FormField}
            control={Form.Input}
            label='Relationship'
            placeholder='Enter relationship'
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            name='vet_name'
            component={FormField}
            control={Form.Input}
            label='Vet name'
            placeholder='Enter vet name'
            autoComplete='off'
          />
          <Field
            name='vet_location'
            component={FormField}
            control={Form.Input}
            label='Vet location'
            placeholder='Enter vet location'
            autoComplete='off'
          />
          <Field
            name='parent_phone'
            component={FormField}
            control={Form.Input}
            label='Phone'
            placeholder='Enter phone number'
            type='tel'
            autoComplete='off'
          />
        </Form.Group>
        <FieldArray
          component={AuthorizedPeopleList}
          name='auth_people'
          title='People Authorized to Pick Up' />

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
      clientDetail: clientDetailDuck.selectors.detail(state)
    }),
    {}
  ),
  reduxForm({
    form              : 'client-create-emergency-data',
    destroyOnUnmount  : false,
  })
)(FormEmergencyData)

