import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Divider, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'
import _times from 'lodash/times'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import companyDetailDuck from '@reducers/company/detail'
import organizationDuck from '@reducers/organization'

const divisions = _times(10, index => ({ key: index, value: index, text : `Division ${index + 1}` }))
const regions = _times(10, index => ({ key: index, value: index, text : `Region ${index + 1}` }))

const CompanyForm = props => {
  const {
    organization,
    companyDetail,
    error, handleSubmit, pristine, reset, submitting // redux-form
  } = props

  useEffect(() => {
    if(companyDetail.mode === 'CREATE' && organization.items.length === 0) {
      props.getOrganizations()
    }
  }, [ companyDetail.mode ])

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')
  const getOrganizationOptions = () => {
    return organization.items.map((item, index) => ({
      key: index, value: item.id, text : item.legal_name
    }))
  }

  const _handleClose = () => {
    props.resetItem()
    reset()
  }

  const _handleSubmit = values => {
    const finalValues = Object.entries(values)
        .filter(([key, value]) => Boolean(value))
        .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

    if(isUpdating) {
      return props.put({ id: companyDetail.item.id, ...finalValues})
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
      open={isOpened}
      onClose={_handleClose}
      size='large'
    >
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'New'} Company</Header>
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          {
            (!isUpdating && isFromCompanyModule) && (
              <Form.Group widths='equal'>
                <Field
                  name='organization'
                  component={FormField}
                  control={Form.Select}
                  options={organizations}
                  label='Organization'
                  placeholder='Select organization'
                  autoComplete='off'
                  search
                  selectOnBlur={false}
                />
                <Form.Field />
                <Form.Field />
              </Form.Group>
            )
          }
          <Form.Group widths='equal'>
            <Field
              name='legal_name'
              component={FormField}
              control={Form.Input}
              label='Legal name *'
              placeholder='Enter legal name'
              autoComplete='off'
            />
            <Field
              name='dba'
              component={FormField}
              control={Form.Input}
              label='DBA'
              placeholder='Enter DBA'
              autoComplete='off'
            />
            <Field
              name='subdomain_prefix'
              component={FormField}
              control={Form.Input}
              label='Subdomain prefix *'
              placeholder='Enter subdomain'
              autoComplete='off'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='tax_id'
              component={FormField}
              control={Form.Input}
              label='Tax ID'
              placeholder='Enter tax ID'
              autoComplete='off'
            />
            <Field
              name='phone'
              component={FormField}
              control={Form.Input}
              label='Phone'
              placeholder='Enter phone'
              autoComplete='off'
            />
            <Field
              name='email'
              component={FormField}
              control={Form.Input}
              label='Email'
              placeholder='Enter email'
              type='email'
              autoComplete='off'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='website'
              component={FormField}
              control={Form.Input}
              label='Website'
              placeholder='www.example.com'
              autoComplete='off'
            />
            <Form.Field />
            <Form.Field />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='address1'
              component={FormField}
              control={Form.Input}
              label='Address 1'
              placeholder='Enter address'
              autoComplete='off'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='address2'
              component={FormField}
              control={Form.Input}
              label='Address 2'
              placeholder='Enter address'
              autoComplete='off'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='country'
              component={FormField}
              control={Form.Input}
              label='Country'
              placeholder='Enter country'
              autoComplete='off'
            />
            <Field
              name='state'
              component={FormField}
              control={Form.Input}
              label='State'
              placeholder='Enter state'
              autoComplete='off'
            />
            <Field
              name='city'
              component={FormField}
              control={Form.Input}
              label='City'
              placeholder='Enter city'
              autoComplete='off'
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              name='zip'
              component={FormField}
              control={Form.Input}
              label='Zip'
              placeholder='Enter zip'
              autoComplete='off'
            />
            <Field
              name='division_id'
              component={FormField}
              control={Form.Select}
              options={divisions}
              label='Division'
              placeholder='Select division'
              autoComplete='off'
              search
              selectOnBlur={false}
            />
            <Field
              name='region_id'
              component={FormField}
              control={Form.Select}
              options={regions}
              label='Region'
              placeholder='Select region'
              autoComplete='off'
              search
              selectOnBlur={false}
            />
          </Form.Group>
          <Form.Group>
            <Field
              name='logo'
              component={FormField}
              control={Form.Input}
              label='Logo'
              type='file'
            />
            <Form.Field />
            <Form.Field />
          </Form.Group>
          <Form.Group>
            <Field
              name='multilocation'
              component={FormField}
              control={Form.Checkbox}
              label='Multilocation'
              type='checkbox'
            />
          </Form.Group>

          {
            error && (
              <Form.Group widths="equal">
                <Form.Field>
                  <FormError message={error} />
                </Form.Field>
              </Form.Group>
            )
          }

          <Form.Group widths='equal' className='form-modal-actions'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                type="button"
                onClick={_handleClose}
              />
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Save'}
                disabled={submitting}
                loading={submitting}
              />
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
    ({ organization, ...state}) => {
      const companyDetail = companyDetailDuck.selectors.detail(state)
      let initialValues = { ...companyDetail.item }

      delete initialValues.logo
      delete initialValues.thumbnail

      return {
        organization,
        companyDetail,
        initialValues,
      }
    },
    {
      getOrganizations: organizationDuck.creators.get,
      post: companyDetailDuck.creators.post,
      put: companyDetailDuck.creators.put,
      resetItem: companyDetailDuck.creators.resetItem,
    }
  ),
  reduxForm({
    form              : 'organization-company-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate: values  => {
      const schema = {
        organization: YupFields.num_required,
        legal_name: YupFields.name,
        subdomain_prefix: YupFields.subdomain,
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(CompanyForm)
