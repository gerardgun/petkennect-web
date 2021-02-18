import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'
import { Form, Header, Input } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputMask from '@components/Common/InputMask'

const PeopleList = ({ fields, meta: { error, submitFailed }, type }) => {
  // const _handleAddBtnClick = () => fields.push({ ...personInitialState })
  // const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  // const personInitialState = {
  //   name    : '',
  //   relation: '',
  //   phone   : ''
  // }

  return (
    <>
      <Header as='h6' className='section-header' color='blue' >
        {
          type === 'authorized' ? 'Additional People Authorized to Pick Up' : 'Emergency Contacts Information'
        }
      </Header>
      {
        fields.map((item, index) => (
          <Form.Group key={index} widths='equal'>
            <Field
              autoComplete='off'
              component={FormField}
              control={Input}
              label={'Name'}
              name={`${item}.name`}
              placeholder='Enter first and last name'
              required/>
            <Field
              autoComplete='off'
              component={FormField}
              control={Input}
              label='Relation'
              name={`${item}.relation`}
              placeholder='Enter relation'
              required/>
            <Field
              component={FormField}
              control={InputMask}
              label='Phone Number'
              mask='(999) 999-9999'
              name={`${item}.phone`}
              placeholder='Enter phone number'
              required={type === 'contact'}
              type='tel'/>
            {/* <Form.Button
              basic color='red' content='Delete'
              data-index={index}
              icon='trash alternate outline'
              label='&nbsp;'
              onClick={_handleRemoveBtnClick}
              type='button'/> */}
          </Form.Group>
        ))
      }

      {/* <div>
        <br/>
        <Button
          basic color='teal' content={type === 'authorized' ? 'Additional Authorized Person to Pick up' : 'Add Contact'}
          icon='plus'
          onClick={_handleAddBtnClick}
          type='button'/>
      </div> */}

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

PeopleList.propTypes = {
  type: PropTypes.oneOf([ 'authorized', 'contact' ])
}

PeopleList.defaultProps = {
  type: 'authorized'
}

export default PeopleList
