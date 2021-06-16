import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Table } from 'semantic-ui-react'

import TableRowChild from './Child'
import useBase from './useBase'

const TableRow = ({ config, data, duck, ...props }) => {
  const dispatch = useDispatch()
  const list = useSelector(duck.selectors.list)

  const [
    row, // row data
    methods, // row methods
    handlers // row event handlers
  ] = useBase(
    config, data,
    props.onButtonClick, props.onCellClick, props.onCheckboxChange, props.onCheckboxChecked,
    props.onClick, props.onDropdownChange,props.onTextFieldChange,props.onDropdownFieldChange
  )

  const _handleSelectorCheckboxChange = (e, { checked }) => {
    dispatch(
      checked === true ? duck.creators.selectIds(data.id) : duck.creators.removeSelectedIds(data.id)
    )
  }

  const checked = list.selector && list.selector.selected_items.some(({ id }) => id === data.id)

  return (
    <Table.Row
      active={checked}
      className={row.classname}
      onClick={handlers._handleClick}>

      {/* Row selection */}
      {
        list.selector && (
          <Table.Cell>
            <Checkbox checked={checked} onChange={_handleSelectorCheckboxChange}/>
          </Table.Cell>
        )
      }

      {methods.renderRowColumns()}
    </Table.Row>
  )
}

TableRow.Child = TableRowChild

export default TableRow
