import React from 'react'
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
      content = content ? (new Date(content)).toLocaleString('en-US').split(', ').shift() : '-'
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
    else if(column.type === 'action')
      content =  (<Link to={'#'}>
        <span>{`${column.action.label}`}</span>
      </Link>)

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

  const _handleOptionDropdownChange = (e, { value: optionName }) => {
    props.onOptionClick(optionName)
  }

  const _handleOptionBtnClick = e => {
    const optionName = e.currentTarget.dataset.optionName

    props.onOptionClick(optionName)
  }

  const _handleRowClick = e => {
    const isCheckbox = e.target.tagName === 'LABEL' && /ui.*checkbox/.test(e.target.parentNode.classList.value)
    const item = list.items.find(({ id }) => id === +e.currentTarget.dataset.itemId)

    if(!isCheckbox)
      if(props.onRowClick) props.onRowClick(e, item)
      else if(list.config.base_uri) props.history.push(`${list.config.base_uri}/${item.id}`)
  }

  const _handleRowOptionClick = e => {
    const itemId = +e.currentTarget.dataset.itemId
    const optionName = e.currentTarget.dataset.optionName
    const item = list.items.find(({ id }) => id === itemId)

    props.onRowOptionClick(optionName, item)
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
    const itemId = +e.currentTarget.dataset.itemId || e.currentTarget.dataset.itemId

    props.dispatch(
      checked === true ? duck.creators.selectIds(itemId) : duck.creators.removeSelectedIds(itemId)
    )
  }

  const _handleSelectorCheckboxHeaderChange = (e, { checked }) => {
    props.dispatch(
      checked === true ? duck.creators.selectIds(...list.items.map(({ id }) => id)) : duck.creators.removeSelectedIds()
    )
  }

  const _renderRow = (item, index) => {
    const checked = list.selector && list.selector.selected_items.some(({ id }) => id === item.id)

    return (
      <Table.Row
        active={checked} data-item-id={item.id} key={index}
        onClick={_handleRowClick}>
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
          list.config.columns.map(({ width = null, align = null, ...column }, index) => (
            <Table.Cell key={index} textAlign={align} width={width}>{getColumnContent(item, column)}</Table.Cell>
          ))
        }

        {/* Row options */}
        {
          list.config.row.options.length > 0 && (
            <Table.Cell textAlign='center'>
              {
                list.config.row.options.map(({ icon, name, display_name, ...rest }, index)=> (
                  <Button
                    basic content={display_name}
                    data-item-id={item.id} data-option-name={name}
                    icon={icon} key={index} onClick={_handleRowOptionClick}
                    {...rest}/>
                ))
              }
            </Table.Cell>
          )
        }
      </Table.Row>

    )
  }

  const loading = list.status === 'GETTING'
  const areAllItemsChecked = list.selector && list.items.every(item => list.selector.selected_items.some(({ id }) => id === item.id))

  // List options only available when the list has extended the selector reducer
  const basicOptions = configOptions.filter(item => !('is_multiple' in item))
  const optionsForSingle = list.selector && list.selector.selected_items.length === 1 ? configOptions.filter(item => item.is_multiple === false) : []
  const optionsForMultiple = list.selector && list.selector.selected_items.length >= 1 ? configOptions.filter(item => item.is_multiple === true) : []
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

      <Grid className='table-primary-header'>
        <Grid.Column width={6}>
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
            selectionOptions.length > 0 && (
              selectionOptions
                .filter(({ conditional_render })=> !conditional_render || (conditional_render && conditional_render(list.selector.selected_items[0])))
                .map(({ icon, name, display_name, ...rest }, index) => (
                  <Button
                    basic content={display_name} data-option-name={name}
                    icon={icon} key={`nc-option-${index}`} onClick={_handleOptionBtnClick}
                    {...rest}/>
                ))
            )
          }
        </Grid.Column >
        <Grid.Column textAlign='right' width={10}>
          {
            props.filterColumns.length > 0 && (
              <Popup
                basic
                on='click' onClose={_handleClose} onOpen={_handleOpen}
                open={open} position='bottom right'
                trigger={<Button basic={!open} color={open ? 'blue' : null} content='Filters'/>}>
                <Popup.Content style={{ minWidth: '22rem', padding: '1rem 1rem 0.5rem' }}>
                  <FilterForm duck={duck}/>
                </Popup.Content>
              </Popup>
            )
          }
          {_get(list.config, 'search_enabled', true) && (
            <Input
              icon='search' iconPosition='left' onChange={_handleSearchInputChange}
              placeholder={list.config.search_placeholder || 'Search'} type='search'/>
          )}
        </Grid.Column>

        {
          props.selectedFilterColumns.length > 0 && (
            <Grid.Column style={{ paddingTop: 0 }} width={16}>
              <FilterTagManager duck={duck}/>
            </Grid.Column>
          )
        }
      </Grid>

      <Table
        basic='very' className='table-primary' selectable
        sortable>
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
              list.config.columns.map(({ display_name, name, sort, sort_name }, index) => {
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
              })
            }

            {/* Row options */}
            {
              list.config.row.options.length > 0 && (<Table.HeaderCell textAlign='center'>OPTIONS</Table.HeaderCell>)
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            (()=>{
              if(list.config.group_by)
                return  list.config.group_by.groups.map(_group => (
                  <>
                    <Table.Row disabled>
                      <Table.Cell colSpan={list.config.columns.length + Number(list.config.row.options.length > 0)} textAlign='left'>
                        <Icon name={_group.icon_label}/> {_group.text_label}
                      </Table.Cell>
                    </Table.Row>
                    {
                      list.items
                        .filter(_item=> _item[list.config.group_by.column_name] === _group.value).length > 0 ? (
                          list.items.map(_renderRow)
                        ) : (
                          <Table.Row disabled>
                            <Table.Cell colSpan={list.config.columns.length + Number(list.config.row.options.length > 0)} textAlign='center'>No items.</Table.Cell>
                          </Table.Row>
                        )
                    }
                  </>
                ))

              return list.items.length > 0 ? (
                list.items.map(_renderRow)
              ) : (
                <Table.Row disabled>
                  <Table.Cell colSpan={list.config.columns.length + Number(list.config.row.options.length > 0)} textAlign='center'>No items.</Table.Cell>
                </Table.Row>
              )
            })()

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
      selectedFilterColumns: duck.selectors.selectedFilterColumns(state)
    }),
    dispatch => ({ dispatch })
  )
)(TableList)
