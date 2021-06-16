
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field } from 'redux-form'
import { Button, Form, Select } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import locationDuck from '@reducers/location'

const DepartmentRole = ({ locations, fields, meta: { error, submitFailed }, ...props }) => {
  useEffect(() => {
    if(fields.length === 0) _handleAddBtnClick() // Add a default item
  }, [])

  useEffect(() => {
    props.getLocations()
  }, [])

  const _handleAddBtnClick = () => fields.push({ ...departmentInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const departmentInitialState = {
    number: '',
    type  : null
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
              name='department'
              options={[
                { key: 1, value: 'management', text: 'Management' },
                { key: 2, value: 'training', text: 'Training' },
                { key: 3, value: 'grooming', text: 'Grooming' }
              ]}
              placeholder='Select'
              selectOnBlur={false}
              style={{ width: '260px' }}/>
            <Field
              component={FormField}
              control={Select}
              fluid
              label='Role'
              multiple={true}
              name='role'
              options={[
                { key: 1, value: 'manager', text: 'Manager' },
                { key: 2, value: 'trainer', text: 'Trainer' },
                { key: 3, value: 'groomer', text: 'Groomer' }
              ]}
              placeholder='Select'
              selectOnBlur={false}
              style={{ width: '260px' }}/>
            <Field
              component={FormField}
              control={Select}
              label='Select Location'
              multiple={true}
              name='location'
              options={locations.items.map((_location) => ({
                key  : _location.id,
                value: _location.id,
                text : `${_location.name}`
              }))}
              placeholder='Select location'
              selectOnBlur={false}
              style={{ width: '260px' }}/>
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
      const locations = locationDuck.selectors.list(state)

      return {
        locations
      }
    },
    {
      getLocations: locationDuck.creators.get
    }
  )
)(DepartmentRole)

