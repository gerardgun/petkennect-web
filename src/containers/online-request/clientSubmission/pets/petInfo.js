import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Header , Form, Input } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'

function PetInfo() {
  return (
    <>
      <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
      <Form.Group widths={2}>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Name'
          name='name'
          placeholder='Enter Name'/>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Breed'
          name='breed'
          placeholder='Enter Breed'/>
      </Form.Group>
      <Form.Group widths={2}>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Date Of Birth'
          name='dateOfBirth'
          placeholder='Enter Date Of Birth'/>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Age'
          name='age'
          placeholder='Enter Age'/>
      </Form.Group>
      <Form.Group widths={2}>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Dog Size'
          name='dogSize'
          placeholder='Enter Dog Size'/>
        <Field
          component={FormField}
          control={Input}
          label='Color'
          name='info_coloring'
          placeholder='Enter coloring'/>

      </Form.Group>
      <Form.Group widths={2}>
        <Field
          component={FormField}
          control={Input}
          label='Received Dog From'
          name='info_received_from'
          placeholder='Enter received dog from'/>
      </Form.Group>
      <Header as='h6' className='section-header' color='blue'>Vaccinations</Header>
      <Form.Group widths={2}>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Rabies'
          name='rabies'
          type='date'/>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Bordetella'
          name='bordetella'
          type='date'/>
      </Form.Group>
      <Form.Group widths={2}>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Notification Send On'
          name='notification'
          type='date'/>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='DHLPP'
          name='dhlpp'
          type='date'/>
      </Form.Group>
      <Form.Group widths={2}>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Neg. Fecal'
          name='fecal'
          type='date'/>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Influenza'
          name='influenza'
          type='date'/>
      </Form.Group>
    </>
  )
}

export default compose(
  withRouter,
  connect(
  ),
  reduxForm({
    form              : 'pet-info-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(PetInfo)
