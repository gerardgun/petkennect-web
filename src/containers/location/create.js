import React, { useMemo,useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input,Select, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import MapPicker from 'react-google-map-picker'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import locationDuck from '@reducers/location'
import locationDetailDuck from '@reducers/location/detail'

import { googleApiKey } from '@lib/constants'

const LocationCreate = props => {
  const {
    locationDetail,
    location,
    googleMapApiKey,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const [ defaultLocation, setDefaultLocation ] = useState({ lat: '', lng: '' })

  useEffect(() => {
    props.getLocations()
  }, [])

  useEffect(() => {
    if(isUpdating)

      setTimeout(() => {
        setDefaultLocation({ lat: parseFloat(locationDetail.item.latitude), lng: parseFloat(locationDetail.item.longitude) })
      }, 1000)

    else
    if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function(position) {
        getTimeZone(position.coords.latitude,position.coords.longitude,position.timestamp)
        setDefaultLocation({ lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) })
      })
  }, [ locationDetail ])

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => {
    props.resetItem()
    reset()
  }

  const getTimeZone = (lat, lng,timestamp) =>{
    fetch('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lng + '&timestamp=' + timestamp + '&key=' + googleMapApiKey, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        if(response)
          props.change('timezone', response.timeZoneId)
      })
  }

  const _handleChangeLocation = (lat, lng)=> {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + googleMapApiKey, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        if(response && response.results && response.results.length > 0)
          props.change('addresses', response.results[0].formatted_address)

        props.change('timezone', 'America/New_York')

        props.change('latitude', lat)

        props.change('longitude', lng)

        props.change('code','IGFEGIJ1VUV')
      })
  }

  const _handleAddressChange = value=>
  {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + value + '&key=' + googleMapApiKey, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        if(response && response.results && response.results.length > 0)
        {
          setDefaultLocation({ lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng })
          props.change('timezone', 'America/New_York')
          props.change('latitude', response.results[0].geometry.location.lat)
          props.change('longitude', response.results[0].geometry.location.lng)
          props.change('code','IGFEGIJ1VUV')
        }
      })
  }

  const _handlePositionOptionChange = (value) => {
    const _location = location.items.find(_location => _location.id === value)
    if(_location)
    {
      setDefaultLocation({ lat: parseFloat(_location.latitude), lng: parseFloat(_location.longitude) })
      props.change('timezone',_location.timezone)
      props.change('latitude', _location.latitude)
      props.change('longitude', _location.longitude)
      props.change('addresses', _location.addresses)
      props.change('code','IGFEGIJ1VUV')
    }
  }

  const _handleSubmit = values => {
    let finalValues = Object.entries(values)
      .filter(([ , value ]) => value !== null)
      .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

    if(isUpdating)
      return props.put({ id: locationDetail.item.id, ...finalValues })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post(finalValues)
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(locationDetail.item.id)

  const isOpened = useMemo(() => getIsOpened(locationDetail.mode), [ locationDetail.mode ])

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
          <Field
            component='input' name='latitude' type='hidden'/>
          <Field
            component='input' name='longitude' type='hidden'/>
          <Field
            component='input' name='code' type='hidden'/>
          <Form.Group widths='equal'>
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
              readOnly/>
          </Form.Group>
          {!isUpdating && (
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                hidden={isUpdating ? true : false}
                label='Copy Position From'
                name='copy_position_from'
                onChange={_handlePositionOptionChange}
                options={location.items.map((_location) => ({
                  key  : _location.id,
                  value: _location.id,
                  text : `${_location.name}`
                }))}
                placeholder='Select an option'
                search
                selectOnBlur={false}/>
              <Form.Field/>
            </Form.Group>
          )}
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Input}
              label='Address'
              name='addresses'
              onChange={_handleAddressChange}
              placeholder='Enter address'/>
          </Form.Group>

          <MapPicker
            apiKey={googleMapApiKey}
            defaultLocation={defaultLocation}
            onChangeLocation={_handleChangeLocation}
            style={{ height: '300px' }}
            zoom={10}/>
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
      const  location     = locationDuck.selectors.list(state)
      const initialValues = { ...locationDetail.item }
      const googleMapApiKey = googleApiKey

      return {
        locationDetail,
        location,
        googleMapApiKey,
        initialValues
      }
    },
    {
      post        : locationDetailDuck.creators.post,
      put         : locationDetailDuck.creators.put,
      getLocations: locationDuck.creators.get,
      resetItem   : locationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'location-form',
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        addresses: Yup.string().required('Address is required'),
        name     : YupFields.name
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(LocationCreate)
