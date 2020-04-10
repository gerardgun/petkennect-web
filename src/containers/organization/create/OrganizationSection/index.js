import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Divider, Form, Grid, Header, Segment, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import organizationDetailDuck from '@reducers/organization/detail'

export const formId = 'organization-create-information'

const OrganizationSection = props => {
  const {
    organizationDetail,
    error, handleSubmit, initialized, reset, // redux-form
    history,
    match,
    post,
    put,
  } = props

  // For Modal Delete
  const [ open, { handleOpen, handleClose } ] = useModal()

  useEffect(() => {
    if(organizationDetail.status === 'DELETED') {
      history.replace('/organization')
    }
  }, [ organizationDetail.status ])

  const _handleSubmit = values => {
    const finalValues = Object.entries(values)
        .filter(([key, value]) => Boolean(value))
        .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

    if(isUpdating) {
      return put({ id: organizationDetail.item.id, ...finalValues})
        .catch(parseResponseError)
    } else {
      return post(finalValues)
        .then(payload => {
          history.replace(`/organization/${payload.id}`)
        })
        .catch(parseResponseError)
    }
  }

  const isUpdating = match.params.organization
  const saving = [ 'POSTING', 'PUTTING' ].includes(organizationDetail.status)

  return (
    <>
      <Grid className='form-primary'>
        <Grid.Column width='thirteen'>
          <Segment className='segment-content' padded='very' loading={organizationDetail.status === 'GETTING'}>
            <Grid className='segment-content-header'>
              <Grid.Column>
                <Header as='h2'>{isUpdating ? 'Update' : 'Create'} Organization</Header>
              </Grid.Column>
            </Grid>

            <Form id={props.form} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
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
                  name='tax_id'
                  component={FormField}
                  control={Form.Input}
                  label='Tax ID'
                  placeholder='Enter tax ID'
                  autoComplete='off'
                />
              </Form.Group>
              <Form.Group widths='equal'>
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
                <Field
                  name='website'
                  component={FormField}
                  control={Form.Input}
                  label='Website'
                  placeholder='www.example.com'
                  autoComplete='off'
                />
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
                <Form.Field />
                <Form.Field />
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

              {
                error && (
                  <Form.Group widths="equal">
                    <Form.Field>
                      <FormError message={error} />
                    </Form.Field>
                  </Form.Group>
                )
              }
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>
          <Button as={Link} content='Cancel' fluid size='large' to='/organization' />
          <Button
            color='teal'
            content={isUpdating ? 'Update' : 'Create'}
            disabled={saving}
            fluid
            loading={saving}
            form={props.form}
            type='submit'
            size='large' />
          {
            isUpdating && (<Button color='google plus' content='Delete' fluid onClick={handleOpen} size='large' />)
          }
          <Divider horizontal>other</Divider>
          <Button fluid icon='mail outline' content='Send Email' disabled />
          <Button fluid icon='print' content='Print' disabled />
          <Button fluid icon='file alternate outline' content='View Records' disabled />
          <Button fluid icon='share square' content='Email Records' disabled />
        </Grid.Column>
      </Grid>

      <ModalDelete
        duckDetail={organizationDetailDuck}
        onClose={handleClose}
        open={open} />
    </>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const organizationDetail = organizationDetailDuck.selectors.detail(state)
      let initialValues = { ...organizationDetail.item }

      delete initialValues.logo
      delete initialValues.thumbnail

      return {
        organizationDetail,
        initialValues,
      }
    },
    {
      post: organizationDetailDuck.creators.post,
      put : organizationDetailDuck.creators.put,
    }
  ),
  reduxForm({
    form            : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate        : values  => {
      const schema = {
        legal_name: YupFields.name,
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(OrganizationSection)

