import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'
import _times from 'lodash/times'
import faker from 'faker'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import clientDetailDuck from '@reducers/client/detail'
import clientCommentDetailDuck from '@reducers/client/comment/detail'

const staffMembers = _times(10, index => ({ key: index, value: index, text: `${faker.name.firstName()} ${faker.name.lastName()}` }))

const CommentForm = props => {
  const {
    // clientDetail,
    clientCommentDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () => props.resetItem()

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: clientCommentDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post(values)
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(clientCommentDetail.mode), [ clientCommentDetail.mode ])
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
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Create'} Comment</Header>
          <Form.Group widths='equal'>
            <Field
              autoComplete='off'
              autoFocus
              component={FormField}
              control={Form.Input}
              label='Date *'
              name='date'
              type='date'/>
            <Field
              component={FormField}
              control={Form.Select}
              label='Location *'
              name='location_id'
              options={[
                { key: 1, value: 1, text: '02-RH' },
                { key: 2, value: 2, text: '03-VP' },
                { key: 3, value: 3, text: '04-HH' },
                { key: 4, value: 4, text: '05-SC' }
              ]}
              placeholder='Select location'
              search
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Form.Select}
              label='Staff *'
              name='staff_id'
              options={staffMembers}
              placeholder='Select staff'
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.TextArea}
              label='Comments *'
              name='comment'
              placeholder='Enter comments'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Checkbox}
              label='Follow up'
              name='follow_up'
              type='checkbox'/>
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
    state => {
      const clientCommentDetail = clientCommentDetailDuck.selectors.detail(state)

      return {
        clientDetail : clientDetailDuck.selectors.detail(state),
        clientCommentDetail,
        initialValues: clientCommentDetail.item
      }
    },
    {
      post     : clientCommentDetailDuck.creators.post,
      put      : clientCommentDetailDuck.creators.put,
      resetItem: clientCommentDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'client-comment-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        date       : YupFields.date,
        location_id: YupFields.num_required,
        staff_id   : YupFields.num_required,
        comment    : YupFields.comment
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(CommentForm)

