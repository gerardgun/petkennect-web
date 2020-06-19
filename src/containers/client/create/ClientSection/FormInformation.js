import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import useZipInputSearch from '@components/useZipInputSearch'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

const FormInformation = props => {
  const {
    clientDetail,
    zip,
    zipDetail,
    match,
    error, handleSubmit, initialized, reset // redux-form
  } = props

  const [ zipOptions, { _handleZipChange, _handleZipSearchChange } ] = useZipInputSearch(zip, zipDetail, props.getZipes, props.setZip)

  useEffect(() => {
    if(!initialized && clientDetail.item.id)
      props.initialize({
        ...clientDetail.item,
        contact_location_id: 1
      })
  }, [ clientDetail.status ])

  const isUpdating = match.params.client

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={clientDetail.status === 'GETTING'}>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            className='clsLabel'
            component={FormField}
            control={Form.Input}
            label='Name'
            name='first_name'
            placeholder='Enter names'
            readOnly={isUpdating}/>
          <Field
            autoComplete='off'
            className='clsLabel'
            component={FormField}
            control={Form.Input}
            label='Lastname'
            name='last_name'
            placeholder='Enter lastname'
            readOnly={isUpdating}/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Spouse'
            name='spouse'
            placeholder='Enter spouse'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            icon='upload'
            label='Profile Picture'
            name='prfile_picture'
            placeholder='Upload image'
            style={{ width: '77%' }}
            type='file'/>
          <Form.Field/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='ACTIVE'
            name=''
            style={{ 'padding-top': '30px', 'margin-left': '-34px' }}
            toggle
            type='checkbox'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Contact date'
            name='contact_date'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Contact Location'
            name='contact_location_id'
            options={[
              { key: 1, value: 1, text: '02-RH' },
              { key: 2, value: 2, text: '03-VP' },
              { key: 3, value: 3, text: '04-HH' },
              { key: 4, value: 4, text: '05-SC' }
            ]}
            placeholder='Contact Location'
            selectOnBlur={false}/>
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
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Address1'
            name='addresses[0]'
            placeholder='Enter address'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Form.Input}
            label='Address2'
            name=''
            placeholder='Enter address2'/>
        </Form.Group>
        <Form.Group widths='equal'>
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
          <Form.Field>
            <Form.Input
              autoComplete='off'
              label='City'
              readOnly
              value={zipDetail.item.city}/>
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            className='clsLabel'
            component={FormField}
            control={Form.Select}
            disabled={zip.status === 'GETTING'}
            label='Zip'
            loading={zip.status === 'GETTING'}
            name='zip_code'
            onChange={_handleZipChange}
            onSearchChange={_handleZipSearchChange}
            options={zipOptions}
            placeholder='Search zip'
            search
            selectOnBlur={false}/>
          <Form.Field/>
          <Form.Field/>
        </Form.Group>

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
    </Tab.Pane>
  )
}

export default compose(
  withRouter,
  connect(
    ({ zip, ...state }) => {
      const zipDetail = zipDetailDuck.selectors.detail(state)

      return {
        clientDetail: clientDetailDuck.selectors.detail(state),
        zip,
        zipDetail
      }
    },
    {
      getZipes: zipDuck.creators.get,
      setZip  : zipDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form            : 'client-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        first_name: YupFields.name,
        last_name : YupFields.first_lastname,
        zip_code  : YupFields.zip
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

