import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Table } from 'semantic-ui-react'

const TableHeader = ({ config, duck }) => {
  const dispatch = useDispatch()
  const list = useSelector(duck.selectors.list)

  const _handleHeaderToggleSortClick = e => {
    const columnName = e.currentTarget.dataset.columnName
    const column = config.columns.find(item => item.name === columnName)

    if(!column.sort)
      return

    const finalSortName = column.sort_name || column.name

    dispatch(
      duck.creators.get({
        ordering: list.filters.ordering === finalSortName ? `-${finalSortName}` : finalSortName
      })
    )
  }

  const _handleSelectorCheckboxHeaderChange = (e, { checked }) => {
    dispatch(
      checked === true ? duck.creators.selectIds(...list.items.map(({ id }) => id)) : duck.creators.removeSelectedIds()
    )
  }

  const areAllItemsChecked = list.selector
    && list.items
    && list.items.every(item => list.selector.selected_items.some(({ id }) => id === item.id))

  return (
    <Table.Header>
      <Table.Row>
        {/* Row selection */}
        {
          list.selector && (
            <Table.HeaderCell>
              <Checkbox
                checked={areAllItemsChecked}
                onChange={_handleSelectorCheckboxHeaderChange}/>
            </Table.HeaderCell>
          )
        }

        {/* Row data header */}
        {
          config.columns.map(({ align, display_name, name, sort, sort_name }, index) => {
            const finalSortName = sort_name || name
            let sorted = sort ? 'sorted' : ''

            if(list.filters.ordering === finalSortName)
              sorted = sorted + ' descending'
            else if(list.filters.ordering === '-' + finalSortName)
              sorted = sorted + ' ascending'

            return (
              <Table.HeaderCell
                className={sorted}
                data-column-name={name} key={index} onClick={_handleHeaderToggleSortClick}
                textAlign={align}>
                {display_name}
              </Table.HeaderCell>
            )
          }
          )
        }

      </Table.Row>
    </Table.Header>
  )
}

export default TableHeader
