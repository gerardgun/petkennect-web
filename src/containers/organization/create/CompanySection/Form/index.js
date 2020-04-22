import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'
import _times from 'lodash/times'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import companyDetailDuck from '@reducers/company/detail'
import organizationDuck from '@reducers/organization'

const divisions = _times(10, index => ({ key: index, value: index, text: `Division ${index + 1}` }))
const regions = _times(10, index => ({ key: index, value: index, text: `Region ${index + 1}` }))

const CompanyForm = props => {
  const {
    organization,
    companyDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(() => {
    if(companyDetail.mode === 'CREATE' && organization.items.length === 0)
      props.getOrganizations()
  }, [ companyDetail.mode ])

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')
  const getOrganizationOptions = () => {
    return organization.items.map((item, index) => ({
      key: index, value: item.id, text: item.legal_name
    }))
  }

  const _handleClose = () => {
    props.resetItem()
    reset()
  }

  const _handleSubmit = values => {
    const finalValues = Object.entries(values)
      .filter(([ , value ]) => Boolean(value))
      .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

    if(isUpdating) {
      return props.put({ id: companyDetail.item.id, ...finalValues })
        .then(_handleClose)
        .catch(parseResponseError)
    } else {
      const payload = isFromCompanyModule ? finalValues : { ...finalValues, organization: props.match.params.organization }

      return props.post(payload)
        .then(_handleClose)
        .catch(parseResponseError)
    }
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
              name='phone'
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
            <Form.Field/>
            <Form.Field/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Address 1'
              name='address1'
              placeholder='Enter address'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Address 2'
              name='address2'
              placeholder='Enter address'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Country'
              name='country'
              placeholder='Enter country'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='State'
              name='state'
              placeholder='Enter state'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='City'
              name='city'
              placeholder='Enter city'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Zip'
              name='zip'
              placeholder='Enter zip'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Select}
              label='Division'
              name='division_id'
              options={divisions}
              placeholder='Select division'
              search
              selectOnBlur={false}/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Select}
              label='Region'
              name='region_id'
              options={regions}
              placeholder='Select region'
              search
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
    ({ organization, ...state }) => {
      const companyDetail = companyDetailDuck.selectors.detail(state)
      let initialValues = { ...companyDetail.item }

      delete initialValues.logo
      delete initialValues.thumbnail

      return {
        organization,
        companyDetail,
        initialValues
      }
    },
    {
      getOrganizations: organizationDuck.creators.get,
      post            : companyDetailDuck.creators.post,
      put             : companyDetailDuck.creators.put,
      resetItem       : companyDetailDuck.creators.resetItem
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
        subdomain_prefix: YupFields.subdomain
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(CompanyForm)
