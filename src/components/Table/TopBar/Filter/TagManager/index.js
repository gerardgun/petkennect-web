import React, { useMemo } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Icon, Label } from 'semantic-ui-react'

import { getFilterColumnSources, getSelectedFilterColumns } from './../../helpers'

import './styles.scss'

const FilterTagManager = ({ config, duck }) => {
  const dispatch = useDispatch()
  const store = useStore()
  const filters = useSelector(duck.selectors.filters)

  const _handleClick = e => {
    const columnName = e.currentTarget.dataset.columnName
    const column = config.columns.find(item => item.name === columnName)
    const filterNames = [].concat(column.filter.name) // get a flat array of filter names

    dispatch(
      duck.creators.removeFilters(...filterNames)
    )

    dispatch(
      duck.creators.get()
    )
  }

  const filterColumnSources = useMemo(() => getFilterColumnSources(config, store.getState()), [])
  const selectedFilterColumns = useMemo(() => getSelectedFilterColumns(config, filters), [])

  return (
    <>
      {
        selectedFilterColumns
          .map((item, index) => {
            const filterValuesDisplay = [].concat(item.filter.name)
              .map(item => {
                let value = filters[item]

                if(item in filterColumnSources)
                  value = filterColumnSources[item].find(_item => _item.value === value).text

                return value
              })
              .join(' - ')

            return (
              <Label
                basic className='tag-manager-label' color='blue'
                key={index}>
                <strong>{item.display_name}:</strong> {filterValuesDisplay}
                <Icon data-column-name={item.name} name='delete' onClick={_handleClick}/>
              </Label>
            )
          })
      }
    </>
  )
}

export default FilterTagManager
