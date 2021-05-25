import React, { useState } from 'react'
import { Dropdown, Table } from 'semantic-ui-react'
import _get from 'lodash/get'

const TableCellSemanticDropdown = ({ config, data, ...props }) => {
  const { align = null, width = null } = config
  const [ dropDownValue, setDropDownValue ] = useState()

  const _handleSemanticDropdownChange = (e, { value: optionName }) => {
    e.stopPropagation()

    setDropDownValue(optionName)

    props.onDropdownFieldChange(optionName, data)
  }

  const cell = _get(data, config.name, null)
  console.log(cell)

  return (
    <Table.Cell
      onClick={props.onClick}
      textAlign={align}
      width={width}>
      <Dropdown
        fluid
        onChange={_handleSemanticDropdownChange}
        options={config.options}
        selectOnBlur={false}
        selection
        value={dropDownValue != undefined ? dropDownValue : cell}/>
    </Table.Cell>
  )
}

export default TableCellSemanticDropdown
