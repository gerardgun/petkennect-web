import React from 'react'
import { Table } from 'semantic-ui-react'

import { getContent } from './helpers'

const TableCell = ({ config, data, ...props }) => {
  const { align = null, width = null } = config

  return (
    <Table.Cell
      onClick={props.onClick}
      textAlign={align}
      width={width}>
      {getContent(data, config)}
    </Table.Cell>
  )
}

export default TableCell
