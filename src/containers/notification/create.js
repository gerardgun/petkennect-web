import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Select, Input, Modal, TextArea, Checkbox } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError } from '@lib/utils/functions'

import notificationDetailDuck from '@reducers/notification/detail'

const NotificationCreateForm = props => {
  const {
    notificationDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: notificationDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(notificationDetail.mode), [ notificationDetail.mode ])
  const isUpdating = Boolean(notificationDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Notification</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='2'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='From Date'
              name='from_date'
              required
              type='date'/>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='To Date'
              name='to_date'
              required
              type='date'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Location'
              name='location'
              options={[
                { key: 1, value: 'All', text: 'All' },
                { key: 2, value: 'SA-03', text: 'SA-03' },
                { key: 3, value: 'SH-01', text: 'SH-01' },
                { key: 4, value: 'GF-03', text: 'GF-03' },
                { key: 5, value: 'SB8', text: 'SB8' }
              ]
              }
              placeholder='Select Location'
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={TextArea}
              label='Comment'
              name='comment'
              required/>
          </Form.Group>
          <Form.Group>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Active'
              name='status'/>
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
    state => {
      const notificationDetail = notificationDetailDuck.selectors.detail(state)

      return {
        notificationDetail,
        initialValues: notificationDetail.item
      }
    },
    {
      post     : notificationDetailDuck.creators.post,
      put      : notificationDetailDuck.creators.put,
      resetItem: notificationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'notification-create-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(NotificationCreateForm)
