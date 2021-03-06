import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'semantic-ui-react'

import TableRow from './Row'
import { getChildConfig } from './../helpers'

const TableBody = ({ childProps, config, duck, ...props }) => {
  const {
    config: childConfig,
    onCellClick: _handleChildCellClick,
    onRowCheckboxChange: _handleChildRowCheckboxChange,
    onRowClick: _handleChildRowClick,
    onRowDropdownChange: _handleChildRowDropdownChange,
    onRowButtonClick: _handleChildRowButtonClick,
    onRowTextFieldChange : _handleChildRowTextFieldChange,
    onRowDropdownFieldChange : _handleChildRowDropdownFieldChange,
    onRowCheckboxChecked: _handleChildRowCheckboxChecked
  } = childProps

  const list = useSelector(duck.selectors.list)

  const finalChildConfig = useMemo(() => getChildConfig(childConfig), [])

  return (
    <Table.Body>
      {
        list.items.length > 0 ? (
          list.items.map((parent, parentIndex) => {
            const hasChildItems = 'items' in parent && finalChildConfig

            return (
              <React.Fragment key={`row-${parentIndex}`}>
                <TableRow
                  config={config} data={parent} duck={duck}
                  onButtonClick={props.onRowButtonClick}
                  onCellClick={props.onCellClick}
                  onCheckboxChange={props.onRowCheckboxChange}
                  onCheckboxChecked={props.onRowCheckboxChecked}
                  onClick={props.onRowClick}
                  onDropdownChange={props.onRowDropdownChange}
                  onDropdownFieldChange={props.onRowDropdownFieldChange}
                  onTextFieldChange={props.onRowTextFieldChange}/>

                {
                  hasChildItems && parent.items.map((child, childIndex) => {
                    return (
                      <TableRow.Child
                        config={finalChildConfig} data={child}
                        key={`row-${parentIndex}-${childIndex}`}
                        onButtonClick={_handleChildRowButtonClick}
                        onCellClick={_handleChildCellClick}
                        onCheckboxChange={_handleChildRowCheckboxChange}
                        onCheckboxChecked={_handleChildRowCheckboxChecked}
                        onClick={_handleChildRowClick}
                        onDropdownChange={_handleChildRowDropdownChange}
                        onDropdownFieldChange={_handleChildRowDropdownFieldChange}
                        onTextFieldChange={_handleChildRowTextFieldChange}/>
                    )
                  })
                }
              </React.Fragment>
            )
          })
        ) : (
          <Table.Row disabled>
            <Table.Cell colSpan={config.columns.length} textAlign='center'>No items.</Table.Cell>
          </Table.Row>
        )
      }
    </Table.Body>
  )
}

export default TableBody
