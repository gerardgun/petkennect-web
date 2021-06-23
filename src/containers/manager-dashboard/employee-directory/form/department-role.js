
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field } from 'redux-form'
import { Button, Form, Select, Input } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import wagesDuck from '@reducers/manager-dashboard/employee/employee-wage-history'

const DepartmentRole = ({ wages, fields, meta: { error, submitFailed }, ...props }) => {
  useEffect(() => {
    if(fields.length === 0) _handleAddBtnClick() // Add a default item
  }, [])

  useEffect(() => {
    props.getWages()
  }, [])

  const _handleAddBtnClick = () => fields.push({ ...departmentInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const departmentInitialState = {
    department: ''
  }

  return (
    <>
      {
        fields.map((item, index) => (
          <Form.Group key={index}>
            <Field
              component={FormField}
              control={Select}
              fluid
              label='Department'
              name={`department${index}`}
              options={[
                { key: 1, value: 'management', text: 'Management' },
                { key: 2, value: 'training', text: 'Training' },
                { key: 3, value: 'grooming', text: 'Grooming' }
              ]}
              placeholder='Select department'
              selectOnBlur={false}
              style={{ width: '240px' }}/>
            <Field
              component={FormField}
              control={Select}
              fluid
              label='Role'
              name={`role${index}`}
              options={[
                { key: 1, value: 'manager', text: 'Manager' },
                { key: 2, value: 'trainer', text: 'Trainer' },
                { key: 3, value: 'groomer', text: 'Groomer' }
              ]}
              placeholder='Select role'
              selectOnBlur={false}
              style={{ width: '220px' }}/>
            <Field
              component={FormField}
              control={Input}
              fluid
              label='Rate'
              name={`rate${index}`}
              placeholder='Enter rate'
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
              style={{ width: '200px' }}/>

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
            basic color='teal' content='Add Department & Role'
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

export default  compose(
  connect(
    (state) => {
      const wages = wagesDuck.selectors.list(state)

      return {
        wages
      }
    },
    {
      getWages: wagesDuck.creators.get
    }
  )
)(DepartmentRole)

