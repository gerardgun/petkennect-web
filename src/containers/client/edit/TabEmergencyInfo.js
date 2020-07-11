import React, { useEffect } from 'react'
import { Header, Tab, Form, Button, Divider, Segment } from 'semantic-ui-react'
import './styles.scss'
import { Field, reduxForm, FieldArray } from 'redux-form'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import clientDetailDuck from '@reducers/client/detail'
import FormError from '@components/Common/FormError'

function AuthorizedPeopleList({ fields, meta: { error, submitFailed } }) {
  const _handleAddBtnClick = () => fields.push({ ...authorizedPersonInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const authorizedPersonInitialState = {
    name    : '',
    relation: ''
  }

  return (
    <>
      <Divider/>
      <Header as='h6' className='form-section-header' color='blue'>PEOPLE AUTORIZED TO PICKE UP</Header>
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
          <Button
            content='Add person' onClick={_handleAddBtnClick}
            type='button'/>
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

function TabEmergencyInfo(props) {
  const {
    clientDetail,
    error,
    handleSubmit,
    reset,
    initialized
    // redux-form
  } = props

  useEffect(() => {
    if(clientDetail.item.id && !initialized) props.initialize(clientDetail.item)
  }, [ clientDetail.status ])

  return (
    <Tab.Pane className='border-none'>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>

        <Header as='h6' className='form-section-header' color='blue'>EMERGENCY CONTACT</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Name *'
            name='emergency_contact_name'
            placeholder='Enter names'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Relation *'
            name='emergency_contact_relationship'
            placeholder='Enter relationship'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Phone'
            name='emergency_contact_phones[0]'
            placeholder='Enter phone number'
            type='tel'/>
        </Form.Group>

        <Header as='h6' className='form-section-header' color='blue'>VETERINARIAN CONTACT</Header>
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
            label='Vet phone'
            name='emergency_vet_phones[0]'
            placeholder='Enter phone number'
            type='tel'/>
        </Form.Group>

        <FieldArray
          component={AuthorizedPeopleList}
          name='authorized_people_pick_up'
          title='People Authorized to Pick Up'/>

        {error && (
          <Form.Group widths='equal'>
            <Form.Field>
              <FormError message={error}/>
            </Form.Field>
          </Form.Group>
        )}

      </Form>
    </Tab.Pane>
  )
}

TabEmergencyInfo.propTypes = {  }

TabEmergencyInfo.defaultProps = {  }

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        initialValues: clientDetail.item
      }
    },
    {}
  ),
  reduxForm({
    form              : 'client-edit-step-2-form' ,
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        emergency_contact_name        : Yup.string().required('Contact name is required'),
        emergency_contact_relationship: Yup.string().required('Relation is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(TabEmergencyInfo)
