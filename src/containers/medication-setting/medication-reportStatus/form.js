import React, { useMemo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Grid } from 'semantic-ui-react'
import Switch from 'react-switch'
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

  const [ checked, setChecked ] = useState(false)

  useEffect(() => {
    if(reportStatusDetail.item.id) {
      props.get(reportStatusDetail.item.id)
      setChecked(reportStatusDetail.item.charges)
    }
  }, [ reportStatusDetail.item.id ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleSwitchChange = (value) => {
    setChecked(value)
  }

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
          <Grid>
            <Grid.Column className='mt24' computer={5}>
              <Switch
                checked={checked}
                className='react-switch'
                height={21}
                onChange={_handleSwitchChange}
                onColor='#00aa9f'
                width={40}/>
              <span className='ml16 save-button-align'>Charges Applies</span></Grid.Column>
            <Grid.Column computer={4}>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Price'
                  min={0}
                  name='price'
                  placeholder='Enter Price'
                  required
                  type='number'/>
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
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content='Save'
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
      let price
      if(reportStatusDetail.item.id)
        price = reportStatusDetail.item.price
      else
        price = 0

      return {
        reportStatusDetail,
        initialValues: { ...reportStatusDetail.item, price: price }
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
