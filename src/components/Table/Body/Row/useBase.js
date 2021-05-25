import _get from 'lodash/get'
import React from 'react'

import TableCell from './../Cell'
import TableCellButton from './../Cell/Button'
import TableCellDropdown from './../Cell/Dropdown'
import TableCellActionButton from './../Cell/action-button'
import TableCellTextField from './../Cell/text-field'
import TableCellDropdownField from './../Cell/dropdown-field'

const useBase = (
  config,
  data,
  onButtonClick,
  onCellClick,
  onCheckboxChange,
  onClick,
  onDropdownChange,
  onTextFieldChange,
  onDropdownFieldChange
) => {
  const renderRowColumns = () => {
    return config.columns.map((config, index) => {
      if(config.type === 'dropdown')
        return (
          <TableCellDropdown
            config={config} data={data} key={index}
            onClick={_handleCellClick} onDropdownChange={_handleDropdownChange}/>
        )
      // else if(config.type === 'checkbox')
      //   return (
      //     <TableCell
      //       config={config} data={data} key={index}
      //       onClick={_handleCellClick}/>
      //   )
      else if(config.type === 'button')
        return (
          <TableCellButton
            config={config} data={data} key={index}
            onButtonClick={_handleButtonClick} onClick={_handleCellClick}/>
        )
      else if(config.type === 'action-button')
        return (
          <TableCellActionButton
            config={config} data={data} key={index}
            onButtonClick={_handleButtonClick} onClick={_handleCellClick}
            onDropdownChange={_handleDropdownChange}/>
        )
      else if(config.type === 'text-field' || config.type === 'date-field')
        return (
          <TableCellTextField
            config={config} data={data} key={index}
            onClick={_handleCellClick} onTextFieldChange={_handleTextFieldChange}
            type={config.type}/>
        )
      else if(config.type === 'dropdown-field')
        return (
          <TableCellDropdownField
            config={config} data={data} key={index}
            onClick={_handleCellClick}
            onDropdownFieldChange={_handleDropdownFieldChange}/>
        )
      else
        return (
          <TableCell
            config={config} data={data} key={index}
            onClick={_handleCellClick}/>
        )
    })
  }

  const _handleButtonClick = onButtonClick
  const _handleCellClick = onCellClick
  const _handleDropdownChange = onDropdownChange
  const _handleTextFieldChange = onTextFieldChange
  const _handleDropdownFieldChange = onDropdownFieldChange

  const _handleClick = e => {
    const isCheckbox = e.target.tagName === 'LABEL' && /ui.*checkbox/.test(e.target.parentNode.classList.value)

    if(!isCheckbox) onClick(e, data)
  }

  const active = _get(data, 'active', true)

  return [
    // data
    {
      classname: active ? '' : 'inactive'
    },
    // methods
    {
      renderRowColumns
    },
    // handlers
    {
      _handleClick
    }
  ]
}

export default useBase
