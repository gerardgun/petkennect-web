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
    onRowButtonClick: _handleChildRowButtonClick
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
              <>
                <TableRow
                  config={config} data={parent} duck={duck}
                  key={`row-${parentIndex}`}
                  onButtonClick={props.onRowButtonClick}
                  onCellClick={props.onCellClick}
                  onCheckboxChange={props.onRowCheckboxChange}
                  onClick={props.onRowClick}
                  onDropdownChange={props.onRowDropdownChange}/>
                {
                  hasChildItems && parent.items.map((child, childIndex) => {
                    return (
                      <TableRow.Child
                        config={finalChildConfig} data={child}
                        key={`row-${parentIndex}-${childIndex}`}
                        onButtonClick={_handleChildRowButtonClick}
                        onCellClick={_handleChildCellClick}
                        onCheckboxChange={_handleChildRowCheckboxChange}
                        onClick={_handleChildRowClick}
                        onDropdownChange={_handleChildRowDropdownChange}/>
                    )
                  })
                }
              </>
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
