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

import medicationDetailDuck from '@reducers/pet/medication-setting/medication/detail'

const MedicationForm = (props) => {
  const {
    medicationDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const [ checked, setChecked ] = useState(false)

  useEffect(() => {
    if(medicationDetail.item.id) {
      props.get(medicationDetail.item.id)
      setChecked(medicationDetail.item.charges)
    }
  }, [ medicationDetail.item.id ])

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSwitchChange = (value) => {
    setChecked(value)
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: medicationDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(medicationDetail.mode), [
    medicationDetail.mode
  ])
  const isUpdating = Boolean(medicationDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Medication
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Medication Name'
              name='name'
              placeholder='Enter name'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Purpose'
              name='purpose'
              placeholder='Enter purpose'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Type'
              name='type'
              placeholder='Enter type'
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
      const medicationDetail = medicationDetailDuck.selectors.detail(state)
      let price
      if(medicationDetail.item.id)
        price = medicationDetail.item.price
      else
        price = 0

      return {
        medicationDetail,
        initialValues: { ...medicationDetail.item, price: price }
      }
    },
    {
      get      : medicationDetailDuck.creators.get,
      post     : medicationDetailDuck.creators.post,
      put      : medicationDetailDuck.creators.put,
      resetItem: medicationDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'medication-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: Yup.string().required('Medication is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(MedicationForm)
