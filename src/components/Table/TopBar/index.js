import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, Grid, Input, Popup } from 'semantic-ui-react'
import _get from 'lodash/get'

import FilterForm from './Filter/Form'
import FilterTagManager from './Filter/TagManager'
import { useDebounceText } from '@hooks/Shared'
import useModal from '@components/Modal/useModal'
import { getFilterColumns, getSelectedFilterColumns } from './helpers'

const TopBar = ({ config, duck, ...props }) => {
  const dispatch = useDispatch()
  const filters = useSelector(duck.selectors.filters)
  const list = useSelector(duck.selectors.list)
  const [ open, { _handleOpen, _handleClose } ] = useModal() // For Filter Popup

  // Handlers
  const _handleOptionBtnClick = e => {
    const optionName = e.currentTarget.dataset.optionName

    props.onOptionClick(optionName)
  }

  const _handleOptionDropdownChange = (e, { value: optionName }) => {
    props.onOptionClick(optionName)
  }

  // improve
  const { _handleChangeText: _handleSearchInputChange } = useDebounceText(str => {
    dispatch(
      duck.creators.get({
        search: str
      })
    )
  })
  // improve

  // List options only available when the list has extended the selector reducer
  const basicOptions = Array.isArray(config.options) ? config.options : _get(config.options, 'basic', [])
  const optionsForSingle = _get(config.options, 'single', [])
  const optionsForSingleEnabled = list.selector && list.selector.selected_items.length === 1
  const optionsForMultiple = _get(config.options, 'multiple', [])
  const optionsForMultipleEnabled = list.selector && list.selector.selected_items.length > 0

  const filterColumns = useMemo(() => getFilterColumns(config), [])
  const selectedFilterColumns = useMemo(() => getSelectedFilterColumns(config, filters), [])

  return (
    <Grid className='table-primary-header'>
      <Grid.Column computer={6} mobile={16} tablet={16}>
        {
          basicOptions.length > 0 && (
            <Dropdown
              disabled={basicOptions.length === 0}
              icon={null}
              onChange={_handleOptionDropdownChange}
              options={
                basicOptions.map(item => ({
                  key  : item.name,
                  icon : item.icon,
                  value: item.name,
                  text : item.display_name
                }))
              }
              selectOnBlur={false}
              trigger={(
                <Button basic icon='ellipsis vertical'/>
              )}
              value={null}/>
          )
        }
        {
          optionsForMultiple.map(({ disable, display_name, icon, name,...rest }) => {
            const disabled = optionsForSingleEnabled && typeof disable === 'function' && disable(list.selector.selected_items)

            return (
              <Popup
                content={display_name} inverted key={name}
                position='bottom center'
                trigger={
                  <Button
                    basic
                    data-option-name={name}
                    disabled={disabled || !optionsForMultipleEnabled} icon={icon}
                    onClick={_handleOptionBtnClick}
                    {...rest}/>
                }/>
            )
          })
        }
        {
          optionsForSingle.map(({ disable, display_name, icon, name,...rest }) => {
            const disabled = optionsForSingleEnabled && typeof disable === 'function' && disable(list.selector.selected_items[0])

            return (
              <Popup
                content={display_name} inverted key={name}
                position='bottom center'
                trigger={
                  <Button
                    basic
                    data-option-name={name}
                    disabled={disabled || !optionsForSingleEnabled} icon={icon}
                    onClick={_handleOptionBtnClick}
                    {...rest}/>
                }/>
            )
          })
        }
      </Grid.Column >
      <Grid.Column
        className='grid-filter-item' computer={10} mobile={16}
        tablet={16} textAlign='right'>
        {
          filterColumns.length > 0 && (
            <Popup
              basic
              on='click' onClose={_handleClose} onOpen={_handleOpen}
              open={open} position='bottom right'
              trigger={<Button basic={!open} color={open ? 'teal' : null} content='Filters'/>}>
              <Popup.Content style={{ minWidth: '22rem', padding: '1rem 1rem 0.5rem' }}>
                <FilterForm config={config} duck={duck}/>
              </Popup.Content>
            </Popup>
          )
        }
        {
          config.search_enabled && (
            <Input
              icon='search' iconPosition='left' onChange={_handleSearchInputChange}
              placeholder={config.search_placeholder} type='search'/>
          )
        }
      </Grid.Column>

      {
        selectedFilterColumns.length > 0 && (
          <Grid.Column style={{ paddingTop: 0 }} width={16}>
            <FilterTagManager config={config} duck={duck}/>
          </Grid.Column>
        )
      }
    </Grid>
  )
}

export default TopBar
