import React from 'react'
import { Table } from 'semantic-ui-react'

import useBase from './useBase'

const TableRowChild = ({ config, data, ...props }) => {
  const [
    row, // row data
    methods, // row methods
    handlers // row event handlers
  ] = useBase(
    config, data,
    props.onButtonClick, props.onCellClick, props.onCheckboxChange, props.onClick, props.onDropdownChange
  )

  return (
    <Table.Row
      className={`${row.classname} child`}
      onClick={handlers._handleClick}>
      <Table.Cell/>
      {methods.renderRowColumns()}
    </Table.Row>
  )
}

export default TableRowChild
