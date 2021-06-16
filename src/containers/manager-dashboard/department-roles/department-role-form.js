import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Select, Modal, Grid } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate } from '@lib/utils/functions'

import locationDuck from '@reducers/location'
import departmentRoleDetailDuck from '@reducers/manager-dashboard/department-role/detail'

const DepartmentRoleForm = (props) => {
  const {
    departmentRoleDetail,
    locations,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(()=> {

  }, [ ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = () => {
  }

  const isOpened = useMemo(() => getIsOpened(departmentRoleDetail.mode), [
    departmentRoleDetail.mode
  ])

  const isUpdating = departmentRoleDetail.mode === 'UPDATE' ? true : false

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Department { '&' } Roles
          </Header>
          <Grid>
            <Grid.Column width={16}>
              <Field
                component={FormField}
                control={Select}
                fluid
                label='Department'
                name='department'
                options={[
                  { key: 1, value: 'management', text: 'Management' },
                  { key: 2, value: 'training', text: 'Training' },
                  { key: 3, value: 'grooming', text: 'Grooming' }
                ]}
                placeholder='Select department'
                selectOnBlur={false}/>
            </Grid.Column>
            <Grid.Column width={16}>
              <Field
                component={FormField}
                control={Select}
                fluid
                label='Roles'
                multiple={true}
                name='role'
                options={[
                  { key: 1, value: 'manager', text: 'Manager' },
                  { key: 2, value: 'trainer', text: 'Trainer' },
                  { key: 3, value: 'groomer', text: 'Groomer' }
                ]}
                placeholder='Select roles'
                selectOnBlur={false}/>
            </Grid.Column>
            <Grid.Column width={16}>
              <Field
                component={FormField}
                control={Select}
                label='Locations'
                multiple={true}
                name='location'
                options={locations.items.map((_location) => ({
                  key  : _location.id,
                  value: _location.id,
                  text : `${_location.name}`
                }))}
                placeholder='Select locations'
                selectOnBlur={false}/>
            </Grid.Column>
          </Grid>

          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save Changes' : 'Add Department & Roles'}
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default  compose(
  connect(
    (state) => {
      const locations = locationDuck.selectors.list(state)
      const departmentRoleDetail = departmentRoleDetailDuck.selectors.detail(state)

      return {
        locations,
        departmentRoleDetail
      }
    },
    {
      getLocations: locationDuck.creators.get,
      post        : departmentRoleDetailDuck.creators.post,
      put         : departmentRoleDetailDuck.creators.put,
      resetItem   : departmentRoleDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'department-role-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: Yup.string().required('Name is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(DepartmentRoleForm)

