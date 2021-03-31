import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Checkbox, Form, Header, Input, Label, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputColor from '@components/Common/InputColor'
import InputFile from '@components/Common/InputFile'
import InputMask from '@components/Common/InputMask'
import YupFields from '@lib/constants/yup-fields'
import useZipInputSearch from '@components/useZipInputSearch'
import { useDebounce } from '@hooks/Shared'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'

import companyDetailDuck from '@reducers/company/detail'
import organizationDuck from '@reducers/organization'
import userDuck from '@reducers/user'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

const divisions = Array.from({ length: 2 }, (_,index) => ({ key: index, value: index, text: `Division ${index + 1}` }))
const regions = Array.from({ length: 2 }, (_,index) => ({ key: index, value: index, text: `Region ${index + 1}` }))

export const formId = 'organization-company-form'

const CompanyForm = props => {
  const {
    organization,
    companyDetail,
    user,
    zip,
    zipDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const history = useHistory()
  const { organization: organizationId } = useParams()

  const [ customUser, setCustomUser ] = useState({ id: 'CUSTOM_USER_OPTION_ID', email: '' })
  const [ zipOptions, { _handleZipChange, _handleZipSearchChange } ] = useZipInputSearch(zip, zipDetail, props.getZipes, props.setZip)

  useEffect(() => {
    props.getUsers()
  }, [])

  useEffect(() => {
    if(companyDetail.mode === 'CREATE')
      if(organization.items.length === 0)
        props.getOrganizations()
  }, [ companyDetail.mode ])

  const getOrganizationOptions = () => {
    return organization.items.map((item, index) => ({
      key: index, value: item.id, text: item.legal_name
    }))
  }

  const _handleSubmit = values => {
    let {
      user_exists = true,
      user, main_admin_user,
      main_admin_first_name, main_admin_last_name, main_admin_email,
      ...payload
    } = parseFormValues(values)

    if(Array.isArray(payload.phones))
      payload.phones = JSON.stringify(payload.phones)

    if(Array.isArray(payload.addresses))
      payload.addresses = JSON.stringify(payload.addresses)

    if(typeof payload.logo === 'string')
      delete payload.logo

    // Main admin
    let mainAdmin = {
      first_name: main_admin_first_name, last_name: main_admin_last_name , email: main_admin_email, status: true
    }

    if(user_exists)
      mainAdmin = { user: user || main_admin_user, status: true }

    payload.main_admin = JSON.stringify(mainAdmin)

    if(updating)
      return props.put({ id: companyDetail.item.id, ...payload })
        .catch(parseResponseError)
    else
      return props.post({ organization: organizationId, ...payload })
        .then(payload => {
          props.resetItem()
          history.push(`/company/${payload.id}`)
        })
        .catch(parseResponseError)
  }

  const { _handleDebounce } = useDebounce((text) => {
    props.setUserFilters({ search: text })
    props.getUsers()
  })

  const _handleSearchChange = (_, { searchQuery }) => _handleDebounce(searchQuery)

  const _handleUserOptionChange = (value) => {
    const latestValue = value[value.length  ? value.length - 1 : 0]

    if(!latestValue) {
      props.setUserFilters({ search: '' })
      props.getUsers()
    }

    const _user = user.items.find(_user => _user.email === latestValue)

    if(_user) {
      props.change('user_exists', true)
      props.change('main_admin_first_name', _user.first_name)
      props.change('main_admin_last_name', _user.last_name)
      props.change('user', _user.id)
      setCustomUser({ id: 'CUSTOM_USER_OPTION_ID', email: '' })

      return
    }
    props.change('user_exists', false)
    props.change('main_admin_first_name', '')
    props.change('main_admin_last_name', '')
    props.change('main_admin_email', null)
  }

  const _handleUserOptionAddItem = (_, data) => {
    setCustomUser({
      id: 'CUSTOM_USER_OPTION_ID', email: data.value
    })
  }

  const organizations = useMemo(() => getOrganizationOptions(), [ organization.status ])
  const updating = Boolean(companyDetail.item.id)

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <Field component='input' name='id' type='hidden'/>
        <Field component='input' name='user' type='hidden'/>
        <Field
          component='input'
          defaultValue={true} name='user_exists' type='hidden'/>

        <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
        <Form.Group className='ui-form-group-custom' widths='3'>
          <Field
            autoComplete='off'
            autoFocus
            className='ui-field-custom-width'
            component={FormField}
            control={Input}
            label='Legal name'
            name='legal_name'
            placeholder='Enter legal name'
            required/>
          <Field
            className='ui-field-custom-width'
            component={FormField}
            control={InputFile}
            label='Logo'
            name='logo'/>
          <Field
            autoComplete='off'
            className='ui-field-custom-width'
            component={FormField}
            control={Input}
            label='DBA'
            name='dba'
            placeholder='Enter DBA'/>
        </Form.Group>
        <Form.Group className='ui-form-group-custom' widths='3'>
          <Field
            autoComplete='off'
            className='ui-field-custom-width'
            component={FormField}
            control={Input}
            label='Subdomain prefix'
            labelPosition='right'
            name='subdomain_prefix'
            placeholder='Enter subdomain'
            required>
            <input/>
            <Label color='teal' content='.petkennect.com'/>
          </Field>
          <Field
            autoComplete='off'
            className='ui-field-custom-width'
            component={FormField}
            control={InputMask}
            label='Tax ID'
            mask='99-9999999'
            name='tax_id'
            placeholder='Enter tax ID'/>
          <Field
            autoComplete='off'
            className='ui-field-custom-width'
            component={FormField}
            control={InputColor}
            label='Theme color'
            name='theme_color'/>
        </Form.Group>
        {
          (!updating && !organizationId) && (
            <Form.Group className='ui-form-group-custom' widths='equal'>
              <Field
                autoComplete='off'
                className='ui-form-group-custom'
                component={FormField}
                control={Select}
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

        <Header as='h6' className='section-header' color='blue'>Contact Details</Header>
        <Form.Group className='ui-form-group-custom' widths='3'>
          <Field
            autoComplete='off'
            className='ui-field-custom-width'
            component={FormField}
            control={InputMask}
            label='Phone'
            mask='(999) 999 9999'
            name='phones[0]'
            placeholder='(999) 999 9999'/>
          <Field
            autoComplete='off'
            className='ui-field-custom-width'
            component={FormField}
            control={Input}
            label='Email'
            name='email'
            placeholder='Enter email'
            type='email'/>
          <Field
            autoComplete='off'
            className='ui-field-custom-width'
            component={FormField}
            control={Input}
            label='Website'
            name='website'
            placeholder='https://www.example.com'/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Company address</Header>
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
        <Form.Group className='ui-form-group-custom' widths='3'>
          <Field
            className='ui-field-custom-width'
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
          <Form.Field className='ui-field-custom-width'>
            <Form.Input
              autoComplete='off'
              label='Country'
              readOnly
              value={zipDetail.item.country_code}/>
          </Form.Field>
          <Form.Field className='ui-field-custom-width'>
            <Form.Input
              autoComplete='off'
              label='State'
              readOnly
              value={zipDetail.item.state}/>
          </Form.Field>
        </Form.Group>
        <Form.Group className='ui-form-group-custom' widths='3'>
          <Form.Field className='ui-field-custom-width'>
            <Form.Input
              autoComplete='off'
              label='City'
              readOnly
              value={zipDetail.item.city}/>
          </Form.Field>
          <Field
            className='ui-field-custom-width'
            component={FormField}
            control={Select}
            label='Division'
            name='division'
            options={divisions}
            placeholder='Select division'
            selectOnBlur={false}/>
          <Field
            className='ui-field-custom-width'
            component={FormField}
            control={Select}
            label='Region'
            name='region'
            options={regions}
            placeholder='Select region'
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths={3}>
          <Field
            component={FormField}
            control={Checkbox}
            label='Multilocation'
            name='multilocation'
            type='checkbox'/>
          {updating && (
            <Field
              component={FormField}
              control={Checkbox}
              label='Active'
              name='status'
              type='checkbox'/>

          )}
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Add admin user</Header>
        <Form.Group className='ui-form-group-custom' widths={3}>
          <Field
            additionLabel='Invite '
            allowAdditions
            className='ui-field-custom-width'
            closeOnChange
            component={FormField}
            control={Select}
            format={value=> [ value ]}
            label='Add or Search some PetKennect User'
            multiple
            name='main_admin_email'
            onAddItem={_handleUserOptionAddItem}
            onChange={_handleUserOptionChange}
            onSearchChange={_handleSearchChange}
            options={[ ...user.items, customUser ].map((_user) => ({
              key  : _user.id,
              value: _user.email,
              text : `${_user.email}`
            }))}
            parse={value =>
              value[value.length > 0 ? value.length - 1 : 0]
            }
            placeholder='Search user by email'
            required
            search
            selectOnBlur={false}/>

          <Field
            className='ui-field-custom-width'
            component={FormField}
            control={Input}
            label='Name'
            name='main_admin_first_name'
            placeholder='Enter name'
            readOnly={!!props.user_exists || (updating && props.pristine)}
            required/>
          <Field
            className='ui-field-custom-width'
            component={FormField}
            control={Input}
            label='Lastname'
            name='main_admin_last_name'
            placeholder='Enter lastname'
            readOnly={!!props.user_exists || (updating && props.pristine)}
            required/>
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
    ({ organization, zip, ...state }) => {
      const companyDetail = companyDetailDuck.selectors.detail(state)
      const zipDetail = zipDetailDuck.selectors.detail(state)

      return {
        organization,
        companyDetail,
        zip,
        zipDetail,
        user         : userDuck.selectors.list(state),
        initialValues: { ...companyDetail.item },
        user_exists  : formValueSelector(formId)(state, 'user_exists')
      }
    },
    {
      getOrganizations: organizationDuck.creators.get,
      getZipes        : zipDuck.creators.get,
      getUsers        : userDuck.creators.get,
      setUserFilters  : userDuck.creators.setFilters,
      post            : companyDetailDuck.creators.post,
      put             : companyDetailDuck.creators.put,
      resetItem       : companyDetailDuck.creators.resetItem,
      setZip          : zipDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values => {
      const schema = {
        email                : Yup.string().email('Email address is not valid').nullable(),
        website              : Yup.string().url('Website url is not valid').nullable(),
        tax_id               : Yup.string().matches(/^\d{2}-\d{7}$/, { message: 'Enter a valid Tax ID', excludeEmptyString: true }).nullable(),
        zip_code             : Yup.mixed().required('Zip code is required'),
        organization         : YupFields.num_required,
        legal_name           : YupFields.name,
        subdomain_prefix     : YupFields.subdomain,
        theme_color          : YupFields.theme_color,
        main_admin_email     : Yup.mixed().required('User admin is required'),
        main_admin_first_name: Yup.mixed().when('user_exists', {
          is  : true,
          then: (m) => m.required('User is Required')
        }),
        user: Yup.mixed().when('user_exists', {
          is  : true,
          then: (m) => m.required('User is Required')
        })
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(CompanyForm)
