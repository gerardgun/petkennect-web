import React from 'react'
import { Table, Checkbox } from 'semantic-ui-react'

const TableCellCheckbox = ({ config, data, ...props }) => {
  const { align = null, width = null } = config

  const _handleCheckboxChecked = (e, item) => {
    props.onCheckboxChecked(item, data)
  }

  return (
    <Table.Cell
      onClick={props.onClick}
      textAlign={align}
      width={width}>
      <Checkbox
        name={config.name}
        onChange={_handleCheckboxChecked}
        type='checkbox'/>
    </Table.Cell>
  )
}

export default TableCellCheckbox
