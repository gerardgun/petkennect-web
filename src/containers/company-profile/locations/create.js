/* eslint-disable */
import React, { useMemo, useState, useEffect } from 'react'
// import MapPicker from 'react-google-map-picker'
import { useDispatch, connect, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Checkbox, Table, Icon, Label, Divider, Grid, Button, Form, Header, Input, Modal, Select } from 'semantic-ui-react'

import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { googleApiKey } from '@lib/constants'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'
import kennelAreaListConfig from '@lib/constants/list-configs/service/location'
import { TimeAmPm } from './utils'

import locationDuck from '@reducers/location'
import locationDetailDuck from '@reducers/location/detail'
import serviceGroupDuck from '@reducers/service/group'

const social_options = [
  { value: 'youtube',   text: 'Youtube' },
  { value: 'facebook',  text: 'Facebook' },
  { value: 'twitter',   text: 'Twitter' },
  { value: 'instagram', text: 'Instagram' } ]

const LocationCreate = props => {
  const {
    locationDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const dispatch = useDispatch()
  const ServiceList = useSelector(serviceGroupDuck.selectors.list)
  /* eslint-disable-next-line no-unused-vars */
  const [ defaultLocation, setDefaultLocation ] = useState({ lat: 0, lng: 0 })

  const[sundayStart, setSundayStart] = useState('09:00')
  const[sundayEnd, setSundayEnd] = useState('18:00')
  const[mondayStart, setMondayStart] = useState('09:00')
  const[mondayEnd, setMondayEnd] = useState('18:00')
  const[tuesdayStart, setTuesdayStart] = useState('09:00')
  const[tuesdayEnd, setTuesdayEnd] = useState('18:00')
  const[wednesdayStart, setWednesdayStart] = useState('09:00')
  const[wednesdayEnd, setWednesdayEnd] = useState('18:00')
  const[thursdayStart, setThursdayStart] = useState('09:00')
  const[thursdayEnd, setThursdayEnd] = useState('18:00')
  const[fridayStart, setFridayStart] = useState('09:00')
  const[fridayEnd, setFridayEnd] = useState('18:00')
  const[saturdayStart, setSaturdayStart] = useState('09:00')
  const[saturdayEnd, setSaturdayEnd] = useState('18:00')
  const[showEdit, setShowEdit] = useState(true)

  const setStartTimes = (timeStart) =>{
    if(timeStart){
      setSundayStart(timeStart);setMondayStart(timeStart);setTuesdayStart(timeStart);
      setWednesdayStart(timeStart);setThursdayStart(timeStart);setFridayStart(timeStart);setSaturdayStart(timeStart);
    }
  }

  const setEndTimes = (timeEnd) =>{
    if(timeEnd){
      setSundayEnd(timeEnd);setMondayEnd(timeEnd);setTuesdayEnd(timeEnd);
      setWednesdayEnd(timeEnd);setThursdayEnd(timeEnd);setFridayEnd(timeEnd);setSaturdayEnd(timeEnd);
    }
  }

  useEffect(() => {
    if(locationDetail.mode === 'UPDATE')
      setTimeout(() => setDefaultLocation({ lat: parseFloat(locationDetail.item.latitude), lng: parseFloat(locationDetail.item.longitude) }), 500)
    else if(locationDetail.mode === 'CREATE' && navigator.geolocation)
      navigator.geolocation.getCurrentPosition(position => {
        getTimeZone(position.coords.latitude, position.coords.longitude)
        setDefaultLocation({ lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) })
      })
  }, [ locationDetail.mode ])

  const _handleClose = () => {
    props.resetItem()
    reset()
  }

  const getTimeZone = (lat, lng) =>{
    fetch(`http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=petkennect`, { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        if(response)
          props.change('timezone', response.timezoneId)
      })
  }

  /* const _handleChangeLocation = (lat, lng)=> {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + googleApiKey, { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        if(response && response.results && response.results.length > 0)
          props.change('address', response.results[0].formatted_address)

        getTimeZone(lat, lng)
        props.change('latitude', lat.toString())
        props.change('longitude', lng.toString())
        const result = response.results[0].address_components

        if(result[result.length-1].types[0] === 'postal_code'){
          props.change('post_code', result[result.length-1].short_name)
          props.change('country_code', result[result.length-2].short_name)
        }
      })
  }*/

  const _handleAddressChange = value => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&key=' + googleApiKey, { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        if(response && response.results && response.results.length > 0)
        {
          setDefaultLocation({ lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng })

          getTimeZone(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng)
          props.change('latitude', response.results[0].geometry.location.lat.toString())
          props.change('longitude', response.results[0].geometry.location.lng.toString())

          const result = response.results[0].address_components
          if(result[result.length - 1].types[0] === 'postal_code' && result[result.length - 2].short_name === 'US') {
            props.change('post_code', result[result.length - 1].short_name)
            props.change('country_code', result[result.length - 2].short_name)
          } else if(result[result.length - 1].types[0] === 'postal_code_suffix' && result[result.length - 3].short_name === 'US') {
            props.change('post_code', result[result.length - 2].short_name)
            props.change('country_code', result[result.length - 3].short_name)
          } else {
            props.change('post_code', '')
            props.change('country_code', '')
          }
        }
      })
  }

  /* const _handlePositionOptionChange = value => {
    const { timezone, latitude, longitude, addresses } = location.items.find(({ id }) => id === value)

    setDefaultLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) })

    props.change('timezone', timezone)
    props.change('latitude', latitude)
    props.change('longitude', longitude)
    props.change('address', addresses[0])
  }*/

  const _handleSubmit = values => {
    const event_dates = [{id:1, start: mondayStart,    end: mondayEnd},
                         {id:2, start: tuesdayStart,   end: tuesdayEnd},
                         {id:3, start: wednesdayStart, end: wednesdayEnd},
                         {id:4, start: thursdayStart,  end: thursdayEnd},
                         {id:5, start: fridayStart,    end: fridayEnd},
                         {id:6, start: saturdayStart,  end: saturdayEnd},
                         {id:7, start: sundayStart,    end: sundayEnd}]

    const { first_name, last_name, email_address, phone_number, 
            fax_number, media_site, media_url, ...rest } = parseFormValues(values)

    const new_location = { ...rest,
      contact_people      : [ {
        first_name  : first_name,
        last_name   : last_name,
        email       : email_address,
        phone_type  : 'cell',
        phone_number: phone_number,
        fax_number  : fax_number } ],
      social_networks: [ {
        type: media_site,
        url : media_url
      } ],
      dates: event_dates
    }
    console.log(new_location)
    if(typeof values.description === 'string' && !values.description.trim())
      delete values.description

    if(isUpdating)
      return props.put({ id: locationDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post(new_location)
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(locationDetail.item.id)
  const isOpened = useMemo(() => {
    return locationDetail.mode === 'CREATE' || locationDetail.mode === 'UPDATE'
  }, [ locationDetail.mode ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'New'} Location</Header>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)} >
          <Field component='input' name='latitude' type='hidden'/>
          <Field component='input' name='longitude' type='hidden'/>
          <Field component='input' name='post_code' type='hidden'/>

          <Grid>
            <Grid.Row>
              <Grid.Column width='4'>
                <p>Location Codes</p>
                <Divider className='mv4'/>
              </Grid.Column>
              <Grid.Column width='4'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='code'
                  placeholder='Enter Store Code'
                  required/>
              </Grid.Column>
              <Grid.Column width='4'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='region_code'
                  placeholder='Enter Region code'
                  required/>
              </Grid.Column>
              <Grid.Column width='4'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='country_code'
                  placeholder='Enter Country code'
                  readOnly
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid>
            <Grid.Row>
              <Grid.Column width='4'>
                <p>Business name</p>
                <Divider className='mv4'/>
              </Grid.Column>
              <Grid.Column width='12'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='name'
                  placeholder='Enter Company Name'
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid>
            <Grid.Row>
              <Grid.Column width='4'>
                <p>Address</p>
                <Divider className='mv4'/>
              </Grid.Column>
              <Grid.Column width='12'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='address'
                  onChange={_handleAddressChange}
                  placeholder='Enter Street Address, City,State, Zip, Country'
                  required/>
                {/* <MapPicker
                  apiKey={googleApiKey}
                  className='mapicker hidemap'
                  defaultLocation={defaultLocation}
                  onChangeLocation={_handleChangeLocation}
                  style={{ height: '300px' }}
                  zoom={17}/>
                <Button
                  type='button'
                  size='mini'
                  onClick={_handleShowMap}>select map</Button>*/}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid>
            <Grid.Row>
              <Grid.Column width='4'>
                <p>Contact Information</p>
                <Divider className='mv4'/>
              </Grid.Column>
              <Grid.Column width='4'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='first_name'
                  placeholder='Enter First Name'
                  required/>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='phone_number'
                  placeholder='Enter Phone Number'
                  required
                  type='number'/>
              </Grid.Column>
              <Grid.Column width='4'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='last_name'
                  placeholder='Enter Last Name'
                  required/>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='fax_number'
                  placeholder='Enter Fax Number'
                  required
                  type='number'/>
              </Grid.Column>
              <Grid.Column width='4'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='email_address'
                  placeholder='Enter Email Address'
                  required
                  type='email'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid>
            <Grid.Row>
              <Grid.Column width='4'>
                <p>Social Media</p>
                <Divider className='mv4'/>
              </Grid.Column>
              <Grid.Column width='4'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Select}
                  name='media_site'
                  options={social_options}
                  placeholder='Select Site'
                  required
                  selectOnBlur={false}/>
              </Grid.Column>
              <Grid.Column width='8'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='media_url'
                  placeholder='Enter URL'
                  required
                  type='url'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid>
            <Grid.Row>
              <Grid.Column width='4'>
                <p>Services and Taxes</p>
                <Divider className='mv4'/>
              </Grid.Column>
              <Grid.Column width='12'>
                {console.log('Hereeeeeeeeeeee',ServiceList)}
                {isUpdating ? 
                <Table>
                </Table>:
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Service</Table.HeaderCell>
                      <Table.HeaderCell>Enable</Table.HeaderCell>
                      <Table.HeaderCell>Taxable</Table.HeaderCell>
                      <Table.HeaderCell>Tax Rate</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                  {ServiceList.items.map((item,index)=>{
                  return(
                    <Table.Row>
                      <Table.Cell>
                        {item.name}
                        <Field
                        component='input'
                        name={`services[${index}].service_group_id`}
                        defaultValue={item.id}
                        hidden/>
                      </Table.Cell>
                      <Table.Cell>
                        <Field
                        autoComplete='off'
                        component={FormField}
                        control={Checkbox}
                        name={`services[${index}].is_active`}
                        defaultValue={true}/>
                      </Table.Cell>
                      <Table.Cell>
                        <Field
                        autoComplete='off'
                        component={FormField}
                        control={Checkbox}
                        name={`services[${index}].is_taxable`}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Field
                        autoComplete='off'
                        component={FormField}
                        control={Input}
                        placeholder='0'
                        name={`services[${index}].tax_percentage`}
                        readOnly
                        required/>
                      </Table.Cell>
                    </Table.Row>
                    )})}
                  </Table.Body>
                </Table>}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Row>
              <Grid.Column width='4'>
                <p>Hours</p>
              </Grid.Column>
              <Grid.Column width='12'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  label='Time Zone'
                  name='timezone'
                  placeholder='Enter timezone'
                  readOnly
                  required/>

              
                <Grid>
                  <Grid.Row>
                    <Grid.Column width='7'>
                      <div className='day-hours'>
                        <p>Sunday</p>
                        <div className='input-hours'>
                          <Input type='time' min="00:00" max="11:00"
                            value={sundayStart}
                            onChange={(e) => setSundayStart(e.target.value)} 
                            disabled={showEdit}/>
                          <p> to </p>
                          <Input type='time' min="12:00" max="23:00"
                            value={sundayEnd}
                            onChange={(e) => setSundayEnd(e.target.value)}
                            disabled={showEdit}/>
                        </div>
                      </div>

                      <div className='day-hours'>
                        <p>Monday</p>
                        <div className='input-hours'>
                          <Input type='time' min="00:00" max="11:00"
                            value={mondayStart}
                            onChange={(e) => setMondayStart(e.target.value)}
                            disabled={showEdit}/>
                          <p> to </p>
                          <Input type='time' min="12:00" max="23:00"
                            value={mondayEnd}
                            onChange={(e) => setMondayEnd(e.target.value)}
                            disabled={showEdit}/>
                        </div>
                      </div>

                      <div className='day-hours'>
                        <p>Tuesday</p>
                        <div className='input-hours'>
                          <Input type='time' min="00:00" max="11:00"
                            value={tuesdayStart}
                            onChange={(e) => setTuesdayStart(e.target.value)} 
                            disabled={showEdit}/>
                          <p> to </p>
                          <Input type='time' min="12:00" max="23:00"
                            value={tuesdayEnd}
                            onChange={(e) => setTuesdayEnd(e.target.value)} 
                            disabled={showEdit}/>
                        </div>
                      </div>

                      <div className='day-hours'>
                        <p>Wednesday</p>
                        <div className='input-hours'>
                          <Input type='time' min="00:00" max="11:00"
                            value={wednesdayStart}
                            onChange={(e) => setWednesdayStart(e.target.value)} 
                            disabled={showEdit}/>
                          <p> to </p>
                          <Input type='time' min="12:00" max="23:00"
                            value={wednesdayEnd}
                            onChange={(e) => setWednesdayEnd(e.target.value)} 
                            disabled={showEdit}/>
                        </div>
                      </div>

                      <div className='day-hours'>
                        <p>Thursday</p>
                        <div className='input-hours'>
                          <Input type='time' min="00:00" max="11:00"
                            value={thursdayStart}
                            onChange={(e) => setThursdayStart(e.target.value)} 
                            disabled={showEdit}/>
                          <p> to </p>
                          <Input type='time' min="12:00" max="23:00"
                            value={thursdayEnd}
                            onChange={(e) => setThursdayEnd(e.target.value)} 
                            disabled={showEdit}/>
                        </div>
                      </div>

                      <div className='day-hours'>
                        <p>Friday</p>
                        <div className='input-hours'>
                          <Input type='time' min="00:00" max="11:00"
                            value={fridayStart} 
                            onChange={(e) => setFridayStart(e.target.value)} 
                            disabled={showEdit}/>
                          <p> to </p>
                          <Input type='time' min="12:00" max="23:00" 
                            value={fridayEnd}
                            onChange={(e) => setFridayEnd(e.target.value)} 
                            disabled={showEdit}/>
                        </div>
                      </div>

                      <div className='day-hours'>
                        <p>Saturday</p>
                        <div className='input-hours'>
                          <Input type='time' min="00:00" max="11:00" 
                            value={saturdayStart}
                            onChange={(e) => setSaturdayStart(e.target.value)} 
                            disabled={showEdit}/>
                          <p> to </p>
                          <Input type='time' min="12:00" max="23:00" 
                            value={saturdayEnd}
                            onChange={(e) => setSaturdayEnd(e.target.value)} 
                            disabled={showEdit}/>
                        </div>
                      </div>
                    </Grid.Column>
                    <Grid.Column width='2'>
                      {showEdit ? 
                        <Icon name='edit outline' size='large' onClick={()=>setShowEdit(false)}/>:
                        <>
                        <Icon name='copy outline' color='blue' size='large' onClick={() => {setStartTimes(sundayStart);setEndTimes(sundayEnd)}}/>
                        <Icon name='close' color='red' size='large' onClick={() => setShowEdit(true)}/>
                        </>}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider/>
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
            <Form.Field>
              <Button
                basic
                className='w120'
                color='red'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const locationDetail = locationDetailDuck.selectors.detail(state)
      const initialValues = { post_code    : locationDetail.item.zip && locationDetail.item.zip.postal_code,
        region_code  : locationDetail.item.zip && locationDetail.item.zip.state_code,
        country_code : locationDetail.item.zip && locationDetail.item.zip.country_code,
        first_name   : locationDetail.item.contact_people && locationDetail.item.contact_people[0].first_name,
        last_name    : locationDetail.item.contact_people && locationDetail.item.contact_people[0].last_name,
        email_address: locationDetail.item.contact_people && locationDetail.item.contact_people[0].email,
        phone_number : locationDetail.item.contact_people && locationDetail.item.contact_people[0].phone_number,
        fax_number   : locationDetail.item.contact_people && locationDetail.item.contact_people[0].fax_number,
        media_site   : locationDetail.item.social_networks && locationDetail.item.social_networks[0].type,
        media_url    : locationDetail.item.social_networks && locationDetail.item.social_networks[0].url,
        ...locationDetail.item }

      return {
        locationDetail,
        initialValues
      }
    },
    {
      post     : locationDetailDuck.creators.post,
      put      : locationDetailDuck.creators.put,
      resetItem: locationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'location-form',
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name         : Yup.string().required('Company name is required'),
        code         : Yup.string().required('Store Code is required'),
        address      : Yup.string().required('Address is required'),
        timezone     : Yup.string().required('Timezone is required'),
        region_code  : Yup.string().required('Region Code is required'),
        first_name   : Yup.string().required('First name is required'),
        last_name    : Yup.string().required('Last name is required'),
        phone_number : Yup.string().required('Phone number is required'),
        fax_number   : Yup.string().required('Fax number is required'),
        email_address: Yup.string().required('Email is required'),
        media_site   : Yup.string().required('Media Site is required'),
        media_url    : Yup.string().required('Url is Required'),
        post_code    : Yup.string().required('Enter a valid Street'),
        country_code : Yup.string().required('Country Code is Required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(LocationCreate)
/* eslint-enable */
