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
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import organizationDetailDuck from '@reducers/organization/detail'

export const formId = 'organization-create-information'

const OrganizationSection = props => {
  const {
    organizationDetail,
    error, handleSubmit, reset, // redux-form
    history,
    match,
    post,
    put
  } = props

  // For Modal Delete
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    if(organizationDetail.status === 'DELETED')
      history.replace('/organization')
  }, [ organizationDetail.status ])

  const _handleSubmit = values => {
    const finalValues = Object.entries(values)
      .filter(([ , value ]) => Boolean(value))
      .reduce((a, [ key, value ]) => ({ ...a, [key]: value }), {})

    if(isUpdating)
      return put({ id: organizationDetail.item.id, ...finalValues })
        .catch(parseResponseError)
    else
      return post(finalValues)
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
    state => {
      const organizationDetail = organizationDetailDuck.selectors.detail(state)
      let initialValues = { ...organizationDetail.item }

      delete initialValues.logo
      delete initialValues.thumbnail

      return {
        organizationDetail,
        initialValues
      }
    },
    {
      post: organizationDetailDuck.creators.post,
      put : organizationDetailDuck.creators.put
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

