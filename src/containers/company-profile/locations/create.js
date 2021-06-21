import React, { useMemo, useState, useEffect } from 'react'
import MapPicker from 'react-google-map-picker'
import { useDispatch, connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Divider, Grid, Button, Form, Header, Input, Modal, Select } from 'semantic-ui-react'

import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import Table from '@components/Table'
import { googleApiKey } from '@lib/constants'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'
import kennelAreaListConfig from '@lib/constants/list-configs/service/location'

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
    // location,
    ServiceList,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const dispatch = useDispatch()

  useEffect(() => {
    if(ServiceList.items.length === 0)
      dispatch(
        serviceGroupDuck.creators.get()
      )
  }, [])

  const [ defaultLocation, setDefaultLocation ] = useState({ lat: 0, lng: 0 })

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

  const _handleShowMap = () =>{
    const map = document.getElementsByClassName('mapicker')
    map[0].classList.toggle('hidemap')
  }

  const getTimeZone = (lat, lng) =>{
    fetch(`http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=petkennect`, { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        if(response)
          props.change('timezone', response.timezoneId)
      })
  }

  const _handleChangeLocation = (lat, lng)=> {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + googleApiKey, { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        if(response && response.results && response.results.length > 0)
          props.change('address', response.results[0].formatted_address)

        getTimeZone(lat, lng)
        props.change('latitude', lat.toString())
        props.change('longitude', lng.toString())
      })
  }

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
    const { first_name, last_name,
      email_address, phone_number,
      fax_number, media_site, media_url, ...rest } = parseFormValues(values)
    values = { ...rest,
      employee_schedule_id: 1,
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
      } ]
    }

    if(typeof values.description === 'string' && !values.description.trim())
      delete values.description

    if(isUpdating)
      return props.put({ id: locationDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post(values)
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(locationDetail.item.id)
  const isOpened = useMemo(() => {
    return locationDetail.mode === 'CREATE' || locationDetail.mode === 'UPDATE'
  }, [ locationDetail.mode ])

  /* const locationOptions = useMemo(() => {
    return location.items.map(item => ({
      key  : item.id,
      value: item.id,
      text : (
        <span>
          {item.name} <span style={{ color: 'grey', marginLeft: '0.3rem' }}>{item.code}</span>
        </span>
      )
    }))
  }, [ location.status ])*/

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'New'} Location</Header>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Field component='input' name='latitude' type='hidden'/>
          <Field component='input' name='longitude' type='hidden'/>

          <Grid>
            <Grid.Row>
              <Grid.Column width='4'>
                <p>Location Codes</p>
                <Divider className='mv4'/>
              </Grid.Column>
              <Grid.Column width='6'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='code'
                  placeholder='Enter Store Code'
                  required/>
              </Grid.Column>
              <Grid.Column width='6'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='zip_code'
                  placeholder='Enter Region code'
                  required
                  type='number'/>
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
              <Grid.Column textAlign='right' width='12'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='address'
                  onChange={_handleAddressChange}
                  placeholder='Enter Street Address, City,State, Zip, Country'
                  required/>
                <p className='select_map' onClick={_handleShowMap()}>select map</p>
                <MapPicker
                  apiKey={googleApiKey}
                  className='mapicker hidemap'
                  defaultLocation={defaultLocation}
                  onChangeLocation={_handleChangeLocation}
                  style={{ height: '300px' }}
                  zoom={17}/>
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
                <p>Website</p>
                <Divider className='mv4'/>
              </Grid.Column>
              <Grid.Column width='12'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  name='website'
                  placeholder='Enter Website URL'
                  required/>
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
                  required/>
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
                <Table
                  config={kennelAreaListConfig}
                  duck={serviceGroupDuck}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid>
            <Grid.Row>
              <Grid.Column width='4'>
                <p>Services and Taxes</p>
              </Grid.Column>
              <Grid.Column width='4'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Input}
                  label='Time Zone'
                  name='timezone'
                  placeholder='Enter timezone'
                  readOnly
                  required/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {/* <Form.Group widths={3}>
            <Field
              autoComplete='off'
              component={FormField}
              control={Input}
              label='Code'
              name='code'
              placeholder='Enter code'
              required/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Input}
              label='Name'
              name='name'
              placeholder='Enter name'
              required/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Input}
              label='Time Zone'
              name='timezone'
              placeholder='Enter timezone'
              readOnly
            required/>
          </Form.Group>*/}
          {/*
            locationDetail.mode === 'CREATE' && (
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Copy Position From'
                  name='copy_position_from'
                  onChange={_handlePositionOptionChange}
                  options={locationOptions}
                  placeholder='Select a location to copy his geolocation information'
                  search
                  selectOnBlur={false}/>
              </Form.Group>
            )
          }
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Input}
              label='Address'
              name='address'
              onChange={_handleAddressChange}
              placeholder='Enter address'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={TextArea}
              label='Description'
              name='description'
              placeholder='Enter description'/>
            </Form.Group>*/}
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
                color='teal'
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
      const location = locationDuck.selectors.list(state)
      const ServiceList = serviceGroupDuck.selectors.list(state)
      const initialValues = { ...locationDetail.item }

      return {
        locationDetail,
        location,
        ServiceList,
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
        zip_code     : Yup.string().required('Region Code is required'),
        address      : Yup.string().required('Address is required'),
        timezone     : Yup.string().required('Timezone is required'),
        region_code  : Yup.string().required('Region Code is required'),
        phone_number : Yup.string().required('Phone number is required'),
        fax_number   : Yup.string().required('Fax number is required'),
        email_address: Yup.string().required('Email is required'),
        website      : Yup.string().required('Website is required'),
        media_site   : Yup.string().required('Media Site is required'),
        media_url    : Yup.string().required('Url is Required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(LocationCreate)
