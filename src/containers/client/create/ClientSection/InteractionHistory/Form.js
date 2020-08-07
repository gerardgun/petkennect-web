import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Header, Modal, Select, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'
import clientCommentDetailDuck from '@reducers/client/comment/detail'
import employeeDuck from '@reducers/employee'
import locationDuck from '@reducers/location'

const CommentForm = (props) => {
  const {
    employees,
    locations,
    getEmployees,
    getLocations,
    // clientDetail,
    clientCommentDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form,
  } = props

  const { client: clientId } = useParams()

  useEffect(() => {
    if(clientId) {
      getEmployees()
      getLocations()
    }
  }, [ clientId ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props
        .put({ id: clientCommentDetail.item.id, client_id: clientId, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values, client_id: clientId })
        .then(_handleClose)
        .catch(parseResponseError)
  }
  const isOpened = useMemo(() => getIsOpened(clientCommentDetail.mode), [
    clientCommentDetail.mode
  ])
  const isUpdating = Boolean(clientCommentDetail.item.id)

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
            {isUpdating ? 'Update' : 'Create'} Comment
          </Header>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Location'
              name='location'
              options={locations.items.map((_location) => ({
                key  : _location.id,
                value: _location.id,
                text : _location.code
              }))}
              placeholder='Select location'
              required
              search
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Select}
              label='Staff'
              name='employee'
              options={employees.items.map(_employee=>({
                key  : _employee.id,
                value: _employee.id,
                text : `${_employee.first_name} ${_employee.last_name}`
              }))}
              placeholder='Select staff'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={TextArea}
              label='Comments'
              name='comment'
              placeholder='Enter comments'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              label='Follow up'
              name='follow_up'
              type='checkbox'/>
          </Form.Group>

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
                content={isUpdating ? 'Save changes' : 'Create'}
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
    (state) => {
      const clientCommentDetail = clientCommentDetailDuck.selectors.detail(
        state
      )
      const employees = employeeDuck.selectors.list(state)
      const locations = locationDuck.selectors.list(state)

      return {
        clientDetail : clientDetailDuck.selectors.detail(state),
        clientCommentDetail,
        initialValues: clientCommentDetail.item,
        employees,
        locations
      }
    },
    {
      post        : clientCommentDetailDuck.creators.post,
      put         : clientCommentDetailDuck.creators.put,
      resetItem   : clientCommentDetailDuck.creators.resetItem,
      getEmployees: employeeDuck.creators.get,
      getLocations: locationDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'client-comment-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        location: YupFields.num_required,
        employee: YupFields.num_required,
        comment : YupFields.comment
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(CommentForm)
