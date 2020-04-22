import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button, Divider, Form, Header, Segment, Tab } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import clientDetailDuck from '@reducers/client/detail'

const AuthorizedPeopleList = ({ fields, meta: { error, submitFailed }, title = 'Some title' }) => {
  const _handleAddBtnClick = () => fields.push({ ...authorizedPersonInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const authorizedPersonInitialState = {
    name    : '',
    relation: ''
  }

  return (
    <>
      <Divider/>
      <Header as='h4'>{title}</Header>
      <Segment className='form-primary-segment' padded='very'>
        {
          fields.map((item, index) => (
            <Form.Group key={index} widths='equal'>
              <Field
                autoComplete='off'
                component={FormField}
                control={Form.Input}
                label='Name'
                name={`${item}.name`}
                placeholder='Enter names'/>
              <Field
                autoComplete='off'
                component={FormField}
                control={Form.Input}
                label='Relation'
                name={`${item}.relation`}
                placeholder='Enter relation'/>
              <Form.Button
                data-index={index} icon='trash alternate outline' label='&nbsp;'
                onClick={_handleRemoveBtnClick}
                type='button'/>
            </Form.Group>
          ))
        }
        <div style={{ textAlign: 'center' }}>
          <Button content='Add person' onClick={_handleAddBtnClick} type='button'/>
        </div>
        {
          submitFailed && error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
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
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Form.Input}
            label='Name'
            name='emergency_contact_name'
            placeholder='Enter names'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Lastname'
            name='emergency_contact_last_name'
            placeholder='Enter lastname'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Relationship'
            name='emergency_contact_relationship'
            placeholder='Enter relationship'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Vet name'
            name='emergency_vet_name'
            placeholder='Enter vet name'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Vet location'
            name='emergency_vet_location'
            placeholder='Enter vet location'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Phone'
            name='emergency_vet_phones[0]'
            placeholder='Enter phone number'
            type='tel'/>
        </Form.Group>
        <FieldArray
          component={AuthorizedPeopleList}
          name='authorized_people_pick_up'
          title='People Authorized to Pick Up'/>

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
      clientDetail: clientDetailDuck.selectors.detail(state)
    }),
    {}
  ),
  reduxForm({
    form            : 'client-create-emergency-data',
    destroyOnUnmount: false
  })
)(FormEmergencyData)

