import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'
import _times from 'lodash/times'
import faker from 'faker'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import companyDetailDuck from '@reducers/company/detail'
import organizationDuck from '@reducers/organization'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

const divisions = _times(2, index => ({ key: index, value: index, text: `Division ${index + 1}` }))
const regions = _times(2, index => ({ key: index, value: index, text: `Region ${index + 1}` }))

const LocationCreate = props => {
  const {
    organization,
    companyDetail,
    zip,
    zipDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const [ zipOptions, setZipOptions ] = useState([])

  useEffect(() => {
    if(companyDetail.mode === 'CREATE') {
      if(organization.items.length === 0)
        props.getOrganizations()

      setZipOptions([])
    }
  }, [ companyDetail.mode ])

  useEffect(() => {
    if(zip.status === 'GOT')
      setZipOptions(
        zip.items.map((item, index) => ({
          key  : index++,
          value: item.id,
          text : `${item.postal_code} - ${item.state_code}, ${item.city}`
        }))
      )
  }, [ zip.status ])

  useEffect(() => {
    if(zipDetail.status === 'GOT') setZipOptionsFromDetail()
  }, [ zipDetail.status ])

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')
  const getOrganizationOptions = () => {
    return organization.items.map((item, index) => ({
      key: index, value: item.id, text: item.legal_name
    }))
  }

  const setZipOptionsFromDetail = () => setZipOptions([
    {
      key  : 1,
      value: zipDetail.item.id,
      text : `${zipDetail.item.postal_code} - ${zipDetail.item.state_code}, ${zipDetail.item.city}`
    }
  ])

  const _handleClose = () => {
    props.resetItem()
    reset()
  }

  const _handleSubmit = values => {
    let finalValues = Object.entries(values)
      .filter(([ , value ]) => value !== null)
      .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

    if(!('multilocation' in finalValues)) finalValues.multilocation = false

    if(isUpdating) {
      return props.put({ id: companyDetail.item.id, ...finalValues })
        .then(_handleClose)
        .catch(parseResponseError)
    } else {
      const payload = isFromCompanyModule ? finalValues : { ...finalValues, organization: props.match.params.organization }

      return props.post({
        ...payload,
        main_admin: JSON.stringify({
          status    : true,
          first_name: 'Jhon',
          last_name : 'Doe',
          email     : faker.internet.email()
        })
      })
        .then(_handleClose)
        .catch(parseResponseError)
    }
  }

  const _handleZipBlur = () => {
    setZipOptionsFromDetail()
  }

  const _handleZipChange = zipId => {
    props.setZip(
      zip.items.find(item => item.id === zipId)
    )
  }

  const _handleZipSearchChange = (e, data) => {
    if(data.searchQuery.length > 3)
      props.getZipes({
        search: data.searchQuery
      })
  }

  const organizations = useMemo(() => getOrganizationOptions(), [ organization.status ])
  const isOpened = useMemo(() => getIsOpened(companyDetail.mode), [ companyDetail.mode ])
  const isFromCompanyModule = /\/company(\/)?$/.test(props.match.path)
  const isUpdating = Boolean(companyDetail.item.id)

  return (
    <Modal
      className='form-modal side'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'New'} Company</Header>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          {
            (!isUpdating && isFromCompanyModule) && (
              <Form.Group widths='equal'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={Form.Select}
                  label='Organization'
                  name='organization'
                  options={organizations}
                  placeholder='Select organization'
                  search
                  selectOnBlur={false}/>
                <Form.Field/>
                <Form.Field/>
              </Form.Group>
            )
          }
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Legal name *'
              name='legal_name'
              placeholder='Enter legal name'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='DBA'
              name='dba'
              placeholder='Enter DBA'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Subdomain prefix *'
              name='subdomain_prefix'
              placeholder='Enter subdomain'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Tax ID'
              name='tax_id'
              placeholder='Enter tax ID'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Phone'
              name='phones[0]'
              placeholder='Enter phone'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Email'
              name='email'
              placeholder='Enter email'
              type='email'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Website'
              name='website'
              placeholder='www.example.com'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Theme color'
              name='theme_color'
              placeholder='#000000'/>
            <Form.Field/>
          </Form.Group>
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
              component={FormField}
              control={Form.Select}
              disabled={zip.status === 'GETTING'}
              label='Zip'
              loading={zip.status === 'GETTING'}
              name='zip_code'
              onBlur={_handleZipBlur}
              onChange={_handleZipChange}
              onSearchChange={_handleZipSearchChange}
              options={zipOptions}
              placeholder='Search zip'
              search
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Form.Select}
              label='Division'
              name='division'
              options={divisions}
              placeholder='Select division'
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Form.Select}
              label='Region'
              name='region'
              options={regions}
              placeholder='Select region'
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group>
            <Field
              component={FormField}
              control={Form.Input}
              label='Logo'
              name='logo'
              type='file'/>
            <Form.Field/>
            <Form.Field/>
          </Form.Group>
          <Form.Group>
            <Field
              component={FormField}
              control={Form.Checkbox}
              label='Multilocation'
              name='multilocation'
              type='checkbox'/>
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
    ({ organization, zip, ...state }) => {
      const companyDetail = companyDetailDuck.selectors.detail(state)
      const zipDetail = zipDetailDuck.selectors.detail(state)

      let initialValues = { ...companyDetail.item }

      delete initialValues.logo
      delete initialValues.thumbnail

      return {
        organization,
        companyDetail,
        zip,
        zipDetail,
        initialValues
      }
    },
    {
      getOrganizations: organizationDuck.creators.get,
      getZipes        : zipDuck.creators.get,
      post            : companyDetailDuck.creators.post,
      put             : companyDetailDuck.creators.put,
      resetItem       : companyDetailDuck.creators.resetItem,
      setZip          : zipDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : 'organization-company-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        organization    : YupFields.num_required,
        legal_name      : YupFields.name,
        subdomain_prefix: YupFields.subdomain,
        theme_color     : YupFields.theme_color
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(LocationCreate)
