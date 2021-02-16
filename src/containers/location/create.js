import React, { useMemo, useState, useEffect } from 'react'
import MapPicker from 'react-google-map-picker'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select, TextArea } from 'semantic-ui-react'
import _get from 'lodash/get'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { googleApiKey } from '@lib/constants'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'

import locationDuck from '@reducers/location'
import locationDetailDuck from '@reducers/location/detail'

const LocationCreate = props => {
  const {
    locationDetail,
    location,
    error, handleSubmit, reset, submitting // redux-form
  } = props

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
        props.change('latitude', lat)
        props.change('longitude', lng)
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
          props.change('latitude', response.results[0].geometry.location.lat)
          props.change('longitude', response.results[0].geometry.location.lng)
        }
      })
  }

  const _handlePositionOptionChange = value => {
    const { timezone, latitude, longitude, addresses } = location.items.find(({ id }) => id === value)

    setDefaultLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) })

    props.change('timezone', timezone)
    props.change('latitude', latitude)
    props.change('longitude', longitude)
    props.change('address', addresses[0])
  }

  const _handleSubmit = values => {
    const { address, ...rest } = parseFormValues(values)
    values = { ...rest, addresses: [ address ] }

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
  const locationOptions = useMemo(() => {
    return location.items.map(item => ({
      key  : item.id,
      value: item.id,
      text : (
        <span>
          {item.name} <span style={{ color: 'grey', marginLeft: '0.3rem' }}>{item.code}</span>
        </span>
      )
    }))
  }, [ location.status ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'New'} Location</Header>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Field component='input' name='latitude' type='hidden'/>
          <Field component='input' name='longitude' type='hidden'/>
          <Form.Group widths={3}>
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
          </Form.Group>
          {
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
          </Form.Group>
          <MapPicker
            apiKey={googleApiKey}
            defaultLocation={defaultLocation}
            onChangeLocation={_handleChangeLocation}
            style={{ height: '300px' }}
            zoom={17}/>

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
      const initialValues = { ...locationDetail.item, address: _get(locationDetail.item, 'addresses[0]', '') }

      return {
        locationDetail,
        location,
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
        code    : Yup.string().required('Code is required'),
        name    : Yup.string().required('Name is required'),
        timezone: Yup.string().required('Timezone is required'),
        address : Yup.string().required('Address is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(LocationCreate)
