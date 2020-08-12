import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field,FieldArray, reduxForm } from 'redux-form'
import { Button, Checkbox,Form, Header, Input,Select, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import priceMasterDetailDuck from '@reducers/price-master/detail'

function PriceList({ fields, meta: { error, submitFailed } }) {
  const _handleAddBtnClick = () => fields.push({ ...PriceInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const PriceInitialState = {
    location: '',
    price   : ''
  }

  return (
    <>
      <Header as='h6' className='section-header' color='blue'>Price</Header>
      <div>
        {
          fields.map((item, index) => (
            <Form.Group key={index} widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Location'
                name='location'
                options={[
                  { key: 1, value: 1, text: 'test' }
                ]}
                placeholder='Select Location'
                selectOnBlur={false}/>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='Price'
                name={`${item}.price`}
                placeholder='Enter price'
                type='number'/>
              <Form.Button
                data-index={index} icon='trash alternate outline' label='&nbsp;'
                onClick={_handleRemoveBtnClick}
                type='button'/>
            </Form.Group>
          ))
        }
        <div>
          <Button
            content='Add Price' onClick={_handleAddBtnClick}
            type='button'/>
        </div>
        {
          submitFailed && error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }
      </div>
    </>
  )
}

const PriceMasterForm = props => {
  const {
    priceMasterDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: priceMasterDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(priceMasterDetail.mode), [ priceMasterDetail.mode ])
  const isUpdating = Boolean(priceMasterDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header cls-MainHeader'>{isUpdating ? 'Update' : 'New'} Price</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths={3}>
            <Field
              component={FormField}
              control={Select}
              label='Type'
              name='type'
              options={[
                { key: 1, value: 1, text: 'test' }
              ]}
              placeholder='Select status'
              selectOnBlur={false}/>
            <Field
              component={FormField}
              control={Select}
              label='Sub Category'
              name='sub_category'
              options={[
                { key: 1, value: 1, text: 'test' }
              ]}
              placeholder='Select status'
              selectOnBlur={false}/>
            <Field
              autoComplete='off'
              autoFocus
              component={FormField}
              control={Input}
              label='Name'
              name='Name'
              placeholder='Enter Name'/>
          </Form.Group>
          <Form.Group widths={3}>
            <Field
              component={FormField}
              control={Input}
              icon='upload'
              label='Image'
              name='image'
              placeholder='Upload image'
              type='file'/>
            <Field
              component={FormField}
              control={Checkbox}
              label='Active'
              name='status'
              type='checkbox'/>

            <Form.Field/>
          </Form.Group>

          <FieldArray
            component={PriceList}
            name='price_location'
            title='Price Location'/>

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
                className='cls-saveButton'
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
      const priceMasterDetail = priceMasterDetailDuck.selectors.detail(state)

      return {
        priceMasterDetail,
        initialValues: priceMasterDetail.item
      }
    },
    {
      post     : priceMasterDetailDuck.creators.post,
      put      : priceMasterDetailDuck.creators.put,
      resetItem: priceMasterDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'price-master-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        type: Yup.string().required('Type is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PriceMasterForm)
