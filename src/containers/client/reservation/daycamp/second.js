import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import { Button, Form, Header, Segment, Select, Icon, Dropdown, Grid, Input, Checkbox } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import yardTypesDuck from '@reducers/pet/pet-yard-type'
import clientPetDuck from '@reducers/client/pet'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import trainingMethodDetailDuck from '@reducers/training-method/detail'

import { daycampFormId } from './first'
import AlertModal from './../alert-modal'

function YardDetail({ yard_type, type, selectedPets, clientPet, yardTypesOptions, fields, meta: { error, submitFailed } }) {
  if(fields.length != selectedPets.length)
    for (let i = 0;i < selectedPets.length;i++) {
      if(i == 0)
        fields.removeAll()
      if(yard_type != undefined)
        fields.push({ petId: selectedPets[i], yard: Number(yard_type), type: type })
      else
        fields.push({ petId: selectedPets[i] })
    }

  return (
    <>
      <Segment >
        {
          fields.map((item, index) => (

            <div className='div-kannel-selection' key={index}>
              <Header as='h3' className='text-center'>What is {clientPet.items.find(_pet => _pet.id == fields.get(index).petId).name} &apos;s information?</Header>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Yard'
                  name={`${item}.yard`}
                  options={yardTypesOptions}
                  placeholder='Select Type'
                  required
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Input}
                  label='Type'
                  name={`${item}.type`}
                  placeholder='Enter Yard Type'
                  required
                  selectOnBlur={false}/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  label='Lunch'
                  name={`${item}.lunch`}
                  type='checkbox'/>
                <Field
                  component={FormField}
                  control={Input}
                  name={`${item}.petId`}
                  type='hidden'/>
              </Form.Group>
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
      </Segment>
    </>
  )
}

function AddOnsItem({ item, petDetail, index }) {
  return (
    <div className='div-kannel-selection'>
      <Header as='h3' className='section-info-header'>What Frequency will be for {petDetail.name}</Header>
      <Grid>
        <Grid.Column computer={11} mobile={16} tablet={8}>
          <Field
            component={FormField}
            control={Select}
            key={item.id}
            label='Frequency'
            name={`${item.id}.Frequency`}
            options={[
              { key: 1, value: 1, text: 'Test1' },
              { key: 2, value: 2, text: 'Test2' }
            ]}
            placeholder='Select frequency'
            selectOnBlur={false}/>
        </Grid.Column>
        <Grid.Column computer={5} mobile={16} tablet={8}>
          <Field
            component={FormField}
            control={Input}
            label='Price'
            name={`${item}.subVariation[${index}].price`}
            required
            type='number'/>
        </Grid.Column>
      </Grid>
    </div>
  )
}

const DaycampFormWizardSecond = props => {
  const {
    yardTypes,
    clientPet,
    services,
    serviceAttribute,
    hasPriceChange,
    petReservationDetail,
    yard_type,
    type,
    totalPrice = 0,
    error, handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    props.getYardTypes()
    props.getClientPets()
  }, [])

  const yardTypesOptions = yardTypes.items.map(_yardTypes =>
    ({ key: _yardTypes.id, value: _yardTypes.id, text: `${_yardTypes.name}` }))

  function AddOnsList({ fields, meta: { error, submitFailed } }) {
    const groomingServiceId = services.items && services.items.find(_ => _.type === 'D')
    const subServices = services.items && services.items.filter(_ => _.parent_service === (groomingServiceId && groomingServiceId.id))

    petReservationDetail.item.addons && petReservationDetail.mode === 'CREATE' && subServiceUpdate(petReservationDetail.item.calculatedAddons)

    function subServiceUpdate(value) {    // addon price update function
      petReservationDetail.item.addons && props.setReserveItem({ ...petReservationDetail.item },'UPDATE')
      fields.removeAll()
      for (let item of value)
        fields.push({ subVariation: [ { price: item.price, id: item.service_variation, petId: item.petId } ],
          name        : item.name,  addOn_id    : item.addOn_id })
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

              petSubServiceVariation.push({ price: subVariation.price, id: subVariation.id, petId: pet })
            }
            else {
              props.setItem(null, 'READ')
            }
          }
        }

        fields.push({ name: subService.name, subVariation: petSubServiceVariation, addOn_id: item })
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
                {props.selectedPets && props.selectedPets.map((petId,index)=> (
                  <AddOnsItem
                    index={index}
                    item={item}
                    key={index}
                    petDetail={clientPet.items.find(_pet => _pet.id === petId)}/>
                ))}
              </Segment>

            </div>
          ))
        }
        {
          hasPriceChange && hasPriceChange.length > 0 && (
            <div className='div-addon-summary'>
              <b>${totalPrice}</b>
            </div>
          )
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
        <>
          <FieldArray
            clientPet={clientPet}
            component={YardDetail}
            name='yardDetail'
            props={props}
            selectedPets={props.selectedPets}
            title='Yard Detail'
            type={type}
            yard_type={yard_type}
            yardTypesOptions={yardTypesOptions}/>
        </>

        <Segment>

          <FieldArray
            component={AddOnsList}
            name='daycamp_reservation_list'
            title='DayCamp Reservation List'/>
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
      <AlertModal/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const yard_type = petReservationDetail && petReservationDetail.item.yard_type
      const type = petReservationDetail && petReservationDetail.item.type
      const selectedLocation = formValueSelector(daycampFormId)(state, 'location')
      const selectedPets = formValueSelector(daycampFormId)(state, 'pet')
      const services = serviceDuck.selectors.list(state)
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)

      const hasPriceChange = formValueSelector(daycampFormId)(state, 'daycamp_reservation_list')
      const priceChange = hasPriceChange && hasPriceChange.map(_ => _.subVariation)
      const totalPrice = priceChange && priceChange.filter((item) => item != undefined).map((item)=>
        item.map(_ => _.price).reduce((price1, price2) => Number(price1) + Number(price2), 0)).reduce((price1, price2) =>
        Number(price1) + Number(price2), 0)

      return {
        services,
        totalPrice,
        hasPriceChange,
        serviceAttribute,
        petReservationDetail,
        yard_type,
        type,
        initialValues   : { ...petReservationDetail.item },
        clientPet       : clientPetDuck.selectors.list(state),
        selectedPets    : selectedPets,
        selectedLocation: selectedLocation,
        yardTypes       : yardTypesDuck.selectors.list(state)
      }
    },
    {
      getClientPets : clientPetDuck.creators.get,
      getYardTypes  : yardTypesDuck.creators.get,
      resetItem     : petReservationDetailDuck.creators.resetItem,
      setItem       : trainingMethodDetailDuck.creators.setItem,
      setReserveItem: petReservationDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : daycampFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(DaycampFormWizardSecond)
