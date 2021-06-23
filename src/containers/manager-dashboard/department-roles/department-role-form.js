
import React, { Fragment, useEffect } from 'react'
import { Field } from 'redux-form'
import { Button, Form, Select, Input } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import './styles.scss'

const DepartmentRole = ({ fields, sidebarHidden, meta: { error, submitFailed }, ...props }) => {
  useEffect(() => {
    if(fields.length === 0) _handleAddBtnClick() // Add a default item
  }, [])

  useEffect(() => {

  }, [])

  const _handleAddBtnClick = () => fields.push({ ...departmentInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const departmentInitialState = {
    department: ''
  }

  return (
    <div>
      {
        fields.map((item, index) => (
          <Form.Group className='manager-department-role-style' key={index}>
            <Field
              className={sidebarHidden === true ? 'field-input-width-sidebar-min' : 'field-input-width-sidebar-max'}
              component={FormField}
              control={Input}
              fluid
              label='Department'
              name={`department${index}`}
              placeholder='Enter Department'
              selectOnBlur={false}/>
            <Field
              className={sidebarHidden === true ? 'field-dropdown-width-sidebar-min' : 'field-dropdown-width-sidebar-max'}
              component={FormField}
              control={Select}
              fluid
              label='Roles'
              multiple={true}
              name={`role${index}`}
              options={[
                { key: 1, value: 'manager', text: 'Manager' },
                { key: 2, value: 'trainer', text: 'Trainer' },
                { key: 3, value: 'groomer', text: 'Groomer' }
              ]}
              placeholder='Select roles'
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

      <Form.Group className='pt4' widths='equal'>
        <Form.Field width={10}>
          <Button
            basic color='teal' content='Add Department & Role'
            icon='plus'
            onClick={_handleAddBtnClick}
            type='button'/>
        </Form.Field>
        <Form.Field width={4}>
          <Button
            basic color='teal' content='Save Changes'
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
    </div>
  )
}

export default DepartmentRole

