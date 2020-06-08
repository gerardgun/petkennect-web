import React from 'react'
import PropTypes from 'prop-types'
import {  Form ,Popup } from 'semantic-ui-react'
import { SketchPicker } from 'react-color'
import './style.scss'

function InputColor({ value, onChange, label, placeholder }) {
  const _handleChange = ({ hex })=> {
    onChange(hex)
  }

  return (
    <Popup
      className='c-input-color pop-up'
      content={()=>(
        <SketchPicker
          color={value}
          disableAlpha
          onChangeComplete={_handleChange}/>
      )}
      on='click'
      pinned
      position='bottom center'
      trigger={
        <Form.Field className='c-input-color form-field'>
          <label>{label}</label>
          <div
            className='c-input-color icon'
            style={{ backgroundColor: value }}/>
          <input
            className='c-input-color input'
            placeholder={placeholder}
            readOnly
            type='text' value={value}/>
        </Form.Field>
      }/>

  )
}

InputColor.propTypes = {
  value      : PropTypes.string.isRequired,
  label      : PropTypes.string.isRequired,
  onChange   : PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

InputColor.defaultProps = {
  placeholder: 'Select a color'
}

export default InputColor
