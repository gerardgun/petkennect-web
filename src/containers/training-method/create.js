import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import trainingMethodDetailDuck from '@reducers/training-method/detail'
import trainingReasonDuck from '@reducers/training-reason'

const TrainingMethodForm = props => {
  const {
    trainingMethodDetail,
    trainingReason,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: trainingMethodDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(trainingMethodDetail.mode), [ trainingMethodDetail.mode ])
  const isUpdating = Boolean(trainingMethodDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header cls-MainHeader'>{isUpdating ? 'Update' : 'Add'} Training Method</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Name'
              name='name'
              placeholder='Enter name'
              required/>
            <Field
              component={FormField}
              control={Select}
              label='Reason'
              name='reason'
              options={trainingReason.items.map((_trainingReason) => ({
                key  : _trainingReason.id,
                value: _trainingReason.id,
                text : `${_trainingReason.name}`
              }))}
              placeholder='Select reason'
              required
              search
              selectOnBlur={false}/>
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
                className='cls-cancelButton'
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
      const trainingMethodDetail = trainingMethodDetailDuck.selectors.detail(state)

      return {
        trainingMethodDetail,
        trainingReason: trainingReasonDuck.selectors.list(state),
        initialValues : trainingMethodDetail.item
      }
    },
    {
      post             : trainingMethodDetailDuck.creators.post,
      put              : trainingMethodDetailDuck.creators.put,
      resetItem        : trainingMethodDetailDuck.creators.resetItem,
      getTrainingReason: trainingReasonDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'training-method-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name  : Yup.string().required('Name is required'),
        reason: Yup.string().required('Reason is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(TrainingMethodForm)
