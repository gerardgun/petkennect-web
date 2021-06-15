import React, { useEffect } from 'react'
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
import { Field, formValueSelector, FieldArray, reduxForm } from 'redux-form'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import PetList from './components/pet-list'
import SelectPetsSectionForm from '../../components/SelectPetsSectionForm'
import serviceGroups from '@lib/constants/serviceGroups'
import { syncValidate } from '@lib/utils/functions'

import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'

import '../../components/styles.scss'

const selector = formValueSelector('boarding-form')

const BoardingSectionFirst = props => {
  const { reset, handleSubmit, initialize, change } = props
  const dispatch = useDispatch()
  const detail = useSelector(
    boardingReservationBookDetailDuck.selectors.detail
  )
  const {
    pets = [],
    applies_service_type = null,
    applies_location
  } = useSelector(state =>
    selector(state, 'pets', 'applies_service_type', 'applies_location')
  )
  const editing = Boolean(detail.item.id)

  const _handleGetServiceTypes = (value) => {
    dispatch(
      boardingReservationBookDetailDuck.creators.createGetServiceTypesByLocation(
        { location: value, service_group: serviceGroups.BOARDING }
      )
    )
  }

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
                  <FieldArray component={PetList} name='pets'/>
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
