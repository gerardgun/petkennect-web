import _get from 'lodash/get'
import React from 'react'

import TableCell from './../Cell'
import TableCellButton from './../Cell/Button'
import TableCellDropdown from './../Cell/Dropdown'

const useBase = (
  config,
  data,
  onButtonClick,
  onCellClick,
  onCheckboxChange,
  onClick,
  onDropdownChange
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
