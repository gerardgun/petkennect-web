
import React, { Fragment, useEffect } from 'react'
import { Field } from 'redux-form'
import { Button, Form, Select } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputMask from '@components/Common/InputMask'
import { PhoneTypeOptions } from '@lib/constants/client'

const PhoneList = ({ fields, meta: { error, submitFailed } }) => {
  useEffect(() => {
    if(fields.length === 0) _handleAddBtnClick() // Add a default item
  }, [])

  const _handleAddBtnClick = () => fields.push({ ...phoneInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const phoneInitialState = {
    number: '',
    type  : null
  }

  return (
    <>
      {
        fields.map((item, index) => (
          <Form.Group key={index} widths={3}>
            <Field
              component={FormField}
              control={InputMask}
              label='Phone Number'
              mask='(999) 999-9999'
              name={`${item}.number`}
              placeholder='Enter phone number'
              required
              type='tel'/>
            <Field
              component={FormField}
              control={Select}
              label='Type'
              name={`${item}.type`}
              options={PhoneTypeOptions}
              placeholder='Select a type'
              required
              selectOnBlur={false}/>
            {
              index !== 0 && (
                <Form.Button
                  basic color='red' content='Delete'
                  data-index={index}
                  icon='trash alternate outline'
                  label='&nbsp;'
                  onClick={_handleRemoveBtnClick}
                  type='button'/>
              )
            }
          </Form.Group>
        ))
      }

      <Form.Group widths='equal'>
        <Form.Field>
          <Button
            basic color='teal' content='Add Phone Number'
            icon='plus'
            onClick={_handleAddBtnClick}
            type='button'/>
        </Form.Field>
      </Form.Group>

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

export default PhoneList
