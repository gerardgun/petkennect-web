import React, { useMemo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import { Button, Form, Header, Select, Modal, Grid, Input, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputMask from '@components/Common/InputMask'
import { syncValidate } from '@lib/utils/functions'

import roleDetailDuck from '@reducers/system-user-and-role/role/detail'

const RoleForm = (props) => {
  const {
    roleDetail,
    error, handleSubmit, reset // redux-form
  } = props

  useEffect(()=> {

  }, [])

  const saving = [ 'POSTING', 'PUTTING' ].includes(roleDetail.status)
  const opened = [ 'CREATE', 'UPDATE' ].includes(roleDetail.mode)
  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = () => {
  }

  const isUpdating = roleDetail.mode === 'UPDATE' ? true : false

  return (
    <>
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id='user-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'Add'} Role
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Grid>
            <Grid.Column width={16}>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Role'
                  name='role'
                  placeholder='Enter role'
                  required/>
              </Form.Group>

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
                disabled={saving}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save Changes' : 'Save'}
                disabled={saving}
                loading={saving}
                type='submit'/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
    </>
  )
}

export default  compose(
  connect(
    (state) => {
      const roleDetail = roleDetailDuck.selectors.detail(state)

      return {
        roleDetail
      }
    },
    {
      post     : roleDetailDuck.creators.post,
      put      : roleDetailDuck.creators.put,
      resetItem: roleDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'role-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        role: Yup.string().required('Role is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(RoleForm)

