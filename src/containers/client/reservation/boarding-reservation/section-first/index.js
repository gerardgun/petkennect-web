import React, { useEffect } from 'react'

import {
  Button,
  Checkbox,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Select
} from 'semantic-ui-react'
import * as Yup from 'yup'
import { Field, formValueSelector, FieldArray, reduxForm } from 'redux-form'
import FormField from '@components/Common/FormField'
import SelectPetsSectionForm from '../../components/SelectPetsSectionForm'
import { useDispatch, useSelector } from 'react-redux'
import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'
import serviceGroups from '@lib/constants/serviceGroups'
import '../../components/styles.scss'
import { syncValidate } from '@lib/utils/functions'

const selector = formValueSelector('boarding-form')
const BoardingSectionFirst = (props) => {
  const { reset, handleSubmit, initialize, change } = props
  const detail = useSelector(
    boardingReservationBookDetailDuck.selectors.detail
  )
  const editing = Boolean(detail.item.id)
  const dispatch = useDispatch()
  const {
    pets = [],
    applies_service_type = null,
    applies_location
  } = useSelector((state) =>
    selector(state, 'pets', 'applies_service_type', 'applies_location')
  )

  const _handleGetServiceTypes = (value) => {
    dispatch(
      boardingReservationBookDetailDuck.creators.createGetServiceTypesByLocation(
        { location: value, service_group: serviceGroups.BOARDING }
      )
    )
  }
  console.log(pets, 'PETS')
  useEffect(() => {
    if(applies_service_type)
      if(
        !detail.form.service_options
          .map(({ value }) => value)
          .includes(applies_service_type)
      )
        change('applies_service_type', '')

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

  const renderPets = ({ fields }) => {
    return (
      <>
        <button
          // eslint-disable-next-line react/jsx-handler-names
          onClick={() =>
            fields.push({
              id            : 4,
              image_filepath:
                'https://petkennect-collection.s3.us-east-2.amazonaws.com/a94439d1-947c-4371-a77e-d32c953e9b84_aa858121.png',
              applies_reservation_type: '', applies_package: '', applies_frequency: ''
            })
          }>
          ADD
        </button>
        {fields.map((item, index) => (
          <Grid key={index}>
            <Grid.Column largeScreen={7} tablet={6}>
              <Grid>
                <Grid.Column width={6}>
                  <Field
                    component={({ input }) => (
                      <Image
                        centered
                        circular
                        className='pet-avatar'
                        src={input.value}/>
                    )}
                    name={`${item}.image_filepath`}/>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Header as='p' className='m0'>
                    {item.name}
                  </Header>
                  <Header as='p' className='m0 fw400 f16'>
                    {item.breed_name}
                  </Header>
                  <Grid className='flex flex-row m0'>
                    <Icon className='p0 f16' color='teal' name='medkit'/>
                    <Icon className='p0 f16' color='blue' name='mars'/>
                    <i
                      aria-hidden='true'
                      className='p0 f16 mr4'
                      style={{ color: '#51b6ae' }}>
                      <svg
                        fill='currentColor'
                        height='1em'
                        stroke='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 24 24'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='M4.929,19.081c1.895,1.895,4.405,2.938,7.071,2.938s5.177-1.043,7.071-2.938c3.899-3.899,3.899-10.243,0-14.143 C17.177,3.044,14.665,2,12,2S6.823,3.044,4.929,4.938C1.03,8.837,1.03,15.182,4.929,19.081z M17.657,17.667 c-1.069,1.069-2.385,1.791-3.813,2.129c-0.009-1.602,0.586-3.146,1.691-4.251c1.163-1.163,2.732-1.828,4.277-1.851 C19.501,15.15,18.786,16.538,17.657,17.667z M19.982,11.702c-2.124-0.021-4.284,0.853-5.861,2.429 c-1.532,1.532-2.327,3.68-2.263,5.881c-2.079-0.036-4.033-0.862-5.516-2.345c-1.522-1.523-2.296-3.512-2.332-5.512 c0.077,0.002,0.154,0.014,0.231,0.014c2.115,0,4.16-0.804,5.637-2.28c1.58-1.58,2.457-3.739,2.43-5.873 c2.015,0.076,3.906,0.895,5.349,2.337C19.139,7.834,19.907,9.757,19.982,11.702z M6.343,6.353c1.108-1.108,2.482-1.849,3.973-2.169 c-0.018,1.555-0.685,3.124-1.851,4.291c-1.104,1.103-2.642,1.696-4.238,1.691C4.555,8.769,5.255,7.44,6.343,6.353z'></path>
                      </svg>
                    </i>
                    <Icon
                      className='p0 f16'
                      color='teal'
                      name='map marker alternate'/>
                  </Grid>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column largeScreen={9} tablet={10}>
              <Grid>
                <Grid.Column largeScreen={10} tablet={16}>
                  <Field
                    component={FormField}
                    control={Select}
                    name={`${item}.applies_reservation_type`}
                    options={[
                      { text: 'Reservation one', value: 1 },
                      { text: 'Reservation two', value: 2 }
                    ]}
                    placeholder='Select Reservation Type'
                    search
                    selectOnBlur={false}/>
                </Grid.Column>
                <Grid.Column largeScreen={10}>
                  <Field
                    component={FormField}
                    control={Select}
                    name={`${item}.applies_package`}
                    options={[
                      { text: 'Package one', value: 1 },
                      { text: 'Package two', value: 2 }
                    ]}
                    placeholder='Select Activity Package'
                    search
                    selectOnBlur={false}/>
                </Grid.Column>
                <Grid.Column largeScreen={6}>
                  <Field
                    component={FormField}
                    control={Select}
                    name={`${item}.applies_frequency`}
                    options={[
                      { text: 'Frequency one', value: 1 },
                      { text: 'Frequency two', value: 2 }
                    ]}
                    placeholder='Frequency'
                    search
                    selectOnBlur={false}/>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Divider className='w100'/>
          </Grid>
        ))}
      </>
    )
  }

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form id='boarding-form' onReset={reset} onSubmit={handleSubmit}>
      <Grid columns='equal' id='boarding-container'>
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
                    Devika Christie | 314-7572054
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
          {/* Second Section Dates */}
          <Grid className='mt40'>
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
                    name='departing_date'
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
          {/* Third Section Dates */}
          <Grid.Row className='mt40'>
            <Header as='h1' color='teal'>
              Select Reservation Type and Activity{' '}
              <span className='required-indicator'>Required</span>
            </Header>
            <Grid className='pl40'>
              <Grid.Row>
                <Grid.Column largeScreen={13} tablet={16}>
                  <FieldArray component={renderPets} name='pets'/>
                </Grid.Column>
                {pets.length === 0 && (
                  <Grid.Column textAlign='center' width={16}>
                    <Header as='p' className='f24 mv8' color='grey'>
                      PETS NOT SELECTED
                    </Header>
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
            <Divider className='w100 mt40'/>
          </Grid.Row>
          {/* Fourth Section Dates */}
          <Grid className='mt40'>
            <Header as='h1' color='teal'>
              Assing Acomodations{' '}
              <span className='required-indicator'>Required</span>
            </Header>
            <Grid className='pl40' container>
              <Grid.Row>
                <Grid.Column width={13}>
                  <Grid>
                    <Grid.Column width={9}>
                      <Field
                        className='checkbox-blue fw700'
                        component={FormField}
                        control={Checkbox}
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
                        format={Boolean}
                        label='Lodge Separately'
                        name='is_lodge_separately'
                        toggle
                        type='checkbox'/>
                    </Grid.Column>
                  </Grid>
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
                          <Header as='p' className='select-label mini'>Kennel Assigned:</Header>
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
          <Grid className='mb20' columns='equal'>
            <Grid.Column only='large screen'></Grid.Column>
            <Grid.Column largeScreen={12} widescreen={16}>
              <Grid className='flex flex-row justify-end'>
                <Button color='green' form='boarding-form' type='submit'>
                  QUICK BOOK:
                  <br/>
                  NO OTHER SERVICES
                </Button>
                {/* eslint-disable-next-line react/jsx-handler-names*/}
                <Button color='teal'>
                  CONTINUE:
                  <br/>
                  ADD OTHER SERVICES
                </Button>
              </Grid>
            </Grid.Column>
            <Grid.Column only='large screen'></Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column only='large screen'></Grid.Column>
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
      applies_service_type: Yup.string().required('Service Type is required')
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(BoardingSectionFirst)
