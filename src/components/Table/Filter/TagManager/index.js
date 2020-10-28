import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Icon, Label } from 'semantic-ui-react'

import './styles.scss'

const FilterTagManager = props => {
  const {
    duck,
    list
  } = props

  const _handleClick = e => {
    const columnName = e.currentTarget.dataset.columnName
    const column = list.config.columns.find(item => item.name === columnName)
    const filterNames = [].concat(column.filter.name) // get a flat array of filter names
    props.dispatch(
      duck.creators.removeFilters(...filterNames)
    )

    props.dispatch(
      duck.creators.get()
    )
  }

  return (
    <>
      {
        props.selectedFilterColumns
          .map((item, index) => {
            const isMultiple = [].concat(item.filter.multiple)[0]
            const filterValuesDisplay = [].concat(item.filter.name)
              .map(item => {
                let value = props.filters[item]
                if(!isMultiple)
                  if(item in props.filterColumnSources)
                    value = props.filterColumnSources[item].find(_item => _item.value === value).text

                return value
              })
              .join(' - ')

            return (
              <> {
                !isMultiple ? (
                  <Label
                    basic className='tag-manager-label' color='blue'
                    key={index}>
                    <strong>{item.display_name}:</strong> {filterValuesDisplay}
                    <Icon data-column-name={item.name} name='delete' onClick={_handleClick}/>
                  </Label>) : (
                  <>
                    {
                      filterValuesDisplay.split(',').map(splitItem => {
                        return (
                          <Label
                            basic className='tag-manager-label' color='blue'
                            key={splitItem}>
                            {splitItem}
                            <Icon data-column-name={item.name} name='delete' onClick={_handleClick}/>
                          </Label>)
                      })
                    }
                  </>
                )
              }</>
            )
          })
      }
    </>
  )
}

FilterTagManager.defaultProps = {
  duck: null
}

export default compose(
  connect(
    (state, { duck }) => ({
      list                 : duck.selectors.list(state),
      filters              : duck.selectors.filters(state),
      filterColumns        : duck.selectors.filterColumns(state),
      filterColumnSources  : duck.selectors.filterColumnSources(state),
      selectedFilterColumns: duck.selectors.selectedFilterColumns(state)
    }),
    dispatch => ({ dispatch })
  )
)(FilterTagManager)
