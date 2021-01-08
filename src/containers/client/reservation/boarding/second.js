import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import { Button, Form, Header, Segment, Checkbox, Select, Input, Icon, Dropdown } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import clientPetDuck from '@reducers/client/pet'
import petKennelDuck from '@reducers/pet/pet-kennel'
import PetItem from './PetItem'

import { boardingFormId } from './first'

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

const BoardingFormWizardSecond = props => {
  const {
    clientPet,
    petKennel,
    error, handleSubmit, reset // redux-form
  } = props

  const addOns = [
    { key: 1, value: 'Test1', text: 'Test1' },
    { key: 2, value: 'Test2', text: 'Test2' }
  ]

  function AddOnsList({ fields, meta: { error, submitFailed } }) {
    const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

    const _handleAddOnChange = (value)=>{
      fields.removeAll()
      // eslint-disable-next-line no-unused-vars
      value.map((item, index) => (
        fields.push(item)
      ))
    }

    return (
      <>
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
            onChange={_handleAddOnChange}
            options={addOns}
            placeholder='Search addon'
            required
            search
            selection
            selectOnBlur={false}/>
          <Button
            basic
            className='w100'
            color='teal'
            content='Add Grooming'
            type='button'/>
        </div>
        {
          fields.map((item, index) => (

            <div  key={index} >

              <Segment className='mt16' style={{ padding: '2rem',margin: 0 }}>
                <Form.Group widths='equal'>
                  <Header as='h3' className='section-info-header'>{fields.get(index)}</Header>
                  <button
                    className='ui red basic icon button delete-addons'  data-index={index} onClick={_handleRemoveBtnClick}
                    type='button'>
                    <i aria-hidden='true' className='trash alternate outline icon' ></i>
                  </button>
                </Form.Group>
                {props.selectedPets && props.selectedPets.map((petId)=> (
                  <AddOnsItem
                    item={clientPet.items.filter(_pet => _pet.id === petId)}
                    key={index}/>
                ))}
              </Segment>

              <div className='div-addon-summary'>
                <b>$25</b>
              </div>
            </div>
          ))
        }

        {
          submitFailed && error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }
      </>
    )
  }

  useEffect(() => {
    props.getPetKennels()
  }, [])

  const petKennelOptions = petKennel.items.map(_petKennel =>
    ({ key: _petKennel.id, value: _petKennel.id, text: `${_petKennel.size}` }))

  return (
    <>
      <div className='div-progress-bar mv32'>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Service Information</span>
        </div>
        <div className='div-bar-line active'>
        </div>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Pet Information</span>
        </div>
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-content'>
          <Icon name='check circle'/>
          <span>Summary</span>
        </div>
      </div>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form className='section-info-item-form' onReset={reset} onSubmit={handleSubmit}>
        {props.selectedPets && props.selectedPets.map((petId)=> (
          <PetItem
            checkIn={props.checkIn} checkOut={props.checkOut} item={[].concat(clientPet.items.find(_pet => _pet.id === petId))}
            key={petId}
            petKennelOptions={petKennelOptions}/>
        ))}

        <Segment>

          <FieldArray
            component={AddOnsList}
            name='boarding_reservation_list'
            title='Boarding Reservation List'/>

          <div  className='div-kannel-selection div-additional-information'>
            <Header as='h3' className='section-info-header'>Any additional information?</Header>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Checkbox}
                format={Boolean}
                label='Belongings'
                name='chk_belongings'
                type='checkbox'/>
            </Form.Group>
            {
              props.hasBelongingsChecked && (
                <Form.Group widths='equal'>
                  <Field
                    component={FormField}
                    control={Form.TextArea}
                    label='Belongings Information'
                    name='belongings'
                    placeholder='Enter belongings information'/>
                </Form.Group>
              )}
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Checkbox}
                format={Boolean}
                label='Medication'
                name='chk_medication'
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
                      name='medication_name'
                      placeholder='Enter medicine'/>
                    <Field
                      autoFocus
                      component={FormField}
                      control={Input}
                      label='Purpose'
                      name='medication_purpose'
                      placeholder='Enter purpose'/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Field
                      autoFocus
                      component={FormField}
                      control={Form.TextArea}
                      label='Instructions'
                      name='medication_instruction'
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
                name='chk_feeding'
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
                    name='feeding'
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
                      name='veterenary_bill_total_charge'
                      placeholder='Enter charge'/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Field
                      autoFocus
                      component={FormField}
                      control={Form.TextArea}
                      label='Details'
                      name='veterenary_bill_detail'
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
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const belongings = formValueSelector(boardingFormId)(state, 'chk_belongings')
      const medication = formValueSelector(boardingFormId)(state, 'chk_medication')
      const feeding = formValueSelector(boardingFormId)(state, 'chk_feeding')
      const veterenaryBill = formValueSelector(boardingFormId)(state, 'veterenary_bill')
      const selectedPets = formValueSelector(boardingFormId)(state, 'pet')
      let checkOut = formValueSelector(boardingFormId)(state, 'check_out')
      let checkIn = formValueSelector(boardingFormId)(state, 'check_in')
      const unitOfOccurrences = formValueSelector(boardingFormId)(state, 'until_no_of_occurrences')
      if(unitOfOccurrences && checkIn) {
        let checkInDate = new Date(checkIn)
        checkOut  = new Date(checkInDate.setDate((checkInDate.getDate() + ((7 * unitOfOccurrences) - 1))))
      }

      return {
        initialValues           : { ...petReservationDetail.item },
        petKennel               : petKennelDuck.selectors.list(state),
        clientPet               : clientPetDuck.selectors.list(state),
        checkIn   ,
        checkOut,
        selectedPets            : selectedPets,
        hasBelongingsChecked    : Boolean(belongings),
        hasMedicationChecked    : Boolean(medication),
        hasFeedingChecked       : Boolean(feeding),
        hasVeterenaryBillChecked: Boolean(veterenaryBill)
      }
    },
    {
      getPetKennels: petKennelDuck.creators.get
    }
  ),
  reduxForm({
    form                    : boardingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(BoardingFormWizardSecond)
