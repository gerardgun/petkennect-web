import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import reportStatusDetailDuck from '@reducers/pet/medication-setting/medication-report-status/detail'

const ReportStatusForm = (props) => {
  const {
    reportStatusDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  useEffect(() => {
    if(reportStatusDetail.item.id)
      props.get(reportStatusDetail.item.id)
  }, [ reportStatusDetail.item.id ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: reportStatusDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(reportStatusDetail.mode), [
    reportStatusDetail.mode
  ])
  const isUpdating = Boolean(reportStatusDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Medication Report Status
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Report Status'
              name='name'
              placeholder='Enter status'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              label='Charges Applies'
              name='charges'
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
  connect(
    (state) => {
      const reportStatusDetail = reportStatusDetailDuck.selectors.detail(state)

      return {
        reportStatusDetail,
        initialValues: { ...reportStatusDetail.item }
      }
    },
    {
      get      : reportStatusDetailDuck.creators.get,
      post     : reportStatusDetailDuck.creators.post,
      put      : reportStatusDetailDuck.creators.put,
      resetItem: reportStatusDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'medication-report-status-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: Yup.string().required('Status is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ReportStatusForm)
