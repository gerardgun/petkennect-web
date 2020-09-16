import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Segment, Checkbox, Select, Input, Icon, Step, Dropdown } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'
import PetItem from './PetItem'

function AddOnsItem({ item }) {
  return (
    <div className='div-kannel-selection'>
      <Header as='h3' className='section-info-header'>What Frequency will be for {item[0].name}</Header>
      <Field
        component={FormField}
        control={Select}
        key={item[0].id}
        label='Frequency'
        name={`${item[0].id}.Frequency`}
        options={[
          { key: 1, value: 1, text: 'Test1' },
          { key: 2, value: 2, text: 'Test2' }
        ]}
        placeholder='Select frequency'
        selectOnBlur={false}/>
    </div>
  )
}

const ClientFormWizardSecond = props => {
  const {
    clientPet,
    error, handleSubmit, reset // redux-form
  } = props
  useEffect(() => {
    props.getClientPets()
  }, [])

  return (
    <>
      <Step.Group widths={16}>
        <Step active>
          <Icon name='check circle'/>
          <Step.Content>
            <Step.Title>Service Information</Step.Title>
          </Step.Content>
        </Step>
        <Step active>
          <Icon name='check circle'/>
          <Step.Content>
            <Step.Title>Pet Information</Step.Title>
          </Step.Content>
        </Step>
        <Step disabled>
          <Icon name='check circle'/>
          <Step.Content>
            <Step.Title>Summary</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form className='section-info-item-form' onReset={reset} onSubmit={handleSubmit}>

        {props.selectedPets && props.selectedPets.map((petId)=> (
          <PetItem
            checkIn={props.checkIn} checkOut={props.checkOut} item={clientPet.items.filter(_pet => _pet.id === petId)}
            key={petId}/>
        ))}

        <Segment>

          <div  className='div-kannel-selection'>
            <Header as='h3' className='section-info-header'>What else can we offer?</Header>
            <Field
              closeOnChange
              component={FormField}
              control={Dropdown}
              fluid
              label='Search addon'
              multiple
              name='addon'
              options={[
                { key: 1, value: 1, text: 'Test1' },
                { key: 2, value: 2, text: 'Test2' }
              ]}
              placeholder='Search addon'
              required
              selection
              selectOnBlur={false}/>
            <Button
              basic
              className='w100'
              color='teal'
              content='Add Grooming'
              type='button'/>
          </div>
          <Segment>
            <Header as='h3' className='section-info-header'>Food</Header>
            {props.selectedPets && props.selectedPets.map((petId)=> (
              <AddOnsItem
                item={clientPet.items.filter(_pet => _pet.id === petId)}
                key={petId}/>
            ))}
          </Segment>
          <div  className='div-kannel-selection div-additional-information'>
            <Header as='h3' className='section-info-header text-center'>Any additional information?</Header>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Checkbox}
                format={Boolean}
                label='Belongings'
                name='belongings'
                type='checkbox'/>
            </Form.Group>
            {
              props.hasBelongingsChecked && (
                <Form.Group widths='equal'>
                  <Field
                    autoFocus
                    component={FormField}
                    control={Form.TextArea}
                    label='Belongings Information'
                    placeholder='Enter belongings information'/>
                </Form.Group>
              )}
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Checkbox}
                format={Boolean}
                label='Medication'
                name='medication'
                type='checkbox'/>
            </Form.Group>
            {
              props.hasMedicationChecked && (
                <>
                  <Form.Group widths='equal'>
                    <Field
                      autoFocus
                      component={FormField}
                      control={Input}
                      label='Medicine name'
                      placeholder='Enter medicine'/>
                    <Field
                      autoFocus
                      component={FormField}
                      control={Input}
                      label='Purpose'
                      placeholder='Enter purpose'/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Field
                      autoFocus
                      component={FormField}
                      control={Form.TextArea}
                      label='Instructions'
                      placeholder='Enter Instructions'/>
                  </Form.Group>
                </>
              )}
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Checkbox}
                format={Boolean}
                label='Feeding'
                name='feeding'
                type='checkbox'/>
            </Form.Group>
            {
              props.hasFeedingChecked && (
                <Form.Group widths='equal'>
                  <Field
                    autoFocus
                    component={FormField}
                    control={Form.TextArea}
                    label='Feeding Information'
                    placeholder='Enter feeding information'/>
                </Form.Group>
              )}
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Checkbox}
                format={Boolean}
                label='Veterenary bill to be reimbursed'
                name='veterenary_bill'
                type='checkbox'/>
            </Form.Group>
            {
              props.hasVeterenaryBillChecked && (
                <>
                  <Form.Group widths='equal'>
                    <Field
                      autoFocus
                      component={FormField}
                      control={Input}
                      label='Total charge added to bill'
                      placeholder='Enter charge'/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Field
                      autoFocus
                      component={FormField}
                      control={Form.TextArea}
                      label='Details'
                      placeholder='Enter details'/>
                  </Form.Group>
                </>
              )}
          </div>
        </Segment>
        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }

        <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field className='btnBack'>
            <Button
              basic
              className='w120'
              color='teal'
              content='Back'
              onClick={props.onPreviousStep}
              type='button'/>
          </Form.Field>
          <Form.Field>
            <Button
              className='w120'
              color='teal'
              content='Next'
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const clientDetail = clientDetailDuck.selectors.detail(state)
      const belongings = formValueSelector('reservation-form')(state, 'belongings')
      const medication = formValueSelector('reservation-form')(state, 'medication')
      const feeding = formValueSelector('reservation-form')(state, 'feeding')
      const veterenaryBill = formValueSelector('reservation-form')(state, 'veterenary_bill')
      const selectedPets = formValueSelector('reservation-form')(state, 'pet')

      return {
        clientDetail,
        initialValues           : clientDetail.item,
        clientPet               : clientPetDuck.selectors.list(state),
        checkIn                 : formValueSelector('reservation-form')(state, 'check_in'),
        checkOut                : formValueSelector('reservation-form')(state, 'check_out'),
        selectedPets            : selectedPets,
        hasBelongingsChecked    : Boolean(belongings),
        hasMedicationChecked    : Boolean(medication),
        hasFeedingChecked       : Boolean(feeding),
        hasVeterenaryBillChecked: Boolean(veterenaryBill)
      }
    },
    {
      getClientPets: clientPetDuck.creators.get,
      resetItem    : clientDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form                    : 'reservation-form',
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(ClientFormWizardSecond)
