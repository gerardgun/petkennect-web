import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Grid,
  Header,
  Input,
  Select
} from 'semantic-ui-react'
import {
  Field,
  formValueSelector,
  FieldArray,
  reduxForm,
  getFormSyncErrors,
  submit
} from 'redux-form'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import PetList from './components/pet-list'
import SelectPetsSectionForm from '../../components/SelectPetsSectionForm'
import { syncValidate } from '@lib/utils/functions'

import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'
import moment from 'moment'
import '../../components/styles.scss'
import FormError from '@components/Common/FormError'
import clientDetailDuck from '@reducers/client/detail'
import petDetailDuck from '@reducers/pet/detail'
import { Link, useParams } from 'react-router-dom'

const selector = formValueSelector('boarding-form')
const getFormErrors = getFormSyncErrors('boarding-form')

const BoardingSectionFirst = (props) => {
  const { error, reset, handleSubmit, initialize, change } = props
  const { client } = useParams()
  const { pet } = useParams()
  const dispatch = useDispatch()
  const detail = useSelector(
    boardingReservationBookDetailDuck.selectors.detail
  )
  const clientDetail = useSelector(clientDetailDuck.selectors.detail)
  const petDetail = useSelector(petDetailDuck.selectors.detail)
  const formErrors = useSelector((state) => getFormErrors(state))
  const [ petsError, setPetsError ] = useState(false)
  const {
    pets = [],
    arriving_date,
    applies_service_type = null,
    applies_location
  } = useSelector((state) =>
    selector(
      state,
      'pets',
      'applies_service_type',
      'applies_location',
      'arriving_date'
    )
  )
  const [ isFirstMount, setIsFirstMount ] = useState(true)
  const editing = Boolean(detail.item.id)

  useEffect(() => {
    if(!arriving_date && !isFirstMount) {
      change('departing_date', '')
      change('departing_time', '')
    } else {
      setIsFirstMount(false)
    }
  }, [ arriving_date ])

  useEffect(() => {
    // for when change location then updated service options
    if(applies_service_type)
      if(
        !detail.form.service_options
          .map(({ value }) => value)
          .includes(applies_service_type)
      ) {
        change('applies_service_type', '')
        change(
          'pets',
          pets.map((pet) => ({
            ...pet,
            applies_reservation_type: '',
            applies_package         : ''
          }))
        )
      }

    return () => {}
  }, [ detail.form.service_options ])

  useEffect(() => {
    if(editing) console.log('editing')
    else
      initialize({
        pets: []
      })

    return () => {}
  }, [])

  useEffect(() => {
    if(pets && pets.length > 0) setPetsError(false)
  }, [ pets ])

  const _handleGetServiceTypes = (value) => {
    dispatch(
      boardingReservationBookDetailDuck.creators.createGetServiceTypesByLocation(
        { location: value, service_group__type: 'B' }
      )
    )
  }

  const _handleGetReservationTypes = (value) => {
    change(
      'pets',
      pets.map((pet) => ({
        ...pet,
        applies_reservation_type: '',
        applies_package         : ''
      }))
    )
    // obtener la lista de los reservation types
    dispatch(
      boardingReservationBookDetailDuck.creators.createGetReservationTypesAndPackagesByService(
        {
          service_id: value
        }
      )
    )
  }

  const _handleShowPetsError = () => {
    const { pets = {} } = formErrors
    if(Array.isArray(pets)) setPetsError(false)
    else setPetsError(true)
  }

  const _handleChangeArrivingTime = (value) => {
    if(!value) change('departing_time', '')
  }

  const _handleFilterSelectedDays = (value, dateType) => {
    if(value) {
      if(dateType === 'arriving_date')
        change(
          'pets',
          pets.map((pet) => ({
            ...pet,
            applies_selected_days: pet.applies_selected_days.filter((selectedDay) =>
              moment(selectedDay).isSameOrAfter(moment(value))
            )
          }))
        )
      else
        change(
          'pets',
          pets.map((pet) => ({
            ...pet,
            applies_selected_days: pet.applies_selected_days.filter((selectedDay) =>
              moment(selectedDay).isSameOrBefore(moment(value))
            )
          }))
        )

      return
    }
    change(
      'pets',
      pets.map((pet) => ({
        ...pet,
        applies_selected_days: []
      }))
    )
  }

  const _handleQuickBook = () => {
    _handleShowPetsError()
    change('submit_mode', 'reserve')
    setTimeout(() => {
      dispatch(submit('boarding-form'))
    }, 500)
  }

  const _handleChangeStep = () => {
    _handleShowPetsError()
    change('submit_mode', 'change')
    setTimeout(() => {
      dispatch(submit('boarding-form'))
    }, 500)
  }

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='boarding-form' onReset={reset} onSubmit={handleSubmit}>
      <Field
        component={FormField}
        control={Input}
        name='submit_mode'
        type='hidden'/>
      <Grid id='boarding-container'>
        <Grid.Column width={16}>
          <Grid columns='equal'>
            <Grid.Column only='large screen'></Grid.Column>
            <Grid.Column largeScreen={12} widescreen={16}>
              {/* First Section Location */}
              <Grid className='mt40'>
                <Header as='h1' color='teal'>
                  Select Location, Service Type, and Pets
                </Header>
                <Grid className='pl40'>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Header className='select-label'>Owner:</Header>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Header className='select-label'>
                        {client && clientDetail.item.id && (
                          <Button
                            as={Link}
                            basic
                            className='client-link'
                            content={`${clientDetail.item.first_name} ${clientDetail.item.last_name}`}
                            to={`/client/${clientDetail.item.id}`}/>
                        )}
                        {pet && petDetail.item.id && (
                          <Button
                            as={Link}
                            basic
                            className='client-link'
                            content={`${petDetail.item.client_first_name} ${petDetail.item.client_last_name}`}
                            to={`/client/${petDetail.item.client_id}`}/>
                        )}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Header className='select-label'>Location:</Header>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Field
                        component={FormField}
                        control={Select}
                        name='applies_location'
                        onChange={_handleGetServiceTypes}
                        options={detail.form.location_options}
                        placeholder='Select Location'
                        required
                        search
                        selectOnBlur={false}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Header className='select-label'>Service Type:</Header>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Field
                        component={FormField}
                        control={Select}
                        disabled={!applies_location}
                        name='applies_service_type'
                        onChange={_handleGetReservationTypes}
                        options={detail.form.service_options}
                        placeholder='Select Service Type'
                        required
                        search
                        selectOnBlur={false}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={13}>
                      <SelectPetsSectionForm {...props}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Header as='h4' className='select-label underline'>
                        On Reservation
                      </Header>
                      {pets
                        && pets.map((pet, index) => {
                          return (
                            <Header as='p' key={index}>
                              {
                                detail.form.pet_options.find(
                                  ({ id }) => id === pet.id
                                ).name
                              }
                            </Header>
                          )
                        })}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider className='w100 mt40'/>
              </Grid>
            </Grid.Column>
            <Grid.Column only='large screen'></Grid.Column>
          </Grid>

          <Grid columns='equal'>
            <Grid.Column only='large screen'></Grid.Column>
            <Grid.Column largeScreen={12} widescreen={16}>
              {/* Second Section Dates */}
              <Grid>
                <Header as='h1' color='teal'>
                  Select Dates
                </Header>
                <Grid className='pl40'>
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column
                      className='flex flex-row align-center'
                      largeScreen={8}
                      tablet={16}>
                      <Header as='h4' className='m0 w30'>
                        Arriving&nbsp;
                      </Header>
                      <Field
                        className='m0'
                        component={FormField}
                        control={Input}
                        name='arriving_date'
                        // eslint-disable-next-line react/jsx-handler-names
                        onChange={value => _handleFilterSelectedDays(value, 'arriving_date')}
                        required
                        type='date'/>
                      <Header as='h4' className='m0'>
                        &nbsp;at&nbsp;
                      </Header>
                      <Field
                        className='m0'
                        component={FormField}
                        control={Input}
                        name='arriving_time'
                        onChange={_handleChangeArrivingTime}
                        required
                        type='time'/>
                    </Grid.Column>
                    <Grid.Column largeScreen={4} tablet={16}>
                      <Field
                        className='checkbox-blue fw700'
                        component={FormField}
                        control={Checkbox}
                        format={Boolean}
                        label='+Special Drop Off'
                        name='is_special_drop_off'
                        type='checkbox'/>
                    </Grid.Column>
                    <Grid.Column largeScreen={4} tablet={16}>
                      <Field
                        className='checkbox-red fw700'
                        component={FormField}
                        control={Checkbox}
                        format={Boolean}
                        label='Add to Waitlist'
                        name='is_waitlist'
                        type='checkbox'/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={3} verticalAlign='middle'>
                    <Grid.Column
                      className='flex flex-row align-center'
                      largeScreen={8}
                      tablet={16}>
                      <Header as='h4' className='m0 w30'>
                        Departing&nbsp;
                      </Header>
                      <Field
                        className='m0'
                        component={FormField}
                        control={Input}
                        disabled={!arriving_date}
                        name='departing_date'
                        // eslint-disable-next-line react/jsx-handler-names
                        onChange={value => _handleFilterSelectedDays(value, 'departing_date')}
                        required
                        type='date'/>
                      <Header as='h4' className='m0'>
                        &nbsp;at&nbsp;
                      </Header>
                      <Field
                        className='m0'
                        component={FormField}
                        control={Input}
                        name='departing_time'
                        required
                        type='time'/>
                    </Grid.Column>
                    <Grid.Column largeScreen={4} tablet={16}>
                      <Field
                        className='checkbox-blue fw700'
                        component={FormField}
                        control={Checkbox}
                        format={Boolean}
                        label='+Special Pick Up'
                        name='is_special_pick_up'
                        type='checkbox'/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider className='w100 mt40'/>
              </Grid>
            </Grid.Column>
            <Grid.Column only='large screen'></Grid.Column>
          </Grid>

          <Grid columns='equal'>
            <Grid.Column only='large screen'></Grid.Column>
            <Grid.Column largeScreen={12} widescreen={16}>
              {/* Third Section Dates */}
              <Grid.Row>
                <Header as='h1' color='teal'>
                  Select Reservation Type and Activity{' '}
                  <span className='required-indicator'>Required</span>
                </Header>
                <Grid className='pl40'>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <FieldArray component={PetList} name='pets'/>
                    </Grid.Column>
                    {pets.length === 0 && (
                      <Grid.Column textAlign='center' width={16}>
                        <Header as='p' className='f24 mv8' color='grey'>
                          PETS NOT SELECTED
                        </Header>
                      </Grid.Column>
                    )}
                    {petsError && (
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <FormError message='Choose at least one pet'/>
                        </Form.Field>
                      </Form.Group>
                    )}
                  </Grid.Row>
                </Grid>
                <Divider className='w100 mt40'/>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column only='large screen'></Grid.Column>
          </Grid>

          <Grid columns='equal'>
            <Grid.Column only='large screen'></Grid.Column>
            <Grid.Column largeScreen={12} widescreen={16}>
              {/* Fourth Section Dates */}
              <Grid>
                <Header as='h1' color='teal'>
                  Assing Acomodations{' '}
                  <span className='required-indicator'>Required</span>
                </Header>
                <Grid className='pl40' container>
                  <Grid.Row>
                    <Grid.Column width={13}>
                      {pets.length !== 1 && (
                        <Grid>
                          <Grid.Column width={9}>
                            <Field
                              className='checkbox-blue fw700'
                              component={FormField}
                              control={Checkbox}
                              disabled={pets.length === 0}
                              format={Boolean}
                              label='Lodge Together'
                              name='is_lodge_together'
                              toggle
                              type='checkbox'/>
                          </Grid.Column>
                          <Grid.Column width={7}>
                            <Field
                              className='checkbox-blue fw700'
                              component={FormField}
                              control={Checkbox}
                              disabled={pets.length === 0}
                              format={Boolean}
                              label='Lodge Separately'
                              name='is_lodge_separately'
                              toggle
                              type='checkbox'/>
                          </Grid.Column>
                        </Grid>
                      )}
                      <Grid verticalAlign='middle'>
                        <Grid.Column width={9}>
                          <Field
                            className='checkbox-blue fw700'
                            component={FormField}
                            control={Checkbox}
                            format={Boolean}
                            label='Assign First Available Of Kennel Type'
                            name='is_available_kennel'
                            toggle
                            type='checkbox'/>
                        </Grid.Column>
                        <Grid.Column width={7}>
                          <Field
                            component={FormField}
                            control={Select}
                            name='applies_kennel_type'
                            options={[]}
                            placeholder='Select Kennel Type'
                            required
                            search
                            selectOnBlur={false}/>
                        </Grid.Column>
                      </Grid>
                      <Grid>
                        <Grid.Column width={6}>
                          <Button color='purple' size='big'>
                            USE KENNEL PICKER
                          </Button>
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <Grid verticalAlign='middle'>
                            <Grid.Column width={6}>
                              <Header as='p' className='select-label mini'>
                                Kennel Assigned:
                              </Header>
                            </Grid.Column>
                            <Grid.Column width={10}>
                              <Field
                                component={FormField}
                                control={Input}
                                name='kennel_id'
                                placeholder='Kennel ID, Type'
                                required/>
                            </Grid.Column>
                          </Grid>
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider className='w100 mt40'/>
              </Grid>
            </Grid.Column>
            <Grid.Column only='large screen'></Grid.Column>
          </Grid>
          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}
          <Grid className='mb20' columns='equal'>
            <Grid.Column only='large screen'></Grid.Column>
            <Grid.Column largeScreen={12} widescreen={16}>
              <Grid className='flex flex-row justify-end'>
                <Button
                  color='green'
                  form='boarding-form'
                  onClick={_handleQuickBook}
                  type='button'>
                  QUICK BOOK:
                  <br/>
                  NO OTHER SERVICES
                </Button>
                <Button color='teal' onClick={_handleChangeStep} type='button'>
                  CONTINUE:
                  <br/>
                  ADD OTHER SERVICES
                </Button>
              </Grid>
            </Grid.Column>
            <Grid.Column only='large screen'></Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Form>
  )
}

export default reduxForm({
  form                    : 'boarding-form',
  destroyOnUnmount        : false,
  forceUnregisterOnUnmount: true,
  validate                : (values) => {
    const schema = {
      applies_location    : Yup.string().required('Location is required'),
      applies_service_type: Yup.string().required('Service Type is required'),
      pets                : Yup.array()
        .min(1, 'Choose at least one pet')
        .of(
          Yup.object().shape(
            {
              applies_reservation_type: Yup.string().required(
                'Reservation Type is required'
              ),
              applies_package      : Yup.string().required('Package is required'),
              applies_frequency    : Yup.string().required('Frequency is required'),
              applies_selected_days: Yup.mixed().when('applies_frequency', {
                is       : 'C',
                then     : Yup.array().min(1, 'Choose at least one day').required('Choose at least one day'),
                otherwise: Yup.mixed()
              })
            },
            [ 'applies_frequency' ]
          )
        ),
      arriving_date: Yup.date()
        .min(
          moment().subtract(1, 'day').toString(),
          'Cannot be less than today'
        )
        .required('Start Date is required'),
      departing_date: Yup.string().when(
        [ 'arriving_date' ],
        (arriving_date, schema) => {
          const { departing_date, arriving_time } = values
          if(departing_date)
            return arriving_time
              ? schema.test(
                'departing_date',
                'Cannot be less than the Arriving Date',
                (value) => {
                  return moment(value).isSameOrAfter(moment(arriving_date))
                }
              )
              : schema.test(
                'departing_date',
                'Cannot be less than the Arriving Date',
                (value) => {
                  return moment(value).isAfter(moment(arriving_date))
                }
              )
          else return schema.required('Departing Date is required')
        }
      ),
      departing_time: Yup.string().when(
        [ 'arriving_date', 'arriving_time', 'departing_date' ],
        (arriving_date, arriving_time, departing_date, schema) => {
          const { departing_time } = values
          if(arriving_date && departing_date && arriving_time)
            return departing_date && departing_time
              ? schema.test(
                'end_time',
                'Cannot be less than 1 hour after the Start Date Time',
                (value) => {
                  if(moment(departing_date).isBefore(moment(arriving_date)))
                    return schema

                  return moment(`${departing_date} ${value}`).isSameOrAfter(
                    moment(
                      `${moment(arriving_date).format(
                        'YYYY-M-DD'
                      )} ${arriving_time}`
                    ).add(1, 'hours')
                  )
                }
              )
              : schema.required('Departing Time is required')
          else return schema
        }
      )
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(BoardingSectionFirst)
