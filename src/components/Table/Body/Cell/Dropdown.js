import React, { useMemo } from 'react'
import { Button, Dropdown, Table } from 'semantic-ui-react'

const TableCellDropdown = ({ config, data, ...props }) => {
  const { align = null, width = null } = config

  const getOptions = () => {
    return config.options
      .filter(({ disable }) => {
        return !disable || !disable(data)
      })
      .map(({ display_name, name, ...rest }, index) => {
        return {
          key  : index,
          value: name,
          text : display_name,
          ...rest
        }
      })
  }

  const _handleDropdownChange = (e, { value: optionName }) => {
    e.stopPropagation()

    props.onDropdownChange(optionName, data)
  }

  const options = useMemo(getOptions, [])

  return (
    <Table.Cell
      onClick={props.onClick}
      textAlign={align}
      width={width}>
      <Dropdown
        disabled={options.length === 0}
        icon={null}
        onChange={_handleDropdownChange}
        options={options}
        selectOnBlur={false}
        trigger={(
          <Button basic icon='ellipsis vertical'/>
        )}
        value={null}/>
    </Table.Cell>
  )
}

export default TableCellDropdown
