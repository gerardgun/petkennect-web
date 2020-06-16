import React, { useEffect } from 'react'
import { Header, Tab, Form } from 'semantic-ui-react'
import './styles.scss'
import { Field, reduxForm } from 'redux-form'
import { syncValidate } from '@lib/utils/functions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup'
import YupFields from '@lib/constants/yup-fields'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import InputFile from '@components/Common/InputFile'

import clientDetailDuck from '@reducers/client/detail'
import locationDuck from '@reducers/location'
import rolDuck from '@reducers/rol'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

import useZipInputSearch from '@components/useZipInputSearch'

function TabClientInfo(props) {
  const {
    location,
    zip,
    zipDetail,
    error,
    handleSubmit,
    reset
  } = props

  const [ zipOptions, { _handleZipChange, _handleZipSearchChange } ] = useZipInputSearch(zip, zipDetail, props.getZipes, props.setZip)

  useEffect(() => {
    props.getLocations()
  }, [])

  return (
    <Tab.Pane className='border-none'>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>
        <Field component='input' name='id' type='hidden'/>
        <Field component='input' name='user' type='hidden'/>
        <Header as='h4' className='form-section-header ' color='blue'>BASIC INFORMATION</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Email *'
            name='email'
            placeholder='Enter email'
            readOnly/>

          <Field
            component={FormField}
            control={Form.Input}
            label='Name *'
            name='first_name'
            placeholder='Enter name'
            readOnly/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Lastname'
            name='last_name'
            placeholder='Enter lastname'
            readOnly/>
        </Form.Group>
        <Form.Group widths='equal'>
          <InputFile
            change={props.change} label='Profile picture' name='profile_picture'
            onlyImage placeholder='Upload image'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Contact date *'
            name='contact_date'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Location'
            name='contact_location_id'
            options={location.items.map(_location =>
              ({ key: _location.id, value: _location.id, text: `${_location.name}` }))
            }
            placeholder='Contact Location'
            selectOnBlur={false}/>

        </Form.Group>

        <Form.Group widths='equal'>

          <Field
            component={FormField}
            control={Form.Select}
            label='Status'
            name='status'
            options={[
              { key: 1, value: 1, text: 'DECLINED' },
              { key: 2, value: 2, text: 'GREEN' },
              { key: 3, value: 3, text: 'RED - See notes' },
              { key: 4, value: 4, text: 'VIP CLIENT' }
            ]}
            placeholder='Select status'
            selectOnBlur={false}/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>

        <Header as='h4' className='form-section-header ' color='blue'>CONTACT DETAILS</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Form.Input}
            label='Cell Phone'
            name='phones[0]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Home Phone'
            name='phones[1]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Work Phone'
            name='phones[2]'
            placeholder='Enter phone number'
            type='tel'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Other Phone'
            name='phones[3]'
            placeholder='Enter phone number'
            type='tel'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Alt Email'
            name='alt_email'
            placeholder='Enter email'
            type='email'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Referred'
            name='referred'
            options={[
              { key: 1, value: 1, text: 'Drive-by' },
              { key: 2, value: 2, text: 'Event' },
              { key: 3, value: 3, text: 'Internet search' },
              { key: 4, value: 4, text: 'Referral' },
              { key: 5, value: 5, text: 'Other' }
            ]}
            placeholder='Select an option'
            selectOnBlur={false}/>

        </Form.Group>

        <Header as='h4' className='form-section-header ' color='blue'>COMPANY ADDRESS</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Address 1'
            name='addresses[0]'
            placeholder='Enter address'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Address 2'
            name='addresses[1]'
            placeholder='Enter address'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Select}
            disabled={zip.status === 'GETTING'}
            label='Zip *'
            loading={zip.status === 'GETTING'}
            name='zip_code'
            onChange={_handleZipChange}
            onSearchChange={_handleZipSearchChange}
            options={zipOptions}
            placeholder='Search zip'
            search
            selectOnBlur={false}/>
          <Form.Field>
            <Form.Input
              autoComplete='off'
              label='Country'
              readOnly
              value={zipDetail.item.country_code}/>
          </Form.Field>
          <Form.Field>
            <Form.Input
              autoComplete='off'
              label='State'
              readOnly
              value={zipDetail.item.state}/>
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <Form.Input
              autoComplete='off'
              label='City'
              readOnly
              value={zipDetail.item.city}/>
          </Form.Field>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>

        {error && (
          <Form.Group widths='equal'>
            <Form.Field>
              <FormError message={error}/>
            </Form.Field>
          </Form.Group>
        )}
      </Form>
    </Tab.Pane>
  )
}

TabClientInfo.propTypes = {  }

TabClientInfo.defaultProps = {  }

export default compose(
  withRouter,
  connect(
    ({ zip ,...state }) => {
      const zipDetail = zipDetailDuck.selectors.detail(state)
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        zip,
        zipDetail,
        initialValues: clientDetail.item ,
        location     : locationDuck.selectors.list(state),
        role         : rolDuck.selectors.list(state)
      }
    },
    {
      getLocations: locationDuck.creators.get,
      getZipes    : zipDuck.creators.get,
      setZip      : zipDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : 'client-edit-step-1-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        zip_code           : YupFields.zip,
        contact_location_id: Yup.mixed().required('Location is required'),
        email              : Yup.string().email().required('Email is required'),
        contact_date       : Yup.mixed().required('Contact date is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(TabClientInfo)
