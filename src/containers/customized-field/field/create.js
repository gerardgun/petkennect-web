import React, { useMemo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Select, Checkbox, Modal } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import customizedFieldDetailDuck from '@reducers/customized-field/field/detail'

export const SelectValueList = ({ fields, meta: { error, submitFailed } }) => {
  const _handleAddBtnClick = () => fields.push({ ...selectValueInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const selectValueInitialState = {
    name: ''
  }

  return (
    <>
      <Header as='h6' className='section-header'>Values</Header>
      {
        fields.map((item, index) => (
          <Form.Group key={index} widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Input}
              name={`${item}.name`}
              placeholder='Enter value'/>
            <Form.Button
              data-index={index} icon='trash alternate outline' label=''
              onClick={_handleRemoveBtnClick}
              type='button'/>
          </Form.Group>
        ))
      }
      <div>
        <Button
          color='teal' content='New Value' icon='plus circle'
          onClick={_handleAddBtnClick} type='button'/>
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
    </>
  )
}

const FieldCreateForm = props => {
  const {
    customizedFieldDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const [ InputType, setInputType ] = useState(1)

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  useEffect(() => {
    setInputType(customizedFieldDetail.item.display_type)
  }, [ customizedFieldDetail ])

  const _handleInputTypeChange = (value) => setInputType(value)

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: customizedFieldDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(customizedFieldDetail.mode), [ customizedFieldDetail.mode ])
  const isUpdating = Boolean(customizedFieldDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>{isUpdating ? 'Update' : 'Add'} Field</Header>
          <Field component='input' name='id' type='hidden'/>
          <Field component='input' name='eav_entity_id' type='hidden'/>
          <Field component='input' name='entity_group' type='hidden'/>

          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Name'
              name='name'
              placeholder='Enter name'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Display Name'
              name='display_name'
              placeholder='Enter display name'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              disabled={isUpdating}
              label='Type'
              name='display_type'
              onChange={_handleInputTypeChange}
              options={[
                { key: 1, value: 'C', text: 'Checkbox' },
                { key: 2, value: 'D', text: 'Dropdown' },
                { key: 3, value: 'R', text: 'Radio' },
                { key: 4, value: 'I', text: 'Input Text' },
                { key: 5, value: 'T', text: 'Text Area' }
              ]}
              placeholder='Select an option'
              required
              selectOnBlur={false}/>
          </Form.Group>
          <label>Options</label>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Required'
              name='is_required'
              type='checkbox'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Editable by Client'
              name='is_editable_by_client'
              type='checkbox'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Editable by Employee'
              name='is_editable_by_employee'
              type='checkbox'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Checkbox}
              format={Boolean}
              label='Visible by Client'
              name='is_visible_by_client'
              type='checkbox'/>
          </Form.Group>

          {
            (InputType === 'D' || InputType === 'R')
            && <FieldArray
              component={SelectValueList}
              name='values'
              title='Select Value List'/>
          }

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
      const customizedFieldDetail = customizedFieldDetailDuck.selectors.detail(state)

      return {
        customizedFieldDetail,
        initialValues: { ...customizedFieldDetail.item }
      }
    },
    {
      post     : customizedFieldDetailDuck.creators.post,
      put      : customizedFieldDetailDuck.creators.put,
      resetItem: customizedFieldDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'field-create-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name        : Yup.string().required('Name is required'),
        display_name: Yup.string().required('Display name is required'),
        display_type: Yup.string().required('Display type is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FieldCreateForm)
