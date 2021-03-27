import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Dimmer, Loader, Segment, Table } from 'semantic-ui-react'

import TableBody from './Body'
import TableHeader from './Header'
import TableFooter from './Footer'
import TopBar from './TopBar'
import { getConfig } from './helpers'

const TableList = ({ childProps, config, duck, ...props }) => {
  const list = useSelector(duck.selectors.list)

  const loading = list.status === 'GETTING'
  const finalConfig = useMemo(() => getConfig(config), [])
  const hasTopBar = finalConfig.options.length > 0 || finalConfig.search_enabled

  return (
    <Dimmer.Dimmable
      as={Segment}
      className='table-primary-segment'
      dimmed={loading}
      raised>
      <Dimmer active={loading} inverted>
        <Loader>Loading...</Loader>
      </Dimmer>

      {
        hasTopBar && (
          <TopBar
            config={finalConfig}
            duck={duck}
            onOptionClick={props.onOptionClick}/>
        )
      }

      <Table
        basic='very' className='table-primary'
        selectable sortable>

        <TableHeader config={finalConfig} duck={duck}/>

        <TableBody
          childProps={childProps}
          config={finalConfig} duck={duck}
          onCellClick={props.onCellClick}
          onRowButtonClick={props.onRowButtonClick}
          onRowCheckboxChange={props.onRowCheckboxChange}
          onRowClick={props.onRowClick}
          onRowDropdownChange={props.onRowDropdownChange}/>

        {
          list.pagination && list.pagination.meta.last_page && (
            <TableFooter duck={duck}/>
          )
        }

      </Table>

    </Dimmer.Dimmable>
  )
}

const commonDefaultProps = {
  config             : null,
  // Event handlers
  onCellClick        : () => {},
  onRowButtonClick   : () => {},
  onRowCheckboxChange: () => {},
  onRowClick         : () => {},
  onRowDropdownChange: () => {}
}

TableList.defaultProps = {
  childProps   : commonDefaultProps,
  duck         : null,
  // Event handlers
  onOptionClick: () => {},
  ...commonDefaultProps
}

export default TableList
