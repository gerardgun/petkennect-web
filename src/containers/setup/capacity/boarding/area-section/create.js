import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Header, Input, Modal, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import petKindDuck from '@reducers/pet/kind'
import kennelAreaDetailDuck from  '@reducers/order/service/boarding/kennel/area/detail'

const KennelAreaFormModal = (props) => {
  const {
    petKindList,
    kennelAreaDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(()=> {
    if(kennelAreaDetail.item.id) props.get(kennelAreaDetail.item.id)

    if(petKindList.items.length === 0) props.getPetKinds()
  }, [ kennelAreaDetail.item.id ])

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: kennelAreaDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(kennelAreaDetail.item.id)
  const open = [ 'CREATE', 'UPDATE' ].includes(kennelAreaDetail.mode)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            {isUpdating ? 'Update' : 'New'} Kennel Area
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Area Name'
              name='name'
              placeholder='Enter area name'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Species'
              name='pet_kind_id'
              options={
                petKindList.items.map(({ id, name }) => ({
                  text : name,
                  value: id
                }))
              }
              placeholder='Select Species'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Surcharge'
              name='surcharge'
              type='checkbox'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Charge Type'
              name='charge_type'
              options={[
                { value: 'No Charge', text: 'No Charge' },
                { value: 'Per Stay', text: 'Per Stay' },
                { value: 'Per Night', text: 'Per Night' }
              ]}
              placeholder='Select charge type'
              required
              search
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Price'
              name='price'
              placeholder='0.00'
              required
              type='number'/>
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
                basic
                className='w120'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={isUpdating ? 'Save changes' : 'Done'}
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
      const kennelAreaDetail = kennelAreaDetailDuck.selectors.detail(state)

      return {
        petKindList  : petKindDuck.selectors.list(state),
        kennelAreaDetail,
        initialValues: kennelAreaDetail.item
      }
    },
    {
      get        : kennelAreaDetailDuck.creators.get,
      getPetKinds: petKindDuck.creators.get,
      post       : kennelAreaDetailDuck.creators.post,
      put        : kennelAreaDetailDuck.creators.put,
      resetItem  : kennelAreaDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'kennel-area-capacity',
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {

      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(KennelAreaFormModal)
