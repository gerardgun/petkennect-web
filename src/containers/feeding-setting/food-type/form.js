import React, { useMemo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select, Grid } from 'semantic-ui-react'
import Switch from 'react-switch'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import foodTypeDetailDuck from '@reducers/pet/feeding-setting/food-type/detail'

const FoodTypeForm = (props) => {
  const {
    foodTypeDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const [ checked, setChecked ] = useState(false)

  useEffect(() => {
    if(foodTypeDetail.item.id) {
      props.get(foodTypeDetail.item.id)
      setChecked(foodTypeDetail.item.charges)
    }
  }, [ foodTypeDetail.item.id ])

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
        .put({ id: foodTypeDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(foodTypeDetail.mode), [
    foodTypeDetail.mode
  ])
  const isUpdating = Boolean(foodTypeDetail.item.id)

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
            {isUpdating ? 'Update' : 'Add'} Food Type
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Food Type'
              name='name'
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
            <Grid.Column computer={11}>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Charges Type'
                  name='charge_type'
                  options={
                    [ { key: 1, value: 'No Charge' , text: 'No Charge' },
                      { key: 1, value: 'Per Day' , text: 'Per Day' },
                      { key: 1, value: 'Per Meal', text: 'Per Meal' },
                      { key: 1, value: 'Per Bag' , text: 'Per Bag' } ]
                  }
                  placeholder='Select Charges'
                  required/>
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
      const foodTypeDetail = foodTypeDetailDuck.selectors.detail(state)
      let price
      if(foodTypeDetail.item.id)
        price = foodTypeDetail.item.price
      else
        price = 0

      return {
        foodTypeDetail,
        initialValues: { ...foodTypeDetail.item, price: price }
      }
    },
    {
      get      : foodTypeDetailDuck.creators.get,
      post     : foodTypeDetailDuck.creators.post,
      put      : foodTypeDetailDuck.creators.put,
      resetItem: foodTypeDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'food-type-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        name: Yup.string().required('Name is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FoodTypeForm)
