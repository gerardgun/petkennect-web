import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import { Button, Form, Header, Segment, Checkbox, Input, Icon, Dropdown, Grid } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import clientPetDuck from '@reducers/client/pet'
import petKennelDuck from '@reducers/pet/pet-kennel'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'

import PetItem from './PetItem'
import AlertModal from './../alert-modal'
import { boardingFormId } from './first'

// function AddOnsItem({ item, petDetail, index }) {
//   return (
//     <div className='div-kannel-selection'>
//       <Header as='h3' className='section-info-header'>What Frequency will be for {petDetail.name}</Header>
//       <Grid>
//         <Grid.Column computer={11} mobile={16} tablet={8}>
//           <Field
//             component={FormField}
//             control={Select}
//             key={item.id}
//             label='Frequency'
//             name={`${item.id}.Frequency`}
//             options={[
//               { key: 1, value: 1, text: 'Test1' },
//               { key: 2, value: 2, text: 'Test2' }
//             ]}
//             placeholder='Select frequency'
//             selectOnBlur={false}/>
//         </Grid.Column>
//         <Grid.Column computer={5} mobile={16} tablet={8}>
//           <Field
//             component={FormField}
//             control={Input}
//             label='Price'
//             name={`${item}.subVariation[${index}].price`}
//             required
//             type='number'/>
//         </Grid.Column>
//       </Grid>

//     </div>
//   )
// }

const BoardingFormWizardSecond = props => {
  const {
    petReservationDetail,
    clientPet,
    petKennel,
    state,
    services,
    serviceAttribute,
    error, handleSubmit, reset // redux-form
  } = props

  const [ overridePopupOpen, setOverridePopupOpen ] = useState(false)

  const _handleOkBtnClick = () =>{
    setOverridePopupOpen(false)
  }

  function AddOnsList({ fields, meta: { error, submitFailed } }) {
    const groomingServiceId = services.items && services.items.find(_ => _.type === 'B')
    const subServices = services.items && services.items.filter(_ => _.parent_service === (groomingServiceId && groomingServiceId.id))

    petReservationDetail.item.addons && petReservationDetail.mode === 'CREATE' && subServiceUpdate(petReservationDetail.item.calculatedAddons)

    function subServiceUpdate(value) {    // addon price update function
      let frequency = 1
      petReservationDetail.item.addons && props.setReserveItem({ ...petReservationDetail.item },'UPDATE')
      fields.removeAll()
      for (let item of value)
        fields.push({ subVariation: [ { price: item.price, id: item.service_variation, petId: item.petId, frequency: frequency } ],
          name        : item.name,  addOn_id    : item.addOn_id })
    }

    const _handleFrequencyChange = (index, _index) => {
      const price = formValueSelector(boardingFormId)(state, 'boarding_reservation_list[' + index + '].subVariation[' + _index + '].price')
      const frequency = formValueSelector(boardingFormId)(state, 'boarding_reservation_list[' + index + '].subVariation[' + _index + '].frequency')
      const totalCost = Number(price) * Number(frequency)
      let inputTotalCost = document.getElementsByName('boarding_reservation_list[' + index + '].subVariation[' + _index + '].totalCost')
      if(inputTotalCost.length > 0)
        setTimeout(() =>
          inputTotalCost[0].value = totalCost
        , 500)
    }

    const _handleAddOnChange = (value)=>{
      fields.removeAll()

      let oldSelectedAddOn = props.hasPriceChange

      for (let item of value) {
        let petSubServiceVariation = []
        const subService = subServices.find(_ => _.id === item)

        const location = props.selectedLocation
        const pets = props.selectedPets

        let alreadyExistsAddon = oldSelectedAddOn && oldSelectedAddOn.find(_ => _.addOn_id == item)

        for (let pet of pets) {
          let frequency = 1

          let alreadyExistAddonForPet = alreadyExistsAddon &&  alreadyExistsAddon.subVariation.find(_ => _.petId == pet)

          if(alreadyExistAddonForPet) {
            petSubServiceVariation.push({ ...alreadyExistAddonForPet })
          }
          else
          {
            const petSize = clientPet.items.find(_ => _.id === pet).size
            const petSizeId = serviceAttribute.items && serviceAttribute.items.find(_petSize => _petSize.type === 'S').values.find(_petSize => _petSize.value == petSize).id
            const locationId = serviceAttribute.items && serviceAttribute.items.find(_location => _location.type === 'L').values.find(_location => _location.value == location).id

            const variation = subService.variations

            let variationId
            for (let item of variation) {
              let locationExist = item.attributes.find(_id => _id.service_attribute_value_id == locationId)
              let petSizeExist = item.attributes.find(_id => _id.service_attribute_value_id == petSizeId)

              if(locationExist != null && petSizeExist != null)
              {
                variationId = locationExist.service_variation_id
                break
              }
            }

            if(variationId != null) {
              const subVariation = variation.find(_ => _.id === variationId)

              petSubServiceVariation.push({ price    : subVariation.price, id       : subVariation.id, petId    : pet,
                frequency: frequency  })
            }
            else {
              setOverridePopupOpen(true)
            }
          }
        }
        if(petSubServiceVariation.length > 0)
          fields.push({ name: subService.name, subVariation: petSubServiceVariation, addOn_id: item  })
      }
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
            options={subServices.map(_subService =>
              ({ key: _subService.id, value: _subService.id, text: `${_subService.name}` }))}
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
                  <Header as='h3' className='section-info-header'>{fields.get(index).name}</Header>
                </Form.Group>
                {props.selectedPets && props.selectedPets.map((petId, _index)=> {
                  let petDetail = clientPet.items.find(_pet => _pet.id === petId)

                  return (
                    <div className='div-kannel-selection' key={index + '_' + _index}>
                      <Header as='h3' className='section-info-header'>What Frequency will be for {petDetail.name}</Header>
                      <Grid>
                        <Grid.Column computer={5} mobile={16} tablet={8}>
                          <Field
                            component={FormField}
                            control={Input}
                            label='Frequency'
                            name={`${item}.subVariation[${_index}].frequency`}
                            onChange={_handleFrequencyChange(index, _index)}
                            type='number'/>
                        </Grid.Column> <p className='total-cost addons-grid'>X</p>
                        <Grid.Column computer={5} mobile={16} tablet={8}>
                          <Field
                            component={FormField}
                            control={Input}
                            label='Price'
                            min={0}
                            name={`${item}.subVariation[${_index}].price`}
                            onChange={_handleFrequencyChange(index, _index)}
                            required
                            type='number'/>
                        </Grid.Column> <p className='total-cost addons-grid'>=</p>
                        <Grid.Column computer={5} mobile={16} tablet={8}>
                          <label>Total Cost</label>
                          <input className='mt_input total-cost-input' disabled name={`${item}.subVariation[${_index}].totalCost`}/>
                        </Grid.Column>
                      </Grid>

                    </div>
                  )
                })}
              </Segment>

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
      <AlertModal isOpened={overridePopupOpen} onReply={_handleOkBtnClick}/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const selectedLocation = formValueSelector(boardingFormId)(state, 'location')
      const services = serviceDuck.selectors.list(state)
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
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
      const hasPriceChange = formValueSelector(boardingFormId)(state, 'boarding_reservation_list')

      return {
        hasPriceChange,
        petReservationDetail    : petReservationDetail,
        initialValues           : { ...petReservationDetail.item },
        petKennel               : petKennelDuck.selectors.list(state),
        clientPet               : clientPetDuck.selectors.list(state),
        checkIn   ,
        state,
        checkOut,
        services,
        serviceAttribute,
        selectedPets            : selectedPets,
        selectedLocation        : selectedLocation,
        hasBelongingsChecked    : Boolean(belongings),
        hasMedicationChecked    : Boolean(medication),
        hasFeedingChecked       : Boolean(feeding),
        hasVeterenaryBillChecked: Boolean(veterenaryBill)
      }
    },
    {
      getPetKennels : petKennelDuck.creators.get,
      setReserveItem: petReservationDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : boardingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(BoardingFormWizardSecond)
