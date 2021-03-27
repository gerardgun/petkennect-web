// changes
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector } from 'redux-form'
import { Button, Form, Header, Segment, Checkbox, Accordion, Grid, Icon, Input, Select, TextArea, Dropdown } from 'semantic-ui-react'

import moment from 'moment'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import Table from '@components/Table'
import groomingReservationAddonListConfig from '@lib/constants/list-configs/pet/grooming-reservation-addon'
import feedingAddonListConfig from '@lib/constants/list-configs/pet/boarding-reservation-feeding-addon'
import boardingAddonListConfig from '@lib/constants/list-configs/pet/boarding-reservation-addon'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import clientPetDuck from '@reducers/client/pet'
import petKennelDuck from '@reducers/pet/pet-kennel'
import boardingReservationAddonDuck from '@reducers/pet/reservation/boarding/add-on'
import feedingAddonDuck from '@reducers/pet/reservation/boarding/add-on/feeding-addon'
import employeeDuck from '@reducers/employee'
import groomingReservationAddonDuck from '@reducers/pet/reservation/grooming/add-on'
import PetItemBoarding from './pet-item-section'
import AddonTime from './../boarding/addTime-fieldArray'
import { boardingFormId } from './../boarding/first'
import { trainingFormId } from './../training/first'

const AddonForm = ({ ...props }) => {
  const {
    lodgingSection,
    clientPet,
    petKennel,
    employee,
    petReservationDetail,
    reservationDateArrayProp,
    state,
    selectedPets,
    checkIn,
    checkOut,
    checkInTime,
    checkOutTime,
    reservation,
    error, handleSubmit, reset
  } = props
  let formId
  if(reservation === 'boarding')
    formId = boardingFormId
  else if(reservation === 'training')
    formId = trainingFormId
  const [ activeIndex, setActiveIndex ] = useState(false)
  const [ activeArray, setActiveArray ] = useState([])
  const [ foodSubmitArray, setFoodSubmitArray ] = useState([])
  const [ groomingAddon, setGroomingAddon ] = useState([])
  const [ groomingAddonSubmit, setGroomingAddonSubmit ] = useState([])
  const [ frequencyMed, setFrequencyMed ] = useState(0)
  const [ frequencyFeed, setFrequencyFeed ] = useState(0)
  const [ feedTableData, setFeedTableData ] = useState([])
  const [ feedingFeedData, setFeedingFeedData ] = useState([])
  const [ frequencyMisc, setFrequencyMisc ] = useState(0)
  const [ miscTableData, setMiscTableData ] = useState([])
  const [ groomingTableData, setGroomingTableData ] = useState([])
  const [ showDateTime, setShowDateTime ] = useState(false)
  const [ activeMoreFunctionality, setActiveMoreFunctionality ] = useState([])
  const [ dateValue, setDateValue ] = useState('')
  useEffect(() => {
    props.getBoardingReservationAddons()
    props.getFeedingAddons()
    props.getPetKennels()
    props.getGroomingReservationAddons()

    if(petReservationDetail.item.additional_service != undefined)
      setActiveIndex(petReservationDetail.item.additional_service)
    if(petReservationDetail.item.activeArray != undefined)
      setActiveArray(petReservationDetail.item.activeArray)
    if(petReservationDetail.item.groomingAddon != undefined)
      setGroomingAddon(petReservationDetail.item.groomingAddon)
    if(petReservationDetail.item.foodSubmitArray != undefined)
      setFoodSubmitArray(petReservationDetail.item.foodSubmitArray)
    if(petReservationDetail.item.frequencyMed != undefined)
      setFrequencyMed(petReservationDetail.item.frequencyMed)
    if(petReservationDetail.item.selected_feeding_addon != undefined)
      setFeedTableData(petReservationDetail.item.selected_feeding_addon)
    if(petReservationDetail.item.frequencyFeed != undefined)
      setFrequencyFeed(petReservationDetail.item.frequencyFeed)
    if(petReservationDetail.item.feedingFeedData != undefined)
      setFeedingFeedData(petReservationDetail.item.feedingFeedData)
    if(petReservationDetail.item.selected_misc_addon != undefined)
      setMiscTableData(petReservationDetail.item.selected_misc_addon)
    if(petReservationDetail.item.frequencyMisc != undefined)
      setFrequencyMisc(petReservationDetail.item.frequencyMisc)
    if(petReservationDetail.item.selected_grooming_addon !=  undefined)
      setGroomingTableData(petReservationDetail.item.selected_grooming_addon)
  }, [])

  const notAvailableDates = [ '2021-02-15','2021-02-28','2021-02-18' ]
  const _handleAppointmenttwo = (e) =>{
    let index = Number(e.currentTarget.id)
    if(notAvailableDates.includes(e.target.value) && !activeMoreFunctionality.includes(index)) {
      setActiveMoreFunctionality([ ...activeMoreFunctionality, index ])
    }

    else {
      let array = activeMoreFunctionality.filter(item=>item != index)
      setActiveMoreFunctionality(array)
      setShowDateTime(false)
      setDateValue('')
    }
  }

  useEffect(()=>{
    props.setReserveItem({ ...petReservationDetail.item, activeArray: activeArray })
    props.setReserveItem({ ...petReservationDetail.item, foodSubmitArray: foodSubmitArray })
  },[ activeArray, foodSubmitArray ])
  useEffect(() => {
    props.setReserveItem({ ...petReservationDetail.item, frequencyMed: frequencyMed })
  },[ frequencyMed ])

  useEffect(()=>{
    props.setReserveItem({ ...petReservationDetail.item, selected_feeding_addon: feedTableData,
      feedingFeedData       : feedingFeedData })
  },[ feedTableData, feedingFeedData  ])

  const _handleDateTimeShow = (e,value)=>{
    setShowDateTime(true)
    setDateValue(value.value)
  }

  let reservationDateArr = []

  if(reservationDateArrayProp.length > 0 && reservation == 'training')
    reservationDateArr = [ ...reservationDateArrayProp ]
  else
    for (let d = new Date(checkIn); d <=  new Date(checkOut); d.setDate(d.getDate() + 1))
      reservationDateArr.push(moment(new Date(d)).format('MM/DD/YYYY'))

  const petKennelOptions = petKennel.items.map(_petKennel =>
    ({ key: _petKennel.id, value: _petKennel.id, text: `${_petKennel.size}` }))

  const  _handleAddonServiceClick = () => {
    setActiveIndex(!activeIndex)
    props.setReserveItem({ ...petReservationDetail.item, additional_service: !activeIndex })
  }

  const  _handleSelectAddonClick = (e, titleProps) => {
    const index = titleProps.index

    if(activeArray.includes(index)) {
      let array = activeArray.filter(item=>item != index)
      setActiveArray(array)
    }
    else
    {setActiveArray([ ...activeArray, index ])
    }
  }

  const _handleGroomingService = (e, titleProps) => {
    const { index } = titleProps
    if(groomingAddon.includes(index)) {
      let array = groomingAddon.filter(item=>item != index)
      setGroomingAddon(array)
      props.setReserveItem({ ...petReservationDetail.item, groomingAddon: array })
    }
    else
    {setGroomingAddon([ ...groomingAddon, index ])
      props.setReserveItem({ ...petReservationDetail.item, groomingAddon: [ ...groomingAddon, index ] })}
  }

  const _handleServiceBtnClick = (e,ownprop) =>{
    if(groomingAddon.includes(ownprop.value)) {
      let array = groomingAddon.filter(item=>item != ownprop.value)
      setGroomingAddon(array)
    }
    else
    {setGroomingAddon([ ...groomingAddon, ownprop.value ])}

    if(groomingAddonSubmit.includes(ownprop.value)) {
      // let array = foodSubmitArray.filter(item=>item != ownprop.value)
      // setFoodSubmitArray(array)
    }
    else
    {setGroomingAddonSubmit([ ...groomingAddonSubmit, ownprop.value ])}
  }

  // food total price
  const foodPet = []
  for (let petId of selectedPets)
    foodPet.push({ value: formValueSelector(formId)(state, 'addon[' + petId + '].food'), id: petId })

  let foodPetLength = 0
  for (let item of foodPet)
    if(item.value === true)
      foodPetLength += 1

  if(selectedPets.length === 1)
    foodPetLength = 1

  let totalPriceFood = Number(2.00) * Number(foodPetLength) * Number(formValueSelector(formId)(state, 'quantityFood'))

  const _handleFoodAddonSubmit = (e, ownprop) =>{
    let selectedData = [ ...foodSubmitArray ]

    if(foodSubmitArray.includes(ownprop.value)) {
      // let array = foodSubmitArray.filter(item=>item != ownprop.value)
      // setFoodSubmitArray(array)
    }
    else {
      selectedData.concat(ownprop.value)
      setFoodSubmitArray([ ...foodSubmitArray, ownprop.value ])
    }
    if(activeArray.includes(ownprop.value)) {
      let array = activeArray.filter(item=>item != ownprop.value)
      setActiveArray(array)
    }
    else
    {setActiveArray([ ...activeArray, ownprop.value ])
    }
  }

  // medication total price
  const medicationPet = []
  for (let petId of selectedPets)
    medicationPet.push({ value: formValueSelector(formId)(state, 'addon[' + petId + '].medication'), id: petId })

  let medicationPetLength = 0
  for (let item of medicationPet)
    if(item.value === true)
      medicationPetLength += 1

  if(selectedPets.length === 1)
    medicationPetLength = 1

  const totalPriceMed = (2.00) * (medicationPetLength) * Number(formValueSelector(formId)(state, 'quantityMed'))

  // Frequency calculate
  let oddNumberDates
  if(reservationDateArr.length % 2 != 0)
    oddNumberDates = reservationDateArr.length + 1
  else
    oddNumberDates = reservationDateArr.length

  let startFromSecond = 0
  for (let i = 1; i <= reservationDateArr.length; i++)
    if(i % 2 === 0)
      startFromSecond += 1

  const _handleFrequencyClick = (e, value) =>{
    if(value === 'once')
      setFrequencyMed(1)

    else if(value === 'every_other_day_first')
      setFrequencyMed(oddNumberDates / 2)

    else if(value === 'every_other_day_second')
      setFrequencyMed(startFromSecond)

    else if(value === 'every_day')
      setFrequencyMed(reservationDateArr.length)

    else if(value === 'every_day_except_first')
      setFrequencyMed(reservationDateArr.length - 1)

    else if(value === 'every_day_except_last')
      setFrequencyMed(reservationDateArr.length - 1)
  }
  let medicationTotalPrice = frequencyMed * totalPriceMed
  // feeding total price
  let feedingPet = []
  for (let petId of selectedPets)
    feedingPet.push({ value: formValueSelector(formId)(state, 'addon[' + petId + '].feeding'), id: petId })

  let feedingPetLength = 0
  for (let item of feedingPet)
    if(item.value === true)
      feedingPetLength += 1

  if(selectedPets.length === 1)
    feedingPetLength = 1

  const _handleFrequencyFeedClick = (e, value) =>{
    if(value === 'once') {
      setFrequencyFeed(1)
      props.setReserveItem({ ...petReservationDetail.item, frequencyFeed: 1 })
    }

    else if(value === 'every_other_day_first') {
      let feed = oddNumberDates / 2
      setFrequencyFeed(feed)
      props.setReserveItem({ ...petReservationDetail.item, frequencyFeed: feed })
    }

    else if(value === 'every_other_day_second') {
      let feed = startFromSecond
      setFrequencyFeed(feed)
      props.setReserveItem({ ...petReservationDetail.item, frequencyFeed: feed })
    }

    else if(value === 'every_day') {
      let feed = reservationDateArr.length
      setFrequencyFeed(feed)
      props.setReserveItem({ ...petReservationDetail.item, frequencyFeed: feed })
    }

    else if(value === 'every_day_except_first' || value === 'every_day_except_last') {
      let feed = reservationDateArr.length - 1
      setFrequencyFeed(feed)
      props.setReserveItem({ ...petReservationDetail.item, frequencyFeed: feed })
    }
  }

  const _handleFeedingFeedChange = (e, value) => {
    let selectedData =  [].concat(feedingFeedData)
    if(value === true)
    {
      selectedData.push(e.currentTarget.name)
      setFeedingFeedData(selectedData)
    }
    else {
      let remainingData = selectedData.filter(value => value != e.currentTarget.name)
      setFeedingFeedData(remainingData)
    }
  }

  // feedTableData
  const _handleCheckboxChangeFeed = (item) => {
    const data_found = Boolean(feedTableData.find(_item=> _item.id == item.id))
    if(data_found == false) {
      setFeedTableData([ ...feedTableData, { id: item.id, price: Number(item.price) } ])
    }

    else {
      let remainingData = feedTableData.filter(value => value.id != item.id)
      setFeedTableData(remainingData)
    }
  }

  let feedingAddonPrice =  feedTableData.map(_ => _.price).reduce((price1, price2) =>  Number(price1) + Number(price2), 0)
  const frequencyFeedData1 = formValueSelector(formId)(state, 'frequencyFeed')
  const breakfastFeedData = formValueSelector(formId)(state, 'breakfastFeed')
  const dinnerFeedData = formValueSelector(formId)(state, 'dinnerFeed')
  const onceFeedDate = formValueSelector(formId)(state, 'once_dateFeed')

  let feedingDays = (frequencyFeed) * (feedingFeedData.length)
  // for breakfast
  if(frequencyFeedData1 === 'every_day' || frequencyFeedData1 === 'every_other_day_first' || frequencyFeedData1 === 'every_day_except_last')
    if(breakfastFeedData === true && checkInTime >= '09:00')
      feedingDays = feedingDays - 1

  if(frequencyFeedData1 === 'once' && (checkIn === onceFeedDate))
    if(breakfastFeedData === true && checkInTime >= '09:00')
      feedingDays = feedingDays - 1

  // for dinner
  if(frequencyFeedData1 === 'every_other_day_first' && (reservationDateArr % 2 != 0))
    if(dinnerFeedData === true && checkOutTime <= '17:00')
      feedingDays = feedingDays - 1

  if(frequencyFeedData1 === 'every_other_day_second' && (reservationDateArr % 2 === 0))
    if(dinnerFeedData === true && checkOutTime <= '17:00')
      feedingDays = feedingDays - 1

  if(frequencyFeedData1 === 'every_day' || frequencyFeedData1 === 'every_day_except_first')
    if(dinnerFeedData === true && checkOutTime <= '17:00')
      feedingDays = feedingDays - 1

  if(frequencyFeedData1 === 'once' && (checkOut === onceFeedDate))
    if(dinnerFeedData === true && checkOutTime  <= '17:00')
      feedingDays = feedingDays - 1

  let feedingTotalPrice = 2 * (feedingPetLength) * (feedingDays) * (feedingAddonPrice)

  // misc total price
  const miscPet = []
  for (let petId of selectedPets)
    miscPet.push({ value: formValueSelector(formId)(state, 'addon[' + petId + '].misc'), id: petId })

  let miscellaneousPetLength = 0
  for (let item of miscPet)
    if(item.value === true)
      miscellaneousPetLength += 1

  if(selectedPets.length === 1)
    miscellaneousPetLength = 1

  const _handleFrequencyMiscClick = (e, value) =>{
    // if(e.currentTarget.name === frequencyMed) {
    // if(value === 'every_custom_week')
    //   setCustomWeekNumber(1)
    // else
    //   setCustomWeekNumber('')
    if(value === 'once') {
      setFrequencyMisc(1)
      props.setReserveItem({ ...petReservationDetail.item, frequencyFeed: 1 })
    }

    else if(value === 'every_other_day_first') {
      let misc = oddNumberDates / 2
      setFrequencyMisc(misc)
      props.setReserveItem({ ...petReservationDetail.item, frequencyMisc: misc })
    }

    else if(value === 'every_other_day_second') {
      let misc = startFromSecond
      setFrequencyMisc(misc)
      props.setReserveItem({ ...petReservationDetail.item, frequencyMisc: misc })
    }

    else if(value === 'every_day') {
      let misc = reservationDateArr.length
      setFrequencyMisc(misc)
      props.setReserveItem({ ...petReservationDetail.item, frequencyMisc: misc })
    }

    else if(value === 'every_day_except_first' || value === 'every_day_except_last') {
      let misc = reservationDateArr.length - 1
      setFrequencyMisc(misc)
      props.setReserveItem({ ...petReservationDetail.item, frequencyMisc: misc })
    }
  }

  // MiscTableData
  const _handleCheckboxChangeMisc = (item) => {
    const data_found = Boolean(miscTableData.find(_item=> _item.id == item.id))
    let selectedData =  [].concat(miscTableData)
    if(data_found === false)
    {
      selectedData.push({ id: item.id, price: Number(item.price) })
      setMiscTableData(selectedData)
      props.setReserveItem({ ...petReservationDetail.item, selected_misc_addon: selectedData })
    }
    else {
      let remainingData = selectedData.filter(value => value.id != item.id)
      setMiscTableData(remainingData)
      props.setReserveItem({ ...petReservationDetail.item, selected_misc_addon: remainingData })
    }
  }

  let miscellaneousAddonPrice =  miscTableData.map(_ => _.price).reduce((price1, price2) =>  Number(price1) + Number(price2), 0)
  let miscellaneousTotalPrice = (miscellaneousPetLength) * (frequencyMisc) * (miscellaneousAddonPrice)

  // Grooming Table Data
  const _handleCheckboxChangeGrooming = (item, index) => {
    const data_found = Boolean(groomingTableData.find(_item=> _item.id == item.id
      && _item.index == index))
    let selectedData =  [].concat(groomingTableData)
    if(data_found === false)
    {
      selectedData.push({ index: index, id: item.id, price: Number(item.price) })
      setGroomingTableData(selectedData)
      props.setReserveItem({ ...petReservationDetail.item, selected_grooming_addon: selectedData })
    }
    else {
      let indexData = selectedData.filter(value => value.index != index)
      let data = selectedData.filter(item => item.index === index)
      let remainingData = data.filter(value => value.id != item.id)
      let totalData = [].concat(indexData).concat(remainingData)
      setGroomingTableData(totalData)
      props.setReserveItem({ ...petReservationDetail.item, selected_grooming_addon: remainingData })
    }
  }

  const sharedLodging = formValueSelector(formId)(state, 'shared_lodging')

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form className='section-info-item-form' onReset={reset} onSubmit={handleSubmit}>
        {
          lodgingSection && (
            <Segment>
              <Header as='h3' className='section-info-header'>Lodging Stay and Activity Type</Header>

              {
                sharedLodging && sharedLodging === true ? (<PetItemBoarding
                  checkIn={checkIn} checkOut={checkOut} clientPet={clientPet}
                  item={selectedPets && selectedPets.map((petId) => (petId))}
                  lodging={sharedLodging}
                  petKennelOptions={petKennelOptions} trainingDateArray={reservation == 'training' ? reservationDateArr : []}/>)
                  : (
                    selectedPets && selectedPets.map((petId)=> (
                      <PetItemBoarding
                        checkIn={checkIn} checkOut={checkOut} item={clientPet.items.find(_pet => _pet.id === petId)}
                        key={petId}
                        lodging={sharedLodging} petKennelOptions={petKennelOptions}
                        trainingDateArray={reservation == 'training' ? reservationDateArr : []}/>
                    )
                    )
                  )
              }
            </Segment>

          )
        }
        <Segment>
          <Header as='h3' className='section-info-header'>Add-On Services</Header>
          <Accordion className='mv12'>
            <Accordion.Title
              active={activeIndex}
              className='heading-color'
              onClick={_handleAddonServiceClick}
              value='Add'>
              <Header as='h3' className='mb0 heading-color mv8 ml16'>
                Add Additional Services
                <Header className='heading-color' floated='right'><Icon name='dropdown'/></Header>
              </Header>

            </Accordion.Title>

            <Accordion.Content active={activeIndex} className='mt12 ml12'>
              <div>
                <Grid>
                  <Grid.Column className='padding-column' width={16}>
                    <Accordion className='margin-accordian'>
                      <Accordion.Title
                        active={activeArray.includes(0)}
                        className='heading-color'
                        index={0}
                        onClick={_handleSelectAddonClick}>
                        <Header as='h5' className='mb0 heading-color mv4 ml16'>
                            Food Bagging Charges {foodSubmitArray.includes(0) && (': $' + `${totalPriceFood.toFixed(2)}`)}
                          <Header className='heading-color' floated='right'><Icon name='dropdown'/></Header>
                        </Header>
                      </Accordion.Title>

                      <Accordion.Content active={activeArray.includes(0)}>
                        <Segment>
                          <Grid>
                            <Grid.Column width={16}>
                              <Header as='h5' className='mb0'>
                                      Description of Service :
                              </Header>
                            </Grid.Column>
                            <span>Food Bagging Charges</span>
                            <Grid.Column width={16}>
                              <b>Price :</b> <span> $2.00</span>
                            </Grid.Column>
                            <Grid.Column className='padding-column' width={16}>
                              {
                                selectedPets &&  selectedPets.length === 1
                                  ? <span> Applies to Pet :</span>
                                  : <span> Applies to Pets :</span>
                              }
                            </Grid.Column>
                            <Grid.Column className='mt12 padding-column' width={7}>
                              {
                                selectedPets.length === 1 ? <span className='ml16'>{selectedPets && selectedPets.map((petId) =>
                                  (
                                    <Form.Group className='mh4' key={petId}>
                                      <Field
                                        checked={true}
                                        className='checkbox-label mh4'
                                        component={FormField} control={Checkbox}
                                        name={`addon[${petId}].food`}
                                        type='checkbox'/>
                                      <label>
                                        {clientPet.items.find(_pet => _pet.id === petId).name}</label>
                                    </Form.Group>
                                  ))}</span>
                                  : selectedPets && selectedPets.map((petId) => (
                                    <Form.Group className='mh4' key={petId}>
                                      <Field
                                        className='checkbox-label mh4'
                                        component={FormField} control={Checkbox}
                                        name={`addon[${petId}].food`}
                                        type='checkbox'/>
                                      <label>
                                        {clientPet.items.find(_pet => _pet.id === petId).name}</label>
                                    </Form.Group>

                                  ))
                              }
                            </Grid.Column>
                            <Grid.Column className='padding-column' width={5}>
                              <Form.Group className='align-center ml16'>
                                <label className='w33'>Quantity</label>
                                <Field
                                  component={FormField}
                                  control={Input}
                                  min={0}
                                  name='quantityFood'
                                  type='number'/>
                              </Form.Group>
                              <Form.Group className='align-center ml16'>
                                <label className='w33'>Total Price</label>
                                <Form.Input readOnly value={(totalPriceFood > 0 ?  totalPriceFood : 0)}/>
                              </Form.Group>
                            </Grid.Column>
                            <Grid.Column width={16}>
                              <Grid>
                                <Grid.Column width={12}>
                                  <Field
                                    component={FormField}
                                    control={Form.TextArea}
                                    label='Notes'
                                    name='noteFood'
                                    placeholder='Enter Notes'/>
                                </Grid.Column>
                                <Grid.Column className='addon-service-button' width={4}>
                                  <Form.Field>
                                    <Button
                                      active={activeArray.includes(0)}
                                      basic
                                      className='w160'
                                      color='teal'
                                      onClick={_handleFoodAddonSubmit}
                                      type='button'
                                      value={0}><Icon name='plus'/>Add Service
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

                  <Grid.Column className='padding-column' width={16}>
                    <Accordion className='margin-accordian'>
                      <Accordion.Title
                        active={activeArray.includes(1)}
                        className='heading-color'
                        index={1}
                        onClick={_handleSelectAddonClick}>
                        <Header as='h5' className='mb0 heading-color mv4 ml16'>
                        Medication {foodSubmitArray.includes(1) && (frequencyMed > 0 && ': $' + (`${medicationTotalPrice.toFixed(2)}`))}
                          <Header className='heading-color' floated='right'><Icon name='dropdown'/></Header>
                        </Header>
                      </Accordion.Title>
                      <Accordion.Content active={activeArray.includes(1)}>
                        <Segment>
                          <Grid>
                            <Grid.Column width={16}>
                              <Header as='h5' className='mb0'>
                                Description of Service :
                              </Header>
                            </Grid.Column>
                            <span>Medication</span>
                            <Grid.Column width={16}>
                              <b>Price :</b> <span> $2.00</span>
                            </Grid.Column>
                            <Grid.Column width={16}>
                              {
                                selectedPets &&  selectedPets.length === 1
                                  ? <span> Applies to Pet :</span>
                                  : <span> Applies to Pets :</span>
                              }
                            </Grid.Column>
                            <Grid.Column className='mt12 padding-column' width={7}>
                              {
                                selectedPets.length === 1 ? <span className='ml16'>{selectedPets && selectedPets.map((petId) =>
                                  (
                                    <Form.Group className='mh4' key={petId}>
                                      <Field
                                        checked={true}
                                        className='checkbox-label mh4'
                                        component={FormField} control={Checkbox}
                                        name={`addon[${petId}].medication`}
                                        type='checkbox'/>
                                      <label>
                                        {clientPet.items.find(_pet => _pet.id === petId).name}</label>
                                    </Form.Group>
                                  ))}</span>
                                  : selectedPets && selectedPets.map((petId) => (
                                    <Form.Group className='mh4' key={petId}>
                                      <Field
                                        className='checkbox-label mh4'
                                        component={FormField} control={Checkbox}
                                        name={`addon[${petId}].medication`}
                                        type='checkbox'/>
                                      <label htmlFor={petId}>
                                        {clientPet.items.find(_pet => _pet.id === petId).name}</label>
                                    </Form.Group>

                                  ))
                              }
                            </Grid.Column>
                            <Grid.Column width={5}>
                              <Form.Group className='align-center ml16'>
                                <label className='w33'>Quantity</label>
                                <Field
                                  component={FormField}
                                  control={Input}
                                  min={0}
                                  name='quantityMed'
                                  type='number'/>
                              </Form.Group>
                              <Form.Group className='align-center ml16'>
                                <label className='w33'>Total Price</label>
                                <Form.Input readOnly value={(totalPriceMed > 0 ?  totalPriceMed : 0)}/>
                              </Form.Group>
                            </Grid.Column>
                            <Grid.Column width={16}>
                              <Header as='h4'>Frequency</Header>
                              <Grid>
                                <Grid.Column className='ml16' width={6}>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input'
                                      name='frequencyMed'
                                      onChange={_handleFrequencyClick}
                                      type='radio' value='once'/>
                                    <label className='mh4'> Once(Specific Date)</label>
                                    <Form.Field
                                      className='ml8 mv8 w_input_3'
                                      control={Input}
                                      name='once_dateMed'
                                      // onChange={_handleCustomWeekChange}
                                      // readOnly={frequency !== 'every_custom_week'}
                                      type='date'/>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input' name='frequencyMed'
                                      onChange={_handleFrequencyClick}
                                      type='radio' value='every_other_day_first'/>
                                    <label className='mh4'> Every Other Day (Starting First Day)</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input' name='frequencyMed'
                                      onChange={_handleFrequencyClick}
                                      type='radio' value='every_other_day_second'/>
                                    <label className='mh4'> Every Other Day (Starting Second Day)</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input'
                                      name='frequencyMed'
                                      onChange={_handleFrequencyClick}
                                      type='radio' value='every_day'/>
                                    <label className='mh4'> Every Day</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input' name='frequencyMed'
                                      onChange={_handleFrequencyClick}
                                      type='radio' value='every_day_except_first'/>
                                    <label className='mh4'> Every Day Except First Day</label>
                                  </Form.Group>
                                  <Form.Group  className='div_align_center mh0'>
                                    <Field
                                      className='pt0'
                                      component='input'
                                      name='frequencyMed'
                                      onChange={_handleFrequencyClick}
                                      type='radio' value='every_day_except_last'/>
                                    <label className='mh4'> Every Day Except Last Day</label>
                                  </Form.Group>
                                </Grid.Column>
                                <Grid.Column className='mt20' width={3}>
                                  <Header as='h4'>Times :</Header>
                                  <AddonTime name='add_time_med'/>
                                </Grid.Column>
                                <Grid.Column className='mt20 ml32' width={3}>
                                  <Header as='h4'>With Feedings :</Header>
                                  <Form.Group>
                                    <Field
                                      className='checkbox-label'
                                      component={FormField} control={Checkbox}
                                      name='breakfastMed'
                                      type='checkbox'/>
                                    <label>W/Breakfast </label>
                                  </Form.Group>
                                  <Form.Group>
                                    <Field
                                      className='checkbox-label'
                                      component={FormField} control={Checkbox}
                                      name='lunchMed'
                                      type='checkbox'/>
                                    <label>W/Lunch</label>
                                  </Form.Group>
                                  <Form.Group>
                                    <Field
                                      className='checkbox-label'
                                      component={FormField} control={Checkbox}
                                      name='dinnerMed'
                                      type='checkbox'/>
                                    <label>W/Dinner</label>
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
                                    name='noteMed'
                                    placeholder='Enter Notes'/>
                                </Grid.Column>
                                <Grid.Column className='addon-service-button' width={4}>
                                  <Form.Field>
                                    <Button
                                      active={activeArray.includes(1)}
                                      basic
                                      className='w160'
                                      color='teal'
                                      onClick={_handleFoodAddonSubmit}
                                      type='button'
                                      value={1}><Icon name='plus'/>Add Service
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

                  <Grid.Column className='padding-column' width={16}>
                    <Accordion className='margin-accordian'>
                      <Accordion.Title
                        active={activeArray.includes(2)}
                        className='heading-color'
                        index={2}
                        onClick={_handleSelectAddonClick}>
                        <Header as='h5' className='mb0 heading-color mv4 ml16'>
                            Feeding {foodSubmitArray.includes(2) && (frequencyFeed > 0 && ': $' + (`${feedingTotalPrice.toFixed(2)}`))}
                          <Header className='heading-color' floated='right'><Icon name='dropdown'/></Header>
                        </Header>
                      </Accordion.Title>
                      <Accordion.Content active={activeArray.includes(2)}>
                        <Segment>
                          <Grid>
                            <Grid.Column width={9}>
                              <Grid.Column className='mb16'>
                                <Header as='h5' className='mb0'>
                                Description of Service :
                                </Header>
                              </Grid.Column>
                              <span>Feeding</span>
                              <Grid.Column className='mt16'>
                                <b>Price :</b> <span> $2.00</span>
                              </Grid.Column>
                              <Grid.Column className='mv24'>
                                {
                                  selectedPets && selectedPets.length === 1
                                    ? <span> Applies to Pet :</span>
                                    : <span> Applies to Pets :</span>
                                }
                              </Grid.Column>
                              <Grid.Column>
                                {
                                  selectedPets.length === 1 ? <span className='ml16'>{selectedPets && selectedPets.map((petId) =>
                                    (
                                      <Form.Group className='mh4' key={petId}>
                                        <Field
                                          checked={true}
                                          className='checkbox-label mh4'
                                          component={FormField} control={Checkbox}
                                          name={`addon[${petId}].feeding`}
                                          type='checkbox'/>
                                        <label>
                                          {clientPet.items.find(_pet => _pet.id === petId).name}</label>
                                      </Form.Group>
                                    ))}</span>
                                    : selectedPets && selectedPets.map((petId) => (
                                      <Form.Group className='mh4' key={petId}>
                                        <Field
                                          className='checkbox-label mh4'
                                          component={FormField} control={Checkbox}
                                          name={`addon[${petId}].feeding`}
                                          type='checkbox'/>
                                        <label htmlFor={petId}>
                                          {clientPet.items.find(_pet => _pet.id === petId).name}</label>
                                      </Form.Group>
                                    ))
                                }
                              </Grid.Column>
                            </Grid.Column>
                            <Grid.Column width={7}>
                              <Table config={feedingAddonListConfig} duck={feedingAddonDuck}/>
                              {/*
                              onOptionCheckboxChange={_handleCheckboxChangeFeed}
                              service_type={`${reservation}feeding`}
                              striped
                              */}
                            </Grid.Column>
                            <Grid.Column width={16}>
                              <Header as='h4'>Frequency</Header>
                              <Grid>
                                <Grid.Column className='ml16' width={6}>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input'
                                      name='frequencyFeed'
                                      onChange={_handleFrequencyFeedClick}
                                      type='radio' value='once'/>
                                    <label className='mh4'> Once(Specific Date)</label>
                                    <Field
                                      className='ml8 mv8 date-field-width'
                                      component='input'
                                      name='once_dateFeed'
                                      type='date'/>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input' name='frequencyFeed'
                                      onChange={_handleFrequencyFeedClick}
                                      type='radio' value='every_other_day_first'/>
                                    <label className='mh4'> Every Other Day (Starting First Day)</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input' name='frequencyFeed'
                                      onChange={_handleFrequencyFeedClick}
                                      type='radio' value='every_other_day_second'/>
                                    <label className='mh4'> Every Other Day (Starting Second Day)</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input'
                                      name='frequencyFeed'
                                      onChange={_handleFrequencyFeedClick}
                                      type='radio' value='every_day'/>
                                    <label className='mh4'> Every Day</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input' name='frequencyFeed'
                                      onChange={_handleFrequencyFeedClick}
                                      type='radio' value='every_day_except_first'/>
                                    <label className='mh4'> Every Day Except First Day</label>
                                  </Form.Group>
                                  <Form.Group  className='div_align_center mh0'>
                                    <Field
                                      className='pt0'
                                      component='input'
                                      name='frequencyFeed'
                                      onChange={_handleFrequencyFeedClick}
                                      type='radio' value='every_day_except_last'/>
                                    <label className='mh4'> Every Day Except Last Day</label>
                                  </Form.Group>
                                </Grid.Column>
                                <Grid.Column className='mt20' width={3}>
                                  <Header as='h4'>Times :</Header>
                                  <AddonTime name='add_time_feed'/>
                                </Grid.Column>
                                <Grid.Column className='mt20 ml32' width={3}>
                                  <Header as='h4'>Feedings :</Header>
                                  <Form.Group className='div_align_center ml0'>
                                    <Field
                                      className='checkbox-label'
                                      component='input' id='breakfast'
                                      name='breakfastFeed'
                                      onChange={_handleFeedingFeedChange}
                                      type='checkbox'/>
                                    <label className='ml4' htmlFor='breakfast'> Breakfast </label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center ml0'>
                                    <Field
                                      className='checkbox-label'
                                      component='input' id='lunch'
                                      name='lunchFeed'
                                      onChange={_handleFeedingFeedChange}
                                      type='checkbox'/>
                                    <label className='ml4' htmlFor='lunch'> Lunch</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center ml0'>
                                    <Field
                                      className='checkbox-label'
                                      component='input' id='dinner'
                                      name='dinnerFeed'
                                      onChange={_handleFeedingFeedChange}
                                      type='checkbox'/>
                                    <label className='ml4' htmlFor='dinner'> Dinner</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center ml0'>
                                    <Field
                                      className='checkbox-label'
                                      component='input' id='other'
                                      name='otherFeed'
                                      onChange={_handleFeedingFeedChange}
                                      type='checkbox'/>
                                    <label className='ml4' htmlFor='other'> Other</label>
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
                                    name='noteFeed'
                                    placeholder='Enter Notes'/>
                                </Grid.Column>
                                <Grid.Column className='addon-service-button' width={4}>
                                  <Form.Field>
                                    <Button
                                      active={activeArray.includes(2)}
                                      basic
                                      className='w160'
                                      color='teal'
                                      onClick={_handleFoodAddonSubmit}
                                      type='button'
                                      value={2}><Icon name='plus'/>Add Service
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

                  <Grid.Column className='padding-column' width={16}>
                    <Accordion className='margin-accordian'>
                      <Accordion.Title
                        active={activeArray.includes(3)}
                        className='heading-color'
                        index={3}
                        onClick={_handleSelectAddonClick}>
                        <Header as='h5' className='mb0 heading-color mv4 ml16'>{
                          reservation == 'training' ? 'Training Miscellaneous Charges' : 'Miscellaneous Charges'
                        }
                        { foodSubmitArray.includes(3) && frequencyMisc > 0 && ': $' + (`${miscellaneousTotalPrice.toFixed(2)}`)}
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
                                <span>{ reservation == 'training' ? 'Training Miscellaneous Charges' : 'Miscellaneous Charges'}</span>
                              </Grid.Column>
                              <Grid.Column className='mv24'>
                                {
                                  selectedPets &&  selectedPets.length === 1
                                    ? <span> Applies to Pet :</span>
                                    : <span> Applies to Pets :</span>
                                }

                                <Grid.Column className='mv28'>
                                  {
                                    selectedPets.length === 1 ? <span className='ml16'>{selectedPets && selectedPets.map((petId) =>
                                      (
                                        <Form.Group className='mh4' key={petId}>
                                          <Field
                                            checked={true}
                                            className='checkbox-label mh4'
                                            component={FormField} control={Checkbox}
                                            name={`addon[${petId}].misc`}
                                            type='checkbox'/>
                                          <label>
                                            {clientPet.items.find(_pet => _pet.id === petId).name}</label>
                                        </Form.Group>
                                      ))}</span>
                                      : selectedPets && selectedPets.map((petId) => (
                                        <Form.Group className='mh4' key={petId}>
                                          <Field
                                            className='checkbox-label mh4'
                                            component={FormField} control={Checkbox}
                                            name={`addon[${petId}].misc`}
                                            type='checkbox'/>
                                          <label htmlFor={petId}>
                                            {clientPet.items.find(_pet => _pet.id === petId).name}</label>
                                        </Form.Group>
                                      ))
                                  }
                                </Grid.Column>
                              </Grid.Column>
                            </Grid.Column>
                            <Grid.Column className='addon-table' width={7}>
                              <Table config={boardingAddonListConfig} duck={boardingReservationAddonDuck}/>
                              {/*
                                onOptionCheckboxChange={_handleCheckboxChangeMisc}
                                service_type={`${reservation}miscellaneousCharges`}
                                striped
                              */}
                            </Grid.Column>
                            <Grid.Column width={16}>
                              <Header as='h4'>Frequency</Header>
                              <Grid>
                                <Grid.Column className='ml16' width={6}>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input'
                                      name='frequencyMisc'
                                      onChange={_handleFrequencyMiscClick}
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
                                      component='input' name='frequencyMisc'
                                      onChange={_handleFrequencyMiscClick}
                                      type='radio' value='every_other_day_first'/>
                                    <label className='mh4'> Every Other Day (Starting First Day)</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input' name='frequencyMisc'
                                      onChange={_handleFrequencyMiscClick}
                                      type='radio' value='every_other_day_second'/>
                                    <label className='mh4'> Every Other Day (Starting Second Day)</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input'
                                      name='frequencyMisc'
                                      onChange={_handleFrequencyMiscClick}
                                      type='radio' value='every_day'/>
                                    <label className='mh4'> Every Day</label>
                                  </Form.Group>
                                  <Form.Group className='div_align_center mh0'>
                                    <Field
                                      component='input' name='frequencyMisc'
                                      onChange={_handleFrequencyMiscClick}
                                      type='radio' value='every_day_except_first'/>
                                    <label className='mh4'> Every Day Except First Day</label>
                                  </Form.Group>
                                  <Form.Group  className='div_align_center mh0'>
                                    <Field
                                      className='pt0'
                                      component='input'
                                      name='frequencyMisc'
                                      onChange={_handleFrequencyMiscClick}
                                      type='radio' value='every_day_except_last'/>
                                    <label className='mh4'> Every Day Except Last Day</label>
                                  </Form.Group>
                                </Grid.Column>
                                <Grid.Column className='mt20' width={3}>
                                  <Header as='h4'>Times :</Header>
                                  <AddonTime name='add_time_misc'/>
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
                                    selection
                                    selectOnBlur={false}/>
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
                                    name='noteMisc'
                                    placeholder='Enter Notes'/>
                                </Grid.Column>
                                <Grid.Column className='addon-service-button' width={4}>
                                  <Form.Field>
                                    <Button
                                      active={activeArray.includes(3)}
                                      basic
                                      className='w160'
                                      color='teal'
                                      onClick={_handleFoodAddonSubmit}
                                      type='button'
                                      value={3}><Icon name='plus'/>Add Service
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
            selectedPets && selectedPets.map((_item,_index) => {
              let petName = clientPet.items.find(item=>item.id === _item).name

              return (
                <>
                  <Accordion className='mv12'>
                    <Accordion.Title
                      active={groomingAddon.includes(_index)}
                      className='heading-color'
                      index={_index}
                      onClick={_handleGroomingService}>
                      <Header as='h4' className='mb0 heading-color mv8 ml16'>
                        Add Grooming Services for {petName} {groomingAddonSubmit.includes(_index) && (' : $' + (`${groomingTableData.filter(_ => _.index === _index).map(_ => _.price).reduce((price1, price2) =>  Number(price1) + Number(price2), 0).toFixed(2)}`))}
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
                            <div className='addon-table'>
                              <Table
                                config={groomingReservationAddonListConfig}
                                duck={groomingReservationAddonDuck}/>
                              {/* checkboxIndex={_index}
                                onOptionCheckboxChange={_handleCheckboxChangeGrooming}
                                service_type={`grooming.addon.${reservation}`}
                                striped */}
                            </div>
                            <p style={{ 'margin-left': '336px' }}><b>Total Price  ${groomingTableData.filter(_ => _.index === _index).map(_ => _.price).reduce((price1, price2) =>  Number(price1) + Number(price2), 0).toFixed(2)} </b></p>

                          </Grid.Column>
                          <Grid.Column computer={8}>
                            <Header as='h5' className='mb0'>When?</Header>
                            <br/>
                            <Form.Group widths='equal'>
                              <Field
                                className='appointment-field'
                                component='input'
                                id={_index}
                                label='Choose an Appointment Date'
                                name={`appointment_date${_index}`}
                                onChange={_handleAppointmenttwo}
                                type='date'/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                              <Field
                                component={FormField}
                                control={Select}
                                label='Groomer'
                                name={`${_item}.groomer`}
                                options={employee.items.filter(_employee => _employee.title_name === 'Groomer').map(_employee=>
                                  ({ key: _employee.id, value: _employee.id, text: `${_employee.first_name + ' ' + _employee.last_name}` }))
                                }
                                placeholder='Select Groomer'
                                selectOnBlur={false}/>
                            </Form.Group>
                            <span>Schedules And Avaliablity</span>
                            <br/>
                            <br/>
                            <Grid>
                              <Grid.Column  computer={16}>
                                <Button
                                  className={activeMoreFunctionality.includes(_index) ? 'Availability-button' : 'Availability-button-two'}
                                  name='Monday'
                                  type='button'>
                                  {activeMoreFunctionality.includes(_index) ? 'No Availability' : '5/10 Avaliable'}
                                </Button>
                              </Grid.Column>
                            </Grid>

                            { activeMoreFunctionality.includes(_index)
                              ? <>
                                <Grid>
                                  <Grid.Column>
                                    <span>Check Other Dates</span>
                                  </Grid.Column>
                                </Grid>

                                <Grid>
                                  <Grid.Column computer={2} >
                                    <Form.Button
                                      basic
                                      color='blue'
                                      icon='left chevron'
                                      type='button'/>
                                  </Grid.Column>

                                  <Grid.Column computer={6}>
                                    <span style={{ 'margin-left': '40px' }}>02/25/2021</span>
                                    <Button
                                      className='grooming-button-appoint mt12'
                                      content='7/10 Available'
                                      onClick={_handleDateTimeShow}
                                      type='button'
                                      value='02/25/2021'/>
                                  </Grid.Column>
                                  <Grid.Column computer={6}>
                                    <span style={{ 'margin-left': '40px' }}>02/10/2021</span>
                                    <Button
                                      className='grooming-button-appoint mt12'
                                      content='5/10 Available'
                                      onClick={_handleDateTimeShow}
                                      type='button'
                                      value='02/10/2021'/>
                                  </Grid.Column>
                                  <Grid.Column computer={2} >
                                    <Form.Button
                                      basic
                                      color='blue'
                                      icon='chevron right'

                                      type='button'/>
                                  </Grid.Column>
                                </Grid>
                                {
                                  showDateTime && <>
                                    <Grid>
                                      <Grid.Column>
                                        <label>
                                          <b> {dateValue}  Availability</b>
                                        </label>
                                        <br/>
                                        <Button
                                          className='avaiable-buttons'
                                          color='blue'
                                          name='Monday'
                                          type='button'>
                                          <Icon name='clock outline'/>
                                          10:00 am
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
                                          6:00 pm</Button>
                                        <Button
                                          className='avaiable-buttons'
                                          color='blue'
                                          name='Thursday'
                                          type='button'>
                                          <Icon name='clock outline'/>
                                          12:00 am</Button>
                                        <Button
                                          className='avaiable-buttons'
                                          color='blue'
                                          name='Friday'
                                          type='button'>
                                          <Icon name='clock outline'/>
                                          6:00 pm</Button>
                                      </Grid.Column>

                                    </Grid>
                                  </>
                                }

                              </> : <>

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

                              </>

                            }

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
                                onClick={_handleServiceBtnClick}
                                style={{ 'margin-top': '35px' }}
                                type='button'
                                value={_index}><Icon name='plus'/>Add Service
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
      </Form>
    </>
  )
}

AddonForm.propTypes = {
}

AddonForm.defaultProps = {
  lodgingSection          : true,
  reservationDateArrayProp: []
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const clientPet = clientPetDuck.selectors.list(state)

      return {
        petReservationDetail: petReservationDetail,
        initialValues       : { ...petReservationDetail.item },
        petKennel           : petKennelDuck.selectors.list(state),
        clientPet           : clientPet,
        state,
        employee            : employeeDuck.selectors.list(state)
      }
    },
    {
      getBoardingReservationAddons: boardingReservationAddonDuck.creators.get,
      getFeedingAddons            : feedingAddonDuck.creators.get,
      getPetKennels               : petKennelDuck.creators.get,
      getGroomingReservationAddons: groomingReservationAddonDuck.creators.get,
      setReserveItem              : petReservationDetailDuck.creators.setItem
    }
  )
)(AddonForm)
