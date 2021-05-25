import React, { useState } from 'react'
import { Input, Table } from 'semantic-ui-react'
import _get from 'lodash/get'

const TableCellTextField = ({ type,config, data, ...props }) => {
  const { align = null, width = null } = config
  const [ dropDownValue, setDropDownValue ] = useState()
  const [ errorMessage, setErrorMessage ] = useState(false)
  const { name, required } = config

  const _handleTextInputChange = (e, { value }) => {
    e.stopPropagation()
    setDropDownValue(value)
    props.onTextFieldChange({  name: name , value: value, required: required }, data)
  }
  const _handleDateInputChange = (e, { value }) => {
    e.stopPropagation()
    setDropDownValue(value)
    props.onTextFieldChange({  name: name , value: value, required: required }, data)
    if(!value)
      setErrorMessage(true)

    else
      setErrorMessage(false)
  }

  const cell = _get(data, config.name, null)

  return (
    <>
      {
        type == 'text-field'
          ? <Table.Cell
            onClick={props.onClick}
            textAlign={align}
            width={width}>
            <Input
              defaultValue={dropDownValue != undefined ? dropDownValue : cell}
              fluid
              onChange={_handleTextInputChange}
              placeholder={config.placeholder ? config.placeholder : ''}
              selectOnBlur={false}
              type='text'/>
          </Table.Cell>
          :        <Table.Cell
            onClick={props.onClick}
            textAlign={align}
            width={width}>
            <Input
              defaultValue={dropDownValue != undefined ? dropDownValue : cell}
              error={errorMessage}
              fluid
              onChange={_handleDateInputChange}
              selectOnBlur={false}
              type='date'/>
          </Table.Cell>

      }

    </>)
}

export default TableCellTextField

