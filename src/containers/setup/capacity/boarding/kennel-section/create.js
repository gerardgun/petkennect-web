import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Select, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import kennelDetailDuck from  '@reducers/order/service/boarding/kennel/detail'
import kennelTypeDuck from '@reducers/order/service/boarding/kennel/type'

const KennelFormModal = (props) => {
  const {
    kennelDetail,
    kennelTypeList,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  useEffect(()=> {
    if(kennelDetail.item.id) props.get(kennelDetail.item.id)

    if(kennelTypeList.items.length === 0) props.getKennelTypes()
  }, [ kennelDetail.item.id ])

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: kennelDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isUpdating = Boolean(kennelDetail.item.id)
  const open = [ 'CREATE', 'UPDATE' ].includes(kennelDetail.mode)

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
            {isUpdating ? 'Update' : 'New'} Kennel
          </Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Kennel ID'
              name='code'
              placeholder='Enter ID'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={TextArea}
              label='Description'
              name='description'
              placeholder='Enter description'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Lodging Type'
              name='kennel_id'
              options={
                kennelTypeList.items.map(({ id, name }) => ({
                  text : name,
                  value: id
                }))
              }
              placeholder='Select lodging type'
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
      const kennelDetail = kennelDetailDuck.selectors.detail(state)

      return {
        kennelDetail,
        kennelTypeList: kennelTypeDuck.selectors.list(state),
        initialValues : kennelDetail.item
      }
    },
    {
      get           : kennelDetailDuck.creators.get,
      getKennelTypes: kennelTypeDuck.creators.get,
      post          : kennelDetailDuck.creators.post,
      put           : kennelDetailDuck.creators.put,
      resetItem     : kennelDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'kennel-capacity',
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {

      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(KennelFormModal)
