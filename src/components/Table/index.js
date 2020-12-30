import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Checkbox, Dimmer, Dropdown, Grid, Icon, Image, Input, Label, Loader, Popup, Segment, Table } from 'semantic-ui-react'
import _get from 'lodash/get'

import Pagination from '@components/Pagination'
import useModal from '@components/Modal/useModal'
import FilterForm from './Filter/Form'
import FilterTagManager from './Filter/TagManager'
import { useDebounceText } from '@hooks/Shared'

import { defaultImageUrl } from '@lib/constants'

const TableList = ({ duck, list, ...props }) => {
  const {
    options: configOptions = []
  } = list.config

  // For Filter Popup
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const [ defaultTableBody, setTableBody ] = useState({ expandedRows: [] })

  const getColumnContent = (item, column) => {
    let content = _get(item, column.name, null)

    if(typeof column.formatter === 'function')
      content = column.formatter(content, item)
    else if(column.type === 'boolean')
      content = content ? 'Yes' : 'No'
    else if(column.type === 'boolean_active')
      content = (
        <Label
          circular color={content ? 'green' : 'red'} horizontal
          style={{ minWidth: '6rem' }}>{content ? 'Active' : 'Inactive'}</Label>
      )
    else if(column.type === 'image')
      content = <Image rounded size='mini' src={content || defaultImageUrl}/>
    else if(column.type === 'date')
      content = content ? (new Date(content)).toLocaleString('en-US').split(', ').shift() : <span style={{ color: 'grey' }}>-</span>
    else if(column.type === 'datetime')
      content = (new Date(content)).toLocaleString('en-US')
    else if(column.type === 'money')
      content = new Intl.NumberFormat('en-US', {
        style                : 'currency',
        currency             : 'USD',
        minimumFractionDigits: 2
      }).format(content)
    else if(column.type === 'string')
      content = content || <span style={{ color: 'grey' }}>-</span>
    // BEGIN Improve
    else if(column.type === 'action')
      content =  (
        <Link
          data-item-id={item.id} data-option-name={column.action.name} onClick={_handleRowOptionClick}
          to={'#'}>
          <span>{`${column.action.label}`}</span>
        </Link>
      )
    else if(column.type === 'color')
      content = (
        <Label
          horizontal
          style={{ minWidth: '4rem', height: '2rem', background: content }}></Label>
      )
    // END Improve

    return content
  }

  const _handleHeaderToggleSortClick = e => {
    const columnName = e.currentTarget.dataset.columnName
    const column = list.config.columns.find(item => item.name === columnName)

    if(!column.sort)
      return

    const finalSortName = column.sort_name || column.name

    props.dispatch(
      duck.creators.get({
        ordering: list.filters.ordering === finalSortName ? `-${finalSortName}` : finalSortName
      })
    )
  }

  const _handlePaginationChange = (e, { activePage }) => {
    props.dispatch(
      duck.creators.get({
        page: activePage
      })
    )
  }

  const _handleOptionDropdownChange = (e, { value: optionName, itemID  }) => {
    const item = list.items.find(({ id }) => id === itemID)
    props.onOptionDropdownChange(optionName, item)
  }

  const _handleOptionBtnClick = e => {
    const optionName = e.currentTarget.dataset.optionName

    props.onOptionClick(optionName)
  }

  const _handleRowClick = e => {
    const isCheckbox = e.target.tagName === 'LABEL' && /ui.*checkbox/.test(e.target.parentNode.classList.value)
    let item = []

    if(e.currentTarget.dataset.itemExpand === 'true') {
      list.items.forEach(_item => {
        item.push(..._item.expandedData)
      })
      item = item.find(({ id }) => id === +e.currentTarget.dataset.itemId)
    }
    else {
      item = list.items.find(({ id }) => id === +e.currentTarget.dataset.itemId)
    }

    if(!isCheckbox)
      if(props.onRowClick) props.onRowClick(e, item)
      else if(list.config.base_uri) props.history.push(`${list.config.base_uri}/${item.id}`)
  }

  const _handleExpandIconClick = e=>{
    e.stopPropagation()
    const rowId = +e.currentTarget.parentNode.dataset.itemId
    const currentExpandedRows = defaultTableBody.expandedRows
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId)

    if(list.config.expandedRows)
    {
      const newExpandedRows = isRowCurrentlyExpanded
        ? currentExpandedRows.filter(id => id !== rowId)
        : currentExpandedRows.concat(rowId)

      setTableBody({ expandedRows: newExpandedRows })
    }
  }

  const renderItemCaret = rowId=> {
    const currentExpandedRows = defaultTableBody.expandedRows
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId)
    if(isRowCurrentlyExpanded)
      return <Icon  name='caret down'/>
    else
      return <Icon  name='caret up'/>
  }

  const _handleRowOptionClick = e => {
    e.stopPropagation()
    const itemId = +e.currentTarget.dataset.itemId
    const optionName = e.currentTarget.dataset.optionName
    const item = list.items.find(({ id }) => id === itemId)

    props.onRowOptionClick(optionName, item)
  }

  const renderItemDetails = (item)=> {
    return (
      <>
        {
          list.config.expandedColumns
            .filter(({ conditional_render }) => {
              return !conditional_render || conditional_render(item)
            })
            .map(({ width = null, align = null, ...column }, index) => {
              delete column.conditional_render

              return (
                <Table.Cell key={index} textAlign={align} width={width}>{getColumnContent(item, column)}</Table.Cell>
              )
            })
        }
      </>
    )
  }

  // BEGIN Improve
  const { _handleChangeText: _handleSearchInputChange } = useDebounceText(str => {
    props.dispatch(
      duck.creators.get({
        search: str
      })
    )
  })
  // END Improve

  const _handleSelectorCheckboxChange = (e, { checked }) => {
    const itemId = +e.currentTarget.dataset.itemId

    props.dispatch(
      checked === true ? duck.creators.selectIds(itemId) : duck.creators.removeSelectedIds(itemId)
    )
  }

  const _handleSelectorCheckboxHeaderChange = (e, { checked }) => {
    props.dispatch(
      checked === true ? duck.creators.selectIds(...list.items.map(({ id }) => id)) : duck.creators.removeSelectedIds()
    )
  }

  const renderTableRow = (item, index) => {
    const checked = list.selector && list.selector.selected_items.some(({ id }) => id === item.id)
    const isActive = Boolean('active' in item ? item.active : true)

    const itemRows = [
      <Table.Row
        active={checked} className={isActive ? '' : 'inactive'} data-item-id={item.id}
        key={index} onClick={_handleRowClick}>
        {/* Row selection */}
        {
          list.selector && (
            <Table.Cell>
              <Checkbox
                checked={checked} data-item-id={item.id}
                onChange={_handleSelectorCheckboxChange}/>
            </Table.Cell>
          )
        }

        {/* Row data */}
        {
          list.config.columns
            .filter(({ conditional_render }) => {
              return !conditional_render || conditional_render(item)
            })
            .map(({ width = null, align = null, ...column }, index) => {
              delete column.conditional_render

              return (
                <Table.Cell key={index} textAlign={align} width={width}>{getColumnContent(item, column)}</Table.Cell>
              )
            })
        }

        {/* Row options */}
        {
          list.config.row.options.length > 0 && (
            <Table.Cell>
              {
                list.config.row.options
                  // BEGIN Improve
                  .filter(({ conditional_render }) => {
                    return !conditional_render || conditional_render(item)
                  })
                  // END Improve
                  .map(({ icon, name, color, content, display_name, ...rest }, index) => {
                    delete rest.conditional_render

                    return (
                      <Popup
                        content={display_name} inverted
                        key={index} position='bottom center'
                        trigger={
                          <Button
                            basic
                            color={color}
                            content={content} data-item-id={item.id}
                            data-option-name={name} icon={icon} onClick={_handleRowOptionClick}
                            {...rest}/>
                        }/>
                    )
                  })
              }
            </Table.Cell>
          )
        }
        {
          list.config.row.dropdownOptions && list.config.row.dropdownOptions.length > 0 && (

            <Table.Cell>
              {
                <Dropdown
                  disabled={list.config.row.dropdownOptions.length === 0}
                  icon={null}
                  itemID={item.id}
                  key={index}
                  onChange={_handleOptionDropdownChange}
                  options={
                    list.config.row.dropdownOptions.filter(({ conditional_render }) => {
                      return !conditional_render || conditional_render(item)
                    }).map((item, index) => ({
                      key  : `d-option-${index}`,
                      value: item.name,
                      text : <>{item.icon ? <Icon name={item.icon}></Icon> : ''}  {item.iconTag && <Icon>{item.iconTag}</Icon>} { item.display_name}</>
                    }))
                  }
                  selectOnBlur={false}
                  trigger={(
                    <Button basic icon='ellipsis vertical'/>
                  )}
                  value={null}/>
              }
            </Table.Cell>
          )
        }

        {/* Row expandedRows */}
        {
          list.config.expandedRows && (
            <Table.Cell  onClick={_handleExpandIconClick}>
              {renderItemCaret(item.id)}
            </Table.Cell>
          )
        }
      </Table.Row>
    ]
    if(defaultTableBody.expandedRows.includes(item.id))
      itemRows.push(
        item.expandedData.length > 0
          ? item.expandedData.map((_item, _index)=>(
            <>
              <Table.Row
                data-item-expand={true} data-item-id={_item.id} key={'row-expanded-' + _index + '-' + item.id}
                onClick={_handleRowClick}>
                <Table.Cell></Table.Cell>
                {
                  renderItemDetails(_item)
                }
                <Table.Cell></Table.Cell>
              </Table.Row>
            </>
          )) : <Table.Row disabled>
            <Table.Cell colSpan={list.config.expandedColumns.length + Number(list.config.row.options.length > 0) + 2} textAlign='center'>No items.</Table.Cell>
          </Table.Row>

      )

    return itemRows
  }

  const loading = list.status === 'GETTING'
  const areAllItemsChecked = list.selector && list.items && list.items.every(item => list.selector.selected_items.some(({ id }) => id === item.id))
  const hasHeader = configOptions.length > 0 || _get(list.config, 'search_enabled', true) || props.filterColumns.length > 0

  // List options only available when the list has extended the selector reducer
  const basicOptions = configOptions.filter(item => !('is_multiple' in item))
  const disableOptionsForAll = list.selector && list.selector.selected_items.length > 0 ? false : true
  const disableOptionsForSingle = list.selector && list.selector.selected_items.length === 1 ? false : true
  const optionsForSingle =  configOptions.filter(item => item.is_multiple === false)
  const optionsForMultiple =  configOptions.filter(item => item.is_multiple === true)
  const selectionOptions = optionsForMultiple.concat(optionsForSingle)

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
        hasHeader && (
          <Grid className='table-primary-header'>
            <Grid.Column computer={6} mobile={16} tablet={16}>
              {
                basicOptions.length > 0 && (
                  <Dropdown
                    disabled={basicOptions.length === 0}
                    icon={null}
                    onChange={_handleOptionDropdownChange}
                    options={
                      basicOptions.map((item, index) => ({
                        key  : `c-option-${index}`,
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
                // BEGIN Improve for by default button show in all case
                // selectionOptions.length > 0 && !disableOptionsForAll && (
                selectionOptions
                  // BEGIN Improve
                  .filter(({ conditional_render }) => {
                    return !conditional_render || conditional_render(list.selector.selected_items.length > 0 ? list.selector.selected_items[0] : [])
                  })
                  // END Improve
                  .map(({ icon, name, display_name, is_multiple, ...rest }, index) => {
                    delete rest.conditional_render

                    return (
                      <Popup
                        content={display_name} inverted
                        key={`nc-option-${index}`} position='bottom center'
                        trigger={
                          <Button
                            basic
                            data-option-name={name}
                            disabled={(disableOptionsForSingle && !is_multiple) || disableOptionsForAll} icon={icon}
                            onClick={_handleOptionBtnClick}
                            {...rest}/>
                        }/>
                    )
                  })
                // )
              }
            </Grid.Column >
            <Grid.Column
              className='grid-filter-item' computer={10} mobile={16}
              tablet={16} textAlign='right'>
              {
                props.filterColumns.length > 0 && (
                  <Popup
                    basic
                    on='click' onClose={_handleClose} onOpen={_handleOpen}
                    open={open} position='bottom right'
                    trigger={<Button basic={!open} color={open ? 'teal' : null} content='Filters'/>}>
                    <Popup.Content className='popup-filter-form' style={{ minWidth: '22rem', padding: '1rem 1rem 0.5rem' }}>
                      <FilterForm duck={duck}/>
                    </Popup.Content>
                  </Popup>
                )
              }
              {
                _get(list.config, 'search_enabled', true) && (
                  <Input
                    icon='search' iconPosition='left' onChange={_handleSearchInputChange}
                    placeholder={list.config.search_placeholder || 'Search'} type='search'/>
                )
              }
            </Grid.Column>

            {
              props.selectedFilterColumns.length > 0 && (
                <Grid.Column style={{ paddingTop: 0 }} width={16}>
                  <FilterTagManager duck={duck}/>
                </Grid.Column>
              )
            }
          </Grid>
        )
      }

      <Table
        basic='very'  className='table-primary' selectable
        sortable unstackable>
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
              list.config.columns.filter(({ conditional_render }) => {
                return !conditional_render || conditional_render(list.items.length > 0 ? list.items[0] : [])
              })
                .map(({ display_name, name, sort, sort_name, ...column }, index) => {
                  delete column.conditional_render
                  const finalSortName = sort_name || name
                  let sorted = sort ? 'sorted' : ''

                  if(list.filters.ordering === finalSortName)
                    sorted = sorted + ' descending'
                  else if(list.filters.ordering === '-' + finalSortName)
                    sorted = sorted + ' ascending'

                  return (
                    <Table.HeaderCell
                      className={sorted} data-column-name={name} key={index}
                      onClick={_handleHeaderToggleSortClick}>
                      {display_name}
                    </Table.HeaderCell>
                  )
                }
                )
            }

            {/* Row options */}
            {
              list.config.row.options.length > 0 && (<Table.HeaderCell>Actions</Table.HeaderCell>)
            }
            {
              list.config.row.dropdownOptions && list.config.row.dropdownOptions.length > 0 && (<Table.HeaderCell>Action</Table.HeaderCell>)
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            list.config.group_by ? (
              props.groups.map((group, index) => (
                <Fragment key={index}>
                  <Table.Row disabled>
                    <Table.Cell colSpan={list.config.columns.length + Number(list.config.row.options.length > 0)} textAlign='left'>
                      <Icon name={group.icon_label}/> {group.text_label}
                    </Table.Cell>
                  </Table.Row>
                  {
                    group.items.length > 0 ? (
                      group.items.map(renderTableRow)
                    ) : (
                      <Table.Row disabled>
                        <Table.Cell colSpan={list.config.columns.length + Number(list.config.row.options.length > 0)} textAlign='center'>No items.</Table.Cell>
                      </Table.Row>
                    )
                  }
                </Fragment>
              ))
            ) : (
              list.items.length > 0 ? (
                list.items.map(renderTableRow)
              ) : (
                <Table.Row disabled>
                  <Table.Cell colSpan={list.config.columns.length + Number(list.config.row.options.length > 0)} textAlign='center'>No items.</Table.Cell>
                </Table.Row>

              )
            )
          }
        </Table.Body>
      </Table>

      {
        list.pagination && list.pagination.meta.last_page && (
          <Pagination
            activePage={list.pagination.params.page}
            from={list.pagination.meta.from}
            onPageChange={_handlePaginationChange}
            to={list.pagination.meta.to}
            total={list.pagination.meta.total_items}
            totalPages={list.pagination.meta.last_page}/>
        )
      }
    </Dimmer.Dimmable>
  )
}

TableList.defaultProps = {
  duck            : null,
  onOptionClick   : () => {},
  onRowOptionClick: () => {},
  onRowClick      : null
}

export default compose(
  withRouter,
  connect(
    (state, { duck }) => ({
      list                 : duck.selectors.list(state),
      filterColumns        : duck.selectors.filterColumns(state),
      selectedFilterColumns: duck.selectors.selectedFilterColumns(state),
      groups               : duck.selectors.groups(state)
    }),
    dispatch => ({ dispatch })
  )
)(TableList)
