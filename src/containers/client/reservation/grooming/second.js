import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import { Button, Form, Header, Grid, Segment, Select, Input, Icon, Dropdown } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import clientPetDuck from '@reducers/client/pet'

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
    error, handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    props.getClientPets()
  }, [])

  const groomingServiceOption = [
    { key: 1, value: 'Test1', text: 'Test1' },
    { key: 2, value: 'Test2', text: 'Test2' }
  ]

  function GroomingServiceList({ fields, meta: { error, submitFailed } }) {
    const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)
    const selectedPetDetail = clientPet.items.filter(_pet => _pet.id === props.selectedPet)
    const _handleServiceOnChange = (value)=>{
      fields.removeAll()
      // eslint-disable-next-line no-unused-vars
      value.map((item, index) => (
        fields.push(item)
      ))
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
            options={groomingServiceOption}
            placeholder='Search detail'
            required
            search
            selection
            selectOnBlur={false}/>
        </div>
        {
          fields.map((item, index) => (

            <div  key={index} >

              <Segment className='mt16' style={{ padding: '2rem',margin: 0 }}>
                <Button
                  basic
                  className='btn-trash-charge' color='red'
                  data-index={index}
                  icon
                  onClick={_handleRemoveBtnClick} size='small' type='button'>
                  <Icon name='trash alternate outline'/>
                </Button>
                <Grid>
                  <Grid.Column computer={5} mobile={16} tablet={8}>
                    <Field
                      component={FormField}
                      control={Select}
                      key={index}
                      label={fields.get(index)}
                      name={`${index}.bath-brush`}
                      options={[
                        { key: 1, value: 1, text: 'Test1' },
                        { key: 2, value: 2, text: 'Test2' }
                      ]}
                      placeholder='Select One'
                      selectOnBlur={false}/>
                  </Grid.Column >
                  <Grid.Column computer={2} mobile={16} tablet={8}>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Price'
                      name={`${index}.price`}
                      required
                      type='number'/>
                  </Grid.Column >
                </Grid>
              </Segment>

              <div className='div-additional-charge-summary'>
                <span className='charge-amount'><b>$25</b></span>
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
            name='grooming-service-list'
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
              onClick={props.onNextStep}
              type='button'/>
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
      const selectedPet = formValueSelector(groomingFormId)(state, 'pet')

      return {
        petReservationDetail,
        initialValues: petReservationDetail.item,
        clientPet    : clientPetDuck.selectors.list(state),
        selectedPet  : selectedPet
      }
    },
    {
      getClientPets: clientPetDuck.creators.get
    }
  ),
  reduxForm({
    form                    : groomingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(GroomingFormWizardSecond)
