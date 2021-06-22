
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field } from 'redux-form'
import { Button, Form, Select, Input } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

const AssignRole = ({ fields, meta: { error, submitFailed }, ...props }) => {
  useEffect(() => {
    if(fields.length === 0) _handleAddBtnClick() // Add a default item
  }, [])

  useEffect(() => {

  }, [])

  const _handleAddBtnClick = () => fields.push({ ...departmentInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const departmentInitialState = {
    role: ''
  }

  return (
    <>
      {
        fields.map((item, index) => (
          <Form.Group key={index}>
            <Field
              component={FormField}
              control={Input}
              fluid
              label='Assign Role'
              name={`role${index}`}
              placeholder='Assign role'
              selectOnBlur={false}
              style={{ width: '260px' }}/>
            <Field
              component={FormField}
              control={Input}
              fluid
              label='Wage'
              name={`wage${index}`}
              placeholder='Enter wage $'
              selectOnBlur={false}
              style={{ width: '160px' }}
              type='number'/>

            <Field
              component={FormField}
              control={Select}
              fluid
              label='Wage Type'
              name={`wage_type${index}`}
              options={[
                { key: 1, value: 'per_hour', text: 'per Hour' },
                { key: 2, value: 'per_year', text: 'per Year' }
              ]}
              placeholder='Select wage type'
              selectOnBlur={false}
              style={{ width: '180px' }}/>

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
            basic color='teal' content='Assign Additional Role'
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

export default AssignRole

