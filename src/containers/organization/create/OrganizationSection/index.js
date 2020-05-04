import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Divider, Form, Grid, Header, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import useZipInputSearch from '@components/useZipInputSearch'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import organizationDetailDuck from '@reducers/organization/detail'
import zipDuck from '@reducers/zip'
import zipDetailDuck from '@reducers/zip/detail'

export const formId = 'organization-create-information'

const OrganizationSection = props => {
  const {
    organizationDetail,
    zip,
    zipDetail,
    history,
    match,
    error, handleSubmit, reset // redux-form
  } = props

  const [ open, { _handleOpen, _handleClose } ] = useModal() // For Modal Delete
  const [ zipOptions, { _handleZipChange, _handleZipSearchChange } ] = useZipInputSearch(zip, zipDetail, props.getZipes, props.setZip)

  useEffect(() => {
    if(organizationDetail.status === 'DELETED')
      history.replace('/organization')
  }, [ organizationDetail.status ])

  const _handleSubmit = values => {
    const finalValues = Object.entries(values)
      .filter(([ , value ]) => Boolean(value))
      .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

    if(isUpdating)
      return props.put({ id: organizationDetail.item.id, ...finalValues })
        .catch(parseResponseError)
    else
      return props.post(finalValues)
        .then(payload => {
          history.replace(`/organization/${payload.id}`)
        })
        .catch(parseResponseError)
  }

  const isUpdating = match.params.organization
  const saving = [ 'POSTING', 'PUTTING' ].includes(organizationDetail.status)

  return (
    <>
      <Grid className='form-primary'>
        <Grid.Column width='thirteen'>
          <Segment className='segment-content' loading={organizationDetail.status === 'GETTING'} padded='very'>
            <Grid className='segment-content-header'>
              <Grid.Column>
                <Header as='h2'>{isUpdating ? 'Update' : 'Create'} Organization</Header>
              </Grid.Column>
            </Grid>

            {/* eslint-disable-next-line react/jsx-handler-names */}
            <Form id={props.form} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
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
                  label='Tax ID'
                  name='tax_id'
                  placeholder='Enter tax ID'/>
              </Form.Group>
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
                  onChange={_handleZipChange}
                  onSearchChange={_handleZipSearchChange}
                  options={zipOptions}
                  placeholder='Search zip'
                  search
                  selectOnBlur={false}/>
                <Form.Field/>
                <Form.Field/>
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
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>
          <Button
            as={Link} content='Cancel' fluid
            size='large' to='/organization'/>
          <Button
            color='teal'
            content={isUpdating ? 'Update' : 'Create'}
            disabled={saving}
            fluid
            form={props.form}
            loading={saving}
            size='large'
            type='submit'/>
          {
            isUpdating && (<Button
              color='google plus' content='Delete' fluid
              onClick={_handleOpen} size='large'/>)
          }
          <Divider horizontal>other</Divider>
          <Button
            content='Send Email' disabled fluid
            icon='mail outline'/>
          <Button
            content='Print' disabled fluid
            icon='print'/>
          <Button
            content='View Records' disabled fluid
            icon='file alternate outline'/>
          <Button
            content='Email Records' disabled fluid
            icon='share square'/>
        </Grid.Column>
      </Grid>

      <ModalDelete
        duckDetail={organizationDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ zip, ...state }) => {
      const organizationDetail = organizationDetailDuck.selectors.detail(state)
      const zipDetail = zipDetailDuck.selectors.detail(state)

      // Initial values for redux form
      let initialValues = { ...organizationDetail.item }

      delete initialValues.logo
      delete initialValues.thumbnail

      return {
        organizationDetail,
        zip,
        zipDetail,
        initialValues
      }
    },
    {
      getZipes: zipDuck.creators.get,
      post    : organizationDetailDuck.creators.post,
      put     : organizationDetailDuck.creators.put,
      setZip  : zipDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        legal_name: YupFields.name
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(OrganizationSection)

