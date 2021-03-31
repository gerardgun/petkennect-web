import React from 'react'
import { Field, FieldArray } from 'redux-form'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import { Form, Input } from 'semantic-ui-react'

function AddonTime({ name }) {
  let _handleAddBtnClick

  const _handleAddTime = () => {
    _handleAddBtnClick()
  }
  const AddTime = ({ fields, meta: { error, submitFailed } }) => {
    _handleAddBtnClick = () => fields.push({ ...timeInitialState })
    const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

    const timeInitialState = {
      time: ''
    }

    return (
      <>
        {
          fields.map((item, index) => (
            <Form.Group key={index}>
              <Field
                component={FormField}
                control={Input}
                name={`${item}.time`}
                type='time'/>
              <Form.Button
                basic className='align-button mt4'
                color='red' data-index={index}
                icon='trash alternate outline'
                onClick={_handleRemoveBtnClick}
                type='button'/>
            </Form.Group>
          ))
        }
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

  return (
    <>
      <Form.Group>
        <Form.Field
          className='w_input_3'
          control={Input}
          name='time'
          // onChange={_handleCustomWeekChange}
          // readOnly={frequency !== 'every_custom_week'}
          type='time'/>
        <Form.Field>
          <Form.Button
            className='align-button'
            color='teal'
            icon='plus'
            onClick={_handleAddTime}
            type='button'/>
        </Form.Field>
      </Form.Group>
      <FieldArray
        component={AddTime}
        name={name}
        title='Add Time'/>
    </>
  )
}

AddonTime.propTypes = {
}

AddonTime.defaultProps = { }

export default AddonTime
