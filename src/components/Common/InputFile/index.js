import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import FormField from '../FormField'
import { Form, Input, Label, Icon } from 'semantic-ui-react'
import './styles.scss'
import { useState } from 'react'

function InputFile({ label, placeholder, name, change, onlyImage }) {
  const [ value, setValue ] = useState('')
  const [ tempURL, setTempURL ] = useState('')
  const inputRef = useRef()

  const _handleFileChange = (e)=> {
    const { files = [] } = e.target
    if(files.length)
    {
      const newValue = e.target.files[0].name + ''
      setValue(newValue.length <= 14 ? newValue : (newValue + '').substr(0, 11) + '...')
      setTempURL(URL.createObjectURL(e.target.files[0]))

      return
    }
    _handleFileRemove()
  }
  const _handleFileRemove = ()=> {
    setValue('')
    setTempURL('')
    change(name, null)
  }

  const _handleFakeInputClick = ()=>{
    if(inputRef.current) {
      inputRef.current.querySelector('input[type="file"]').focus()
      inputRef.current.querySelector('input[type="file"]').click()
    }
  }

  const _handleFakeInputBlur = ()=>{
    if(inputRef.current)
      inputRef.current.querySelector('input[type="file"]').blur()
  }

  return (
    <Form.Field className='c-input-file wrapper' >
      <label>{label}</label>

      <Input
        className='input-visible'
        icon='upload'
        iconPosition='left' onBlur={_handleFakeInputBlur}
        onClick={_handleFakeInputClick}
        placeholder={placeholder}
        readOnly value={value ? ' ' : value}/>
      {value && (
        <Label
          className='chip' image >
          <img src={tempURL}/>
          <span>{value}</span>
          <Icon name='delete' onClick={_handleFileRemove}/>
        </Label>
      )}
      <Field
        {...(onlyImage ? { accept: 'image/*' } : {})}
        className='input-hidden'
        component={FormField}
        control={Form.Input}
        icon='upload'
        iconPosition='left'
        label={label}
        name={name}
        props={{
          onChange: _handleFileChange,
          ref     : inputRef
        }}

        type='file'/>
    </Form.Field>

  )
}

InputFile.propTypes = {
  label      : PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name       : PropTypes.string.isRequired,
  change     : PropTypes.func.isRequired,
  onlyImage  : PropTypes.bool
}

InputFile.defaultProps = {
  placeholder: '',
  onlyImage  : false
}

export default InputFile
