import React, { useEffect } from 'react'

import {
  Checkbox,
  Divider,
  Grid,
  Header,
  Input,
  Select
} from 'semantic-ui-react'
import { PetCard } from '@components/PetCard'
import { Field, formValueSelector } from 'redux-form'
import FormField from '@components/Common/FormField'
import SelectPetsSectionForm from '../../components/SelectPetsSectionForm'
import { useDispatch, useSelector } from 'react-redux'
import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'
import serviceGroups from '@lib/constants/serviceGroups'

const selector = formValueSelector('boarding-form')
const BoardingSectionFirst = (props) => {
  const { change } = props
  const dispatch = useDispatch()
  const detail = useSelector(
    boardingReservationBookDetailDuck.selectors.detail
  )
  const { pets = [], applies_service_type = null, applies_location } = useSelector((state) => selector(state, 'pets', 'applies_service_type', 'applies_location'))

  const _handleGetServiceTypes = (value) => {
    dispatch(
      boardingReservationBookDetailDuck.creators.createGetServiceTypesByLocation(
        { location: value, service_group: serviceGroups.BOARDING }
      )
    )
  }

  useEffect(() => {
    if(applies_service_type)
      if(!detail.form.service_options.map(({ value }) => value).includes(applies_service_type))
        change('applies_service_type','')

    return () => {}
  }, [ detail.form.service_options ])

  return (
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
                          detail.form.pet_options.find(({ id }) => id === pet)
                            .name
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
        <Grid className='mt40'>
          <Header as='h1' color='teal'>
            Select Reservation Type and Activity{' '}
            <span className='required-indicator'>Required</span>
          </Header>
          <Grid className='pl40'>
            <Grid.Column width={13}>
              <Grid>
                <PetCard
                  image_url='/images/pets_img/dog_1.jpg'
                  name='Boots, 45lbs'/>
                <Grid.Column largeScreen={9} widescreen={12}>
                  <Grid>
                    <Grid.Column largeScreen={10} widescreen={16}>
                      <Field
                        component={FormField}
                        control={Select}
                        name='applies_reservation_type'
                        options={[
                          { text: 'Reservation one', value: 1 },
                          { text: 'Reservation two', value: 2 }
                        ]}
                        placeholder='Select Reservation Type'
                        search
                        selectOnBlur={false}/>
                    </Grid.Column>
                    <Grid.Column largeScreen={10} widescreen={16}>
                      <Field
                        component={FormField}
                        control={Select}
                        name='applies_package'
                        options={[
                          { text: 'Package one', value: 1 },
                          { text: 'Package two', value: 2 }
                        ]}
                        placeholder='Select Activity Package'
                        search
                        selectOnBlur={false}/>
                    </Grid.Column>
                    <Grid.Column largeScreen={6} widescreen={16}>
                      <Field
                        component={FormField}
                        control={Select}
                        name='applies_frequency'
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
              <Grid>
                <PetCard
                  image_url='/images/pets_img/dog_3.jpg'
                  name='Sylas, 60lbs'/>
                <Grid.Column largeScreen={9} widescreen={12}>
                  <Grid>
                    <Grid.Column largeScreen={10} widescreen={16}>
                      <Field
                        component={FormField}
                        control={Select}
                        name='applies_reservation_type2'
                        options={[
                          { text: 'Reservation one', value: 1 },
                          { text: 'Reservation two', value: 2 }
                        ]}
                        placeholder='Select Reservation Type'
                        search
                        selectOnBlur={false}/>
                    </Grid.Column>
                    <Grid.Column largeScreen={10} widescreen={16}>
                      <Field
                        component={FormField}
                        control={Select}
                        name='applies_package2'
                        options={[
                          { text: 'Package one', value: 1 },
                          { text: 'Package two', value: 2 }
                        ]}
                        placeholder='Select Activity Package'
                        search
                        selectOnBlur={false}/>
                    </Grid.Column>
                    <Grid.Column largeScreen={6} widescreen={16}>
                      <Field
                        component={FormField}
                        control={Select}
                        name='applies_frequency2'
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
            </Grid.Column>
          </Grid>
          <Divider className='w100 mt40'/>
        </Grid>
        {/* Fourth Section Dates
          <div className='boarding-section'>
            <h1 className='title_test'>
              Assing Acomodations{' '}
              <span className='required-indicator'>Required</span>
            </h1>
            <div className='section-body'>
              <div className='container-row'>
                <InputFront
                  color='blue'
                  label='Lodge Together'
                  type='checkbox'/>
                <InputFront
                  color='blue'
                  label='Lodge Separately'
                  type='checkbox'/>
              </div>
              <div className='container-row'>
                <InputFront
                  color='blue'
                  label='Assign First Available Of Kennel Type'
                  type='checkbox'/>
                <SelectOption
                  className='select-kernel'
                  defaul_option='Select Kennel Type'/>
              </div>
              <div className='container-row'>
                <button className='ui violet button'>Use Kennel Picker</button>
                <div className='container-row'>
                  <p>Kennel Assigned:</p>
                  <SelectOption defaul_option='Kennel ID, Type'/>
                </div>
              </div>
            </div>
          </div>
          */}
      </Grid.Column>
      <Grid.Column only='large screen'></Grid.Column>
    </Grid>
  )
}

export default BoardingSectionFirst
