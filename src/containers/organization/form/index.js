import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Header, Input, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputFile from '@components/Common/InputFile'
import InputMask from '@components/Common/InputMask'
import YupFields from '@lib/constants/yup-fields'
import useZipInputSearch from '@components/useZipInputSearch'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'

import organizationDetailDuck from '@reducers/organization/detail'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

export const formId = 'organization-form'

const OrganizationForm = props => {
  const {
    organizationDetail,
    zip,
    zipDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const history = useHistory()
  const [ zipOptions, { _handleZipChange, _handleZipSearchChange } ] = useZipInputSearch(zip, zipDetail, props.getZipes, props.setZip)

  const _handleSubmit = values => {
    values = parseFormValues(values)

    if(typeof values.logo === 'string')
      delete values.logo

    if(Array.isArray(values.phones))
      values.phones = JSON.stringify(values.phones)

    if(Array.isArray(values.addresses))
      values.addresses = JSON.stringify(values.addresses)

    if(updating)
      return props.put({ id: organizationDetail.item.id, ...values })
        .catch(parseResponseError)
    else
      return props.post(values)
        .then(payload => {
          props.resetItem()
          history.push(`/organization/${payload.id}`)
        })
        .catch(parseResponseError)
  }

  const updating = Boolean(organizationDetail.item.id)

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Input}
            label='Legal name'
            name='legal_name'
            placeholder='Enter legal name'
            required/>
          <Field
            component={FormField}
            control={InputFile}
            label='Logo'
            name='logo'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='DBA'
            name='dba'
            placeholder='Enter DBA'/>
        </Form.Group>
        <Form.Group widths={3}>
          <Field
            autoComplete='off'
            component={FormField}
            control={InputMask}
            label='Tax ID'
            mask='99-9999999'
            name='tax_id'
            placeholder='Enter tax ID'/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Contact Details</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={InputMask}
            label='Phone'
            mask='(999) 999 9999'
            name='phones[0]'
            placeholder='(999) 999 9999'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Email'
            name='email'
            placeholder='Enter email'
            type='email'/>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Website'
            name='website'
            placeholder='https://www.example.com'/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Organization address</Header>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Address 1'
            name='addresses[0]'
            placeholder='Enter address'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            component={FormField}
            control={Input}
            label='Address 2'
            name='addresses[1]'
            placeholder='Enter address'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            disabled={zip.status === 'GETTING'}
            label='Zip code'
            loading={zip.status === 'GETTING'}
            name='zip_code'
            onChange={_handleZipChange}
            onSearchChange={_handleZipSearchChange}
            options={zipOptions}
            placeholder='Search zip'
            required
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
        <Form.Group widths={3}>
          <Form.Field>
            <Form.Input
              autoComplete='off'
              label='City'
              readOnly
              value={zipDetail.item.city}/>
          </Form.Field>
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
    </>
  )
}

export default compose(
  connect(
    ({ zip, ...state }) => {
      const organizationDetail = organizationDetailDuck.selectors.detail(state)
      const zipDetail = zipDetailDuck.selectors.detail(state)

      return {
        organizationDetail,
        zip,
        zipDetail,
        initialValues: { ...organizationDetail.item }
      }
    },
    {
      getZipes : zipDuck.creators.get,
      post     : organizationDetailDuck.creators.post,
      put      : organizationDetailDuck.creators.put,
      resetItem: organizationDetailDuck.creators.resetItem,
      setZip   : zipDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values => {
      const schema = {
        email     : Yup.string().email('Email address is not valid').nullable(),
        website   : Yup.string().url('Website url is not valid').nullable(),
        tax_id    : Yup.string().matches(/^\d{2}-\d{7}$/, { message: 'Enter a valid Tax ID', excludeEmptyString: true }).required('Tax ID is required'),
        zip_code  : Yup.mixed().required('Zip code is required'),
        legal_name: YupFields.name
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(OrganizationForm)
