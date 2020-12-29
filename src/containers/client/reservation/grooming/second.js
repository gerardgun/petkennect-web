import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import { Button, Form, Header, Grid, Segment, Input, Icon, Dropdown } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import clientPetDuck from '@reducers/client/pet'

import AlertModal from './alert-modal'
import { groomingFormId } from './first'

// const additionalCharge = [
//   { key: 1, value: 'Test1', text: 'Test1' },
//   { key: 2, value: 'Test2', text: 'Test2' }
// ]

// function AdditionalChargeList({ fields, meta: { error, submitFailed } }) {
//   const _handleAddOnChange = (value)=>{
//     fields.removeAll()
//     // eslint-disable-next-line no-unused-vars
//     value.map((item, index) => (
//       fields.push(item)
//     ))
//   }

//   return (
//     <>
//       <div  className='div-additional-charge'>
//         <Header as='h3' className='section-info-header'>Any additional charge?</Header>
//         <Field
//           closeOnChange
//           component={FormField}
//           control={Dropdown}
//           fluid
//           label='Search charge'
//           multiple
//           name='additional-charge'
//           onChange={_handleAddOnChange}
//           options={additionalCharge}
//           placeholder='Search addon'
//           required
//           search
//           selectOnBlur={false}
//           selection/>
//       </div>
//       {
//         fields.map((item, index) => (

//           <div  key={index} >
//             <div className='div-additional-charge-summary mt16'>
//               <span>{fields.get(index)}</span>
//               <span className='charge-amount'><b>$25</b></span>
//             </div>
//           </div>
//         ))
//       }

//       {
//         submitFailed && error && (
//           <Form.Group widths='equal'>
//             <Form.Field>
//               <FormError message={error}/>
//             </Form.Field>
//           </Form.Group>
//         )
//       }
//     </>
//   )
// }

const GroomingFormWizardSecond = props => {
  const {
    clientPet,
    services,
    serviceAttribute,
    totalPrice = 0,
    error, handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    props.getClientPets()
    props.getServices()
    props.getServiceAttributes()
  }, [])

  function GroomingServiceList({ fields, meta: { error, submitFailed } }) {
    const selectedPetDetail = clientPet.items.filter(_pet => _pet.id === props.selectedPet)

    const location = props.selectedLocation
    const petSize = clientPet.items.find(pet => pet.id === props.selectedPet).size

    const groomingServiceId = services.items && services.items.find(_ => _.type === 'G')
    const subServices = services.items && services.items.filter(_ => _.parent_service === (groomingServiceId && groomingServiceId.id))

    const _handleServiceOnChange = (value)=>{
      fields.removeAll()

      const locationId = serviceAttribute.items && serviceAttribute.items.find(_location => _location.type === 'L').values.find(_location => _location.value == location).id
      const petSizeId = serviceAttribute.items && serviceAttribute.items.find(_petSize => _petSize.type === 'S').values.find(_petSize => _petSize.value == petSize).id

      for (let item of value) {
        const subService = subServices.find(_ => _.id === item)
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
          fields.push({ price: subVariation.price, name: subService.name, id: subVariation.id })
        }

        else {
          props.setItem(null, 'READ')
        }
      }
    }

    return (
      <>
        <div  className='div-additional-charge'>
          <Header as='h3' className='section-info-header'>What we do offer to {selectedPetDetail.length > 0 && selectedPetDetail[0].name}?</Header>
          <Field
            closeOnChange
            component={FormField}
            control={Dropdown}
            fluid
            label='Search detail'
            multiple
            name='grooming-offer'
            onChange={_handleServiceOnChange}
            options={subServices.map(_subService =>
              ({ key: _subService.id, value: _subService.id, text: `${_subService.name}` }))}
            placeholder='Search detail'
            search
            selection
            selectOnBlur={false}/>
        </div>
        {
          fields.map((item, index) => (

            <div key={index} >

              <Segment className='mt16' style={{ padding: '2rem',margin: 0 }}>
                <Grid>
                  <Grid.Column computer={5} mobile={16} tablet={8}>
                    <p
                      className='subService-margin'
                      key={index}>{fields.get(index).name}</p>
                  </Grid.Column >
                  <Grid.Column computer={2} mobile={16} tablet={8}>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Price'
                      name={`${item}.price`}
                      required
                      type='number'/>
                  </Grid.Column >
                  <Grid.Column computer={2} mobile={16} tablet={8}>
                    <Field
                      component={FormField}
                      control={Input}
                      name={`${item}.id`}
                      type='hidden'/>
                  </Grid.Column >
                </Grid>
              </Segment>

            </div>
          ))
        }
        <div className='div-additional-charge-summary'>
          <span className='charge-amount'><b>${totalPrice}</b></span>
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
      <Form className='grooming-second-step-form' onReset={reset} onSubmit={handleSubmit}>

        <Segment>

          <FieldArray
            component={GroomingServiceList}
            name='grooming_service_list'
            title='Grooming Service List'/>

          {/* <FieldArray
            component={AdditionalChargeList}
            name='grooming-additional-charge-list'
            title='Grooming Additional Charge List'/> */}

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
      const selectedPet = formValueSelector(groomingFormId)(state, 'pet')
      const selectedLocation = formValueSelector(groomingFormId)(state, 'location')
      const services = serviceDuck.selectors.list(state)
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)

      const hasPriceChange = formValueSelector(groomingFormId)(state, 'grooming_service_list')
      const subVariationPrice = hasPriceChange && hasPriceChange.map(_ => _.price)
      const totalPrice =  subVariationPrice && subVariationPrice.reduce((price1, price2) => Number(price1) + Number(price2), 0)

      return {
        petReservationDetail,
        services,
        serviceAttribute,
        totalPrice,
        initialValues   : petReservationDetail.item,
        clientPet       : clientPetDuck.selectors.list(state),
        selectedPet     : selectedPet,
        selectedLocation: selectedLocation
      }
    },
    {
      getClientPets       : clientPetDuck.creators.get,
      getServices         : serviceDuck.creators.get,
      getServiceAttributes: serviceAttributeDuck.creators.get,
      setItem             : petReservationDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : groomingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(GroomingFormWizardSecond)
