import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import { Button, Form, Header, Segment, Checkbox, Accordion, Grid, Icon, Input, Select, TextArea, Dropdown } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Table from '@components/Table'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import clientPetDuck from '@reducers/client/pet'
import petKennelDuck from '@reducers/pet/pet-kennel'
import serviceDuck from '@reducers/service'
import serviceAttributeDuck from '@reducers/service/service-attribute'
import boardingReservationAddonDuck from '@reducers/pet/reservation/boarding/add-on'
import employeeDuck from '@reducers/employee'
import groomingReservationAddonDuck from '@reducers/pet/reservation/grooming/add-on'

import PetItem from './PetItem'
import { boardingFormId } from './first'

const BoardingFormWizardSecond = props => {
  const {
    clientPet,
    petKennel,
    employee,
    sharedLodging,
    error, handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    props.getBoardingReservationAddons()
    props.getPetKennels()
    props.getGroomingReservationAddons()
  }, [])

  let _handleAddBtnClick

  const _handleAddTime = () => {
    _handleAddBtnClick()
  }

  const petKennelOptions = petKennel.items.map(_petKennel =>
    ({ key: _petKennel.id, value: _petKennel.id, text: `${_petKennel.size}` }))

  const [ activeIndex, setActiveIndex ] = useState(-1)
  const [ activeArray,setActiveArray ] = useState([])
  const [ groomingAddon,setGroomingAddon ] = useState([])

  const  _handleAddonServiceClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const  _handleSelectAddonClick = (e, titleProps) => {
    const { index } = titleProps
    if(activeArray.includes(index)) {
      let array = activeArray.filter(item=>item != index)
      setActiveArray(array)
    }
    else
    {setActiveArray([ ...activeArray, index ])}
  }

  const _handleGroomingService = (e, titleProps) => {
    const { index } = titleProps
    if(groomingAddon.includes(index)) {
      let array = groomingAddon.filter(item=>item != index)
      setGroomingAddon(array)
    }
    else
    {setGroomingAddon([ ...groomingAddon, index ])}
  }

  let addons = [ 'Food Bag', 'Medication', 'Feeding' ]

  const AddTime = ({ fields, meta: { error, submitFailed } }) => {
    _handleAddBtnClick = () => fields.push({ ...contactDetailInitialState })
    const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

    const contactDetailInitialState = {
      time: ''
    }

    return (
      <>
        {
          fields.map((item, index) => (
            <Form.Group key={index}>
              <Field
                component={FormField}
                control={Input}
                name={`${item}.time`}
                type='time'/>
              <Form.Button
                basic className='align-button mt4'
                color='red' data-index={index}
                icon='trash alternate outline'
                onClick={_handleRemoveBtnClick}
                type='button'/>
            </Form.Group>
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
          <span>Reservation Information</span>
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
        <Segment>
          <Header as='h3' className='section-info-header'>Lodging Stay and Activity Type</Header>

          {
            sharedLodging && sharedLodging === true ? (<PetItem
              checkIn={props.checkIn} checkOut={props.checkOut} clientPet={clientPet}
              item={props.selectedPets && props.selectedPets.map((petId) => (petId))}
              lodging={sharedLodging} petKennelOptions={petKennelOptions}/>)
              : (
                props.selectedPets && props.selectedPets.map((petId)=> (
                  <PetItem
                    checkIn={props.checkIn} checkOut={props.checkOut} item={clientPet.items.find(_pet => _pet.id === petId)}
                    key={petId} lodging={sharedLodging}
                    petKennelOptions={petKennelOptions}/>
                )
                )
              )
          }
        </Segment>
        <Segment>
          <Header as='h3' className='section-info-header'>Add-On Services</Header>
          <Accordion className='mv12'>
            <Accordion.Title
              active={activeIndex === 0}
              className='heading-color'
              index={0}
              onClick={_handleAddonServiceClick}
              value='Add'>
              <Header as='h3' className='mb0 heading-color ml8'>
                Add Additional Services
                <Header className='heading-color' floated='right'><Icon name='dropdown'/></Header>
              </Header>

            </Accordion.Title>

            <Accordion.Content active={activeIndex === 0} className='mt12'>
              <div>
                <Grid>
                  {
                    addons && addons.map((addon, index) => (
                      <>
                        <Grid.Column className='padding-column' key={index} width={16}>
                          <Accordion className='margin-accordian'>
                            <Accordion.Title
                              active={activeArray.includes(index)}
                              className='heading-color'
                              index={index}
                              onClick={_handleSelectAddonClick}>
                              <Header as='h5' className='mb0 heading-color ml8'>
                                {addon}
                                <Header className='heading-color' floated='right'><Icon name='dropdown'/></Header>
                              </Header>
                            </Accordion.Title>

                            <Accordion.Content active={activeArray.includes(index)}>
                              <Segment>
                                <Grid>
                                  <Grid.Column width={16}>
                                    <Header as='h5' className='mb0'>
                                      Description of Service :
                                    </Header>
                                  </Grid.Column>
                                  <span>{addon}</span>
                                  <Grid.Column width={16}>
                                    <b>Price :</b> <span> $2.00</span>
                                  </Grid.Column>
                                  <Grid.Column width={16}>
                                    <span> Applies to Pets :</span>
                                  </Grid.Column>
                                  <Grid.Column width={7}>
                                    {
                                      props.selectedPets && props.selectedPets.map((petId) => (
                                        <Form.Group className='mh4' key={petId}>
                                          <Field
                                            className='checkbox-label mh4'
                                            component={FormField} control={Checkbox} id={petId}
                                            name={clientPet.items.find(_pet => _pet.id === petId).name}
                                            type='checkbox'/>
                                          <label htmlFor={petId}>
                                            {clientPet.items.find(_pet => _pet.id === petId).name}</label>
                                        </Form.Group>

                                      ))
                                    }
                                    {
                                      props.selectedPets && props.selectedPets.length > 1 && (
                                        <Form.Group className='mh4'>
                                          <Field
                                            className='checkbox-label mh4'
                                            component={FormField} control={Checkbox} id='all'
                                            name='all'
                                            type='checkbox'/>
                                          <label htmlFor='all'> All</label>
                                        </Form.Group>
                                      )
                                    }
                                  </Grid.Column>
                                  <Grid.Column width={5}>
                                    <Form.Group className='align-center ml16'>
                                      <label className='w33'>Quantity</label>
                                      <Field
                                        component={FormField}
                                        control={Input}
                                        min={0}
                                        name='quantity'
                                        type='number'/>
                                    </Form.Group>
                                    <Form.Group className='align-center ml16'>
                                      <label className='w33'>Total Price</label>
                                      <Field
                                        component={FormField}
                                        control={Input}
                                        min={0}
                                        name='Total Price'
                                        type='number'/>
                                    </Form.Group>
                                  </Grid.Column>

                                  <Grid.Column width={16}>
                                    <Header as='h4'>Frequency</Header>
                                    <Grid>
                                      <Grid.Column className='ml16' width={6}>
                                        <Form.Group className='div_align_center mh0'>
                                          <Field
                                            component='input'
                                            name='frequency'
                                            // onChange={_handleFrequencyClick}
                                            type='radio' value='once'/>
                                          <label className='mh4'> Once(Specific Date)</label>
                                          <Form.Field
                                            className='ml8 mv8 w_input_3'
                                            control={Input}
                                            name='once_date'
                                            // onChange={_handleCustomWeekChange}
                                            // readOnly={frequency !== 'every_custom_week'}
                                            type='date'/>
                                        </Form.Group>
                                        <Form.Group className='div_align_center mh0'>
                                          <Field
                                            component='input' name='frequency'
                                            // onChange={_handleFrequencyClick}
                                            type='radio' value='every_other_day'/>
                                          <label className='mh4'> Every Other Day (Starting First Day)</label>
                                        </Form.Group>
                                        <Form.Group className='div_align_center mh0'>
                                          <Field
                                            component='input'
                                            name='frequency'
                                            // onChange={_handleFrequencyClick}
                                            type='radio' value='every_day'/>
                                          <label className='mh4'> Every Day</label>
                                        </Form.Group>
                                        <Form.Group className='div_align_center mh0'>
                                          <Field
                                            component='input' name='frequency'
                                            // onChange={_handleFrequencyClick}
                                            type='radio' value='every_day_except_first'/>
                                          <label className='mh4'> Every Day Except First Day</label>
                                        </Form.Group>
                                        <Form.Group  className='div_align_center mh0'>
                                          <Field
                                            className='pt0'
                                            component='input'
                                            name='frequency'
                                            // onChange={_handleFrequencyClick}
                                            type='radio' value='every_day_except_last'/>
                                          <label className='mh4'> Every Day Except Last Day</label>
                                        </Form.Group>
                                      </Grid.Column>

                                      <Grid.Column className='mt20' width={3}>
                                        <Header as='h4'>Times :</Header>
                                        <Form.Group>
                                          <Form.Field
                                            className='w_input_3'
                                            control={Input}
                                            name='custom_week_number'
                                            // onChange={_handleCustomWeekChange}
                                            // readOnly={frequency !== 'every_custom_week'}
                                            type='time'/>
                                          <Form.Field>
                                            <Form.Button
                                              className='align-button'
                                              color='teal'
                                              icon='plus'
                                              onClick={_handleAddTime}
                                              type='button'/>
                                          </Form.Field>
                                        </Form.Group>
                                        <FieldArray
                                          component={AddTime}
                                          name='add_time'
                                          title='Add Time'/>
                                      </Grid.Column>

                                      <Grid.Column className='mt20 ml32' width={3}>
                                        <Header as='h4'>Feedings :</Header>
                                        <Form.Group>
                                          <Field
                                            className='checkbox-label'
                                            component={FormField} control={Checkbox} id='breakfast'
                                            name='breakfast'
                                            type='checkbox'/>
                                          <label htmlFor='breakfast'> Breakfast </label>
                                        </Form.Group>
                                        <Form.Group>
                                          <Field
                                            className='checkbox-label'
                                            component={FormField} control={Checkbox} id='lunch'
                                            name='lunch'
                                            type='checkbox'/>
                                          <label htmlFor='lunch'> Lunch</label>
                                        </Form.Group>
                                        <Form.Group>
                                          <Field
                                            className='checkbox-label'
                                            component={FormField} control={Checkbox} id='dinner'
                                            name='dinner'
                                            type='checkbox'/>
                                          <label htmlFor='dinner'> Dinner</label>
                                        </Form.Group>
                                        <Form.Group>
                                          <Field
                                            className='checkbox-label'
                                            component={FormField} control={Checkbox} id='other'
                                            name='other'
                                            type='checkbox'/>
                                          <label htmlFor='other'> Other</label>
                                        </Form.Group>
                                      </Grid.Column>
                                    </Grid>
                                  </Grid.Column>

                                  <Grid.Column width={16}>
                                    <Grid>
                                      <Grid.Column width={12}>
                                        <Field
                                          component={FormField}
                                          control={Form.TextArea}
                                          label='Notes'
                                          name='note'
                                          placeholder='Enter Notes'/>
                                      </Grid.Column>
                                      <Grid.Column className='addon-service-button' width={4}>
                                        <Form.Field>
                                          <Button
                                            basic
                                            className='w160'
                                            color='teal'
                                            // onClick={_handleAddNoteBtnClick}
                                            type='button'><Icon name='plus'/>Add Service
                                          </Button>
                                        </Form.Field>
                                      </Grid.Column>
                                    </Grid>
                                  </Grid.Column>
                                </Grid>

                              </Segment>
                            </Accordion.Content>
                          </Accordion>
                        </Grid.Column>
                      </>
                    ))
                  }

                  <Grid.Column className='padding-column' width={16}>
                    <Accordion className='margin-accordian'>
                      <Accordion.Title
                        active={activeArray.includes(3)}
                        className='heading-color'
                        index={3}
                        onClick={_handleSelectAddonClick}>
                        <Header as='h5' className='mb0 heading-color ml8'>
                          Generic Charges
                          <Header className='heading-color' floated='right'><Icon name='dropdown'/></Header>
                        </Header>
                      </Accordion.Title>
                      <Accordion.Content active={activeArray.includes(3)}>
                        <Segment>
                          <Grid>
                            <Grid.Column width={9}>
                              <Grid.Column>
                                <Header as='h5' className='mb0'>
                                Description of Service :
                                </Header>
                              </Grid.Column>
                              <Grid.Column className='padding-column'>
                                <span>Generic Charges</span>
                              </Grid.Column>

                              <Grid.Column className='mv4'>
                                <b>Price :</b> <span> $3.00</span>
                              </Grid.Column>
                              <Grid.Column className='mv24'>
                                <span> Applies to Pets :</span>
                                <Grid.Column className='mv28'>
                                  {
                                    props.selectedPets && props.selectedPets.map((petId) => (
                                      <Form.Group className='mh4' key={petId}>
                                        <Field
                                          className='checkbox-label mh4'
                                          component={FormField} control={Checkbox} id={petId}
                                          name={clientPet.items.find(_pet => _pet.id === petId).name}
                                          type='checkbox'/>
                                        <label htmlFor={petId}>
                                          {clientPet.items.find(_pet => _pet.id === petId).name}</label>
                                      </Form.Group>

                                    ))
                                  }
                                  {
                                    props.selectedPets && props.selectedPets.length > 1 && (
                                      <Form.Group className='mh4'>
                                        <Field
                                          className='checkbox-label mh4'
                                          component={FormField} control={Checkbox} id='all'
                                          name='all'
                                          type='checkbox'/>
                                        <label htmlFor='all'> All</label>
                                      </Form.Group>
                                    )
                                  }
                                </Grid.Column>
                              </Grid.Column>
                            </Grid.Column>
                            <Grid.Column className='addon-table' width={7}>
                              <Table duck={boardingReservationAddonDuck} striped/>
                            </Grid.Column>

                            <Grid.Column width={16}>
                              <Header as='h4'>Frequency</Header>
                              <Grid>
                                <Grid.Column className='ml16' width={6}>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input'
                                      name='frequency'
                                      // onChange={_handleFrequencyClick}
                                      type='radio' value='once'/>
                                    <label className='mh4'> Once(Specific Date)</label>
                                    <Form.Field
                                      className='ml8 mv8 w_input_3'
                                      control={Input}
                                      name='once_date'
                                      // onChange={_handleCustomWeekChange}
                                      type='date'/>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input' name='frequency'
                                      // onChange={_handleFrequencyClick}
                                      type='radio' value='every_other_day'/>
                                    <label className='mh4'> Every Other Day (Starting First Day)</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input'
                                      name='frequency'
                                      // onChange={_handleFrequencyClick}
                                      type='radio' value='every_day'/>
                                    <label className='mh4'> Every Day</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input' name='frequency'
                                      // onChange={_handleFrequencyClick}
                                      type='radio' value='every_day_except_first'/>
                                    <label className='mh4'> Every Day Except First Day</label>
                                  </Form.Group>
                                  <Form.Group  className='div_align_center mh0'>
                                    <Field
                                      className='pt0'
                                      component='input'
                                      name='frequency'
                                      // onChange={_handleFrequencyClick}
                                      type='radio' value='every_day_except_last'/>
                                    <label className='mh4'> Every Day Except Last Day</label>
                                  </Form.Group>
                                </Grid.Column>
                                <Grid.Column className='mt20' width={3}>
                                  <Header as='h4'>Times :</Header>
                                  <Form.Group>
                                    <Form.Field
                                      className='w_input_3'
                                      control={Input}
                                      name='time'
                                      type='time'/>
                                    <Form.Field>
                                      <Form.Button
                                        className='align-button'
                                        color='teal'
                                        icon='plus'
                                        onClick={_handleAddTime}
                                        type='button'/>
                                    </Form.Field>
                                  </Form.Group>
                                  <FieldArray
                                    component={AddTime}
                                    name='add_time'
                                    title='Add Time'/>
                                </Grid.Column>

                                <Grid.Column className='mt20 ml8' width={2}>
                                  <Header as='h4'>Duration :</Header>
                                  <Field
                                    component={FormField}
                                    control={Dropdown}
                                    fluid
                                    name='duration'
                                    options={[
                                      { key: 1, value: 5, text: '5 min' },
                                      { key: 2, value: 10, text: '10 min' },
                                      { key: 3, value: 15, text: '15 min' },
                                      { key: 4, value: 20, text: '20 min' },
                                      { key: 5, value: 25, text: '25 min' },
                                      { key: 6, value: 30, text: '30 min' },
                                      { key: 7, value: 40, text: '40 min' },
                                      { key: 8, value: 50, text: '50 min' }
                                    ]}
                                    placeholder='Duration'
                                    selectOnBlur={false}
                                    selection/>
                                </Grid.Column>
                              </Grid>
                            </Grid.Column>

                            <Grid.Column width={16}>
                              <Grid>
                                <Grid.Column width={12}>
                                  <Field
                                    component={FormField}
                                    control={Form.TextArea}
                                    label='Notes'
                                    name='note'
                                    placeholder='Enter Notes'/>
                                </Grid.Column>
                                <Grid.Column className='addon-service-button' width={4}>
                                  <Form.Field>
                                    <Button
                                      basic
                                      className='w160'
                                      color='teal'
                                      // onClick={_handleAddNoteBtnClick}
                                      type='button'><Icon name='plus'/>Add Service
                                    </Button>
                                  </Form.Field>
                                </Grid.Column>
                              </Grid>
                            </Grid.Column>
                          </Grid>

                        </Segment>
                      </Accordion.Content>
                    </Accordion>
                  </Grid.Column>
                </Grid>

              </div>
            </Accordion.Content>
          </Accordion>
        </Segment>
        <Segment >
          <Header as='h3' className='section-info-header'>Grooming Services</Header>
          {
            props.selectedPets && props.selectedPets.map((_item,_index) => {
              let petName = clientPet.items.find(item=>item.id === _item).name

              return (
                <>
                  <Accordion className='mv12'>
                    <Accordion.Title
                      active={groomingAddon.includes(_index)}
                      className='heading-color'
                      index={_index}
                      onClick={_handleGroomingService}>
                      <Header as='h4' className='mb0 heading-color ml8'>
                        Add Grooming Services for {petName}
                        <Header className='heading-color' floated='right'><Icon name='dropdown'/></Header>
                      </Header>
                    </Accordion.Title>
                    <Accordion.Content  active={groomingAddon.includes(_index)}>
                      <Segment>
                        <Header as='h4' className='mb0'>
                                Select Grooming Options for {petName}:
                        </Header>
                        <br/>
                        <Grid>
                          <Grid.Column computer={8}>
                            <Header as='h5' className='mb0'> Service options</Header>
                            <br/>
                            <br/>
                            <div className='addon-table'>
                              <Table duck={groomingReservationAddonDuck} striped/>
                            </div>
                            <p style={{ 'float': 'right' , 'margin-right': '53px' }}><b>Total Price  $120.00 </b></p>
                          </Grid.Column>

                          <Grid.Column computer={8}>
                            <Header as='h5' className='mb0'>When?</Header>
                            <br/>
                            <Form.Group widths='equal'>
                              <Field
                                component={FormField}
                                control={Input}
                                label='Choose an Appointment Date'
                                name='appointment_date'
                                required
                                type='date'/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                              <Field
                                component={FormField}
                                control={Select}
                                label='Groomer'
                                name='groomer'
                                options={employee.items.filter(_employee => _employee.title_name === 'Groomer').map(_employee=>
                                  ({ key: _employee.id, value: _employee.id, text: `${_employee.first_name + ' ' + _employee.last_name}` }))
                                }
                                placeholder='Select Groomer'
                                required
                                selectOnBlur={false}/>
                            </Form.Group>
                            <span>Schedules And Avaliablity</span>
                            <Grid>
                              <Grid.Column computer={8}>
                                <Segment className='available-message-two mt4'>
                                  <Header as='h4'>
                                 No Avaliablity
                                  </Header>
                                </Segment>
                              </Grid.Column>
                              <Grid.Column computer={8}>
                                <Segment className='available-message mt4'>
                                  <Header as='h4'>
                                  5/10 Avaliable
                                  </Header>

                                </Segment>
                              </Grid.Column>
                            </Grid>
                            <br/>
                            <label>Groomer/Barber</label>
                            <br/>
                            <Button
                              className='avaiable-buttons'
                              color='blue'
                              name='Monday'
                              type='button'>
                              <Icon name='clock outline'/>
                              9:00 am
                            </Button>
                            <Button
                              className='avaiable-buttons'
                              color='blue'
                              name='Tuesday'
                              type='button'>
                              <Icon name='clock outline'/>
                                11:00 am</Button>
                            <Button
                              className='avaiable-buttons'
                              color='blue'
                              name='Wednesday'
                              type='button'>
                              <Icon name='clock outline'/>
                                4:00 pm</Button>
                            <Button
                              className='avaiable-buttons'
                              color='blue'
                              name='Thursday'
                              type='button'>
                              <Icon name='clock outline'/>
                                10:00 am</Button>
                            <Button
                              className='avaiable-buttons'
                              color='blue'
                              name='Friday'
                              type='button'>
                              <Icon name='clock outline'/>
                                3:00 pm</Button>

                            <Form.Group style={{ 'margin-top': '27px' }}   widths='equal'>
                              <Field
                                component={FormField}
                                control={TextArea}
                                label='Notes'
                                name='notes'/>
                            </Form.Group>
                            <Form.Field>
                              <Button
                                basic
                                className='w160'
                                color='teal'
                                floated='right'
                                // onClick={_handleAddNoteBtnClick}
                                style={{ 'margin-top': '35px' }}
                                type='button'><Icon name='plus'/>Add Service
                              </Button>
                            </Form.Field>
                          </Grid.Column>
                        </Grid>
                      </Segment>
                    </Accordion.Content>
                  </Accordion>
                </>
              )
            })}

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
              className='w140'
              color='teal'
              content='Back'
              onClick={props.onPreviousStep}
              type='button'/>
          </Form.Field>
          <Form.Field>
            <Button
              className='w140'
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
      const sharedLodging = formValueSelector(boardingFormId)(state, 'shared_lodging')
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const selectedLocation = formValueSelector(boardingFormId)(state, 'location')
      const services = serviceDuck.selectors.list(state)
      const serviceAttribute = serviceAttributeDuck.selectors.list(state)
      const selectedPets = formValueSelector(boardingFormId)(state, 'pet')
      let checkOut = formValueSelector(boardingFormId)(state, 'check_out')
      let checkIn = formValueSelector(boardingFormId)(state, 'check_in')

      return {
        sharedLodging,
        petReservationDetail: petReservationDetail,
        initialValues       : { ...petReservationDetail.item },
        petKennel           : petKennelDuck.selectors.list(state),
        clientPet           : clientPetDuck.selectors.list(state),
        checkIn   ,
        state,
        checkOut,
        services,
        serviceAttribute,
        employee            : employeeDuck.selectors.list(state),
        selectedPets        : selectedPets,
        selectedLocation    : selectedLocation
      }
    },
    {
      getBoardingReservationAddons: boardingReservationAddonDuck.creators.get,
      getPetKennels               : petKennelDuck.creators.get,
      getGroomingReservationAddons: groomingReservationAddonDuck.creators.get,
      setReserveItem              : petReservationDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : boardingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(BoardingFormWizardSecond)
