import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Form, Header, Modal, Divider } from 'semantic-ui-react'
import * as Yup from 'yup'
import _times from 'lodash/times'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import companyDetailDuck from '@reducers/company/detail'
import organizationDuck from '@reducers/organization'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'
import userDuck from '@reducers/user'
import { useDebounce } from '@hooks/Shared'
import InputColor from '@components/Common/InputColor'

const divisions = _times(2, index => ({ key: index, value: index, text: `Division ${index + 1}` }))
const regions = _times(2, index => ({ key: index, value: index, text: `Region ${index + 1}` }))

const CompanyForm = props => {
  const {
    organization,
    companyDetail,
    user,
    zip,
    zipDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const [ zipOptions, setZipOptions ] = useState([])

  const [ customUser, setCustomUser ] = useState({ id: 'CUSTOM_USER_OPTION_ID', email: '' })

  useEffect(()=> {
    if(companyDetail.item.id)
      props.getCompany(companyDetail.item.id)
  }, [ companyDetail.item.id ])

  useEffect(()=> {
    props.getUsers()
  }, [])
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
        ...payload
      })
        .then(_handleClose)
        .catch(parseResponseError)
    }
  }

  const _handleZipBlur = () => {
    setZipOptionsFromDetail()
  }

  const _handleZipChange = zipId => {
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

  const { _handleDebounce } = useDebounce((text)=> {
    props.setUserFilters({ search: text })
    props.getUsers()
  })

  const _handleSearchChange = (_, { searchQuery }) => _handleDebounce(searchQuery)

  const _handleUserOptionChange = (value) => {
    if(isUpdating)
      return

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
  }
  const _handleUserOptionAddItem = (_, data) => {
    setCustomUser({
      id: 'CUSTOM_USER_OPTION_ID', email: data.value
    })
  }
  const _handleChangeThemeColor = (value)=>{
    props.change('theme_color',value)}

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
          <Field component='input' name='id' type='hidden'/>
          <Field component='input' name='user' type='hidden'/>
          <Field
            component='input' defaultValue={true} name='user_exists'
            type='hidden'/>

          <Divider/>
          <Header as='h4'>Company information</Header>

          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Legal name *'
              name='legal_name'
              placeholder='Enter legal name'/>
            <Field
              component={FormField}
              control={Form.Input}
              label='Logo'
              name='logo'
              type='file'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='DBA'
              name='dba'
              placeholder='Enter DBA'/>

          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Subdomain prefix *'
              name='subdomain_prefix'
              placeholder='Enter subdomain'/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Tax ID'
              name='tax_id'
              placeholder='Enter tax ID'/>
            <InputColor
              label='Theme color'
              onChange={_handleChangeThemeColor}
              placeholder='#ffffff'
              value={props.watchedThemeColor}/>

          </Form.Group>
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
          <Divider/>
          <Header as='h4'>Contact Details</Header>
          <Form.Group widths='equal'>
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
            <Field
              autoComplete='off'
              component={FormField}
              control={Form.Input}
              label='Website'
              name='website'
              placeholder='www.example.com'/>
          </Form.Group>

          <Divider/>
          <Header as='h4'>Company address</Header>

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
              control={Form.Checkbox}
              label='Multilocation'
              name='multilocation'
              type='checkbox'/>
            {isUpdating && (
              <Field
                component={FormField}
                control={Form.Checkbox}
                label='Active'
                name='status'
                type='checkbox'/>

            )}
          </Form.Group>

          <Divider/>
          <Header as='h4'>Admin user</Header>

          <Form.Group widths='equal'>
            <Field
              additionLabel='Invite '
              allowAdditions
              closeOnChange
              component={FormField}
              control={Form.Dropdown}
              fluid
              format={value=>
                // isUpdating
                //   ? [ (user.items.find(_user => _user.id === props.watchedMainAdmin) || {}).email ]
                [ value ]
              }
              label='Add or Search some PetKennect User*'
              multiple
              name='main_admin'
              onAddItem={_handleUserOptionAddItem}
              onChange={_handleUserOptionChange}
              onSearchChange={_handleSearchChange}
              options={[ ...user.items,customUser ].map((_user) => ({
                key  : _user.id,
                value: _user.email,
                text : `${_user.email}`
              }))}
              parse={value =>
                value[value.length > 0 ? value.length - 1 : 0]
              }
              placeholder='Search user by email'
              readOnly={isUpdating}
              search
              selection
              selectOnBlur={false}/>

            <Field
              autoFocus
              component={FormField}
              control={Form.Input}
              label='Name *'
              name='main_admin_first_name'
              placeholder='Enter name'
              readOnly={!!props.user_exists || isUpdating}/>
            <Field
              component={FormField}
              control={Form.Input}
              label='Lastname'
              name='main_admin_last_name'
              placeholder='Enter lastname'
              readOnly={!!props.user_exists || isUpdating}/>
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
        user             : userDuck.selectors.list(state),
        initialValues,
        user_exists      : formValueSelector('organization-company-form')(state, 'user_exists'),
        watchedThemeColor: formValueSelector('organization-company-form')(state, 'theme_color'),
        watchedMainAdmin : formValueSelector('organization-company-form')(state, 'main_admin')
      }
    },
    {
      getOrganizations: organizationDuck.creators.get,
      getZipes        : zipDuck.creators.get,
      getUsers        : userDuck.creators.get,
      setUserFilters  : userDuck.creators.setFilters,
      getCompany      : companyDetailDuck.creators.get,
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
        theme_color     : YupFields.theme_color,

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
