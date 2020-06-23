import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { compose } from 'redux'
import { Checkbox, Dimmer, Dropdown, Image, Loader, Segment, Table, Button, Icon, Label } from 'semantic-ui-react'
import _get from 'lodash/get'

import Pagination from '@components/Pagination'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

const TableList = ({ duck, list, ...props }) => {
  const getColumnContent = (item, column) => {
    let content = _get(item, column.name, null)

    if(column.type  === 'avatar') {
      const avatar_image = _get(item, column.avatar_image, null)
      const avatar_name = column.avatar_name.map(_name=> _get(item, _name , null)).join(' ')
      content = (
        <div className='flex align-center'>
          <Image rounded size='mini' src={avatar_image || defaultImage}/>
          <Link className='text-underline pl8' to={`${column.avatar_link}${item.id}`}>{avatar_name}</Link>
        </div>
      )
    }

    if(column.type === 'boolean')
      if(column.labels) {
        content = content
          ? <Label circular color='teal'>{ column.labels.positive }</Label>
          : <Label circular color='red'>{ column.labels.positive }</Label>
      } else {
        content = content ? 'Yes' : 'No'
      }

    else if(column.type === 'image') content = <Image rounded size='mini' src={content || defaultImage}/>
    else if(column.type === 'date') content = (new Date(content)).toLocaleString('en-US').split(', ').shift()
    else if(column.type === 'datetime') content = (new Date(content)).toLocaleString('en-US')
    else if(column.type === 'string') content = content || <span style={{ color: 'grey' }}>-</span>

    return content
  }

  const getSortOrder = (name, sort)  => {
    if(!sort)
      return undefined

    switch (list.filters.ordering) {
      case name:
        return  'ascending'

      case '-' + name:
        return  'descending'

      default:
        return undefined
    }
  }

  const _handleToggleSort = (name,sort)  => ()=>  {
    if(!sort)
      return

    if(list.filters.ordering === name) {
      props.dispatch(
        duck.creators.setFilters({
          ordering: '-' + name
        })
      )
      props.dispatch(
        duck.creators.get()
      )

      return
    }

    props.dispatch(
      duck.creators.setFilters({
        ordering: name
      }))

    props.dispatch(
      duck.creators.get()
    )
  }

  const _handleDropdownChange = (e, { value }) => {
    const itemId = +e.currentTarget.closest('.ui.dropdown').dataset.itemId
    const item = list.items.find(({ id }) => id === itemId)

    props.onRowOptionClick(value, item)
  }

  const _handleOptionClick = (value, item)=> (e) => {
    e.stopPropagation()
    props.onRowOptionClick(value, item)
  }

  const _handlePaginationChange = (e, { activePage }) => {
    props.dispatch(
      duck.creators.get({
        page: activePage
      })
    )
  }

  const _handleRowClick = e => {
    const isCheckbox = e.target.tagName === 'LABEL' && /ui.*checkbox/.test(e.target.parentNode.classList.value)
    const item = list.items.find(({ id }) => id === +e.currentTarget.dataset.itemId)

    if(!isCheckbox)
      if(props.onRowClick) props.onRowClick(e, item)
      else if(list.config.base_uri) props.history.push(`${list.config.base_uri}/${item.id}`)
  }

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

  const loading = list.status === 'GETTING'
  const areAllItemsChecked = list.selector && list.items.every(item => list.selector.selected_items.some(({ id }) => id === item.id))

  return (
    <Dimmer.Dimmable
      as={Segment}
      className='table-primary-segment-dimmable pd0'
      dimmed={loading}
      raised>
      <Dimmer active={loading} inverted>
        <Loader>Loading...</Loader>
      </Dimmer>

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
              list.config.columns.map(({ display_name, sort ,name }, index) => (
                <Table.HeaderCell
                  key={index}
                  onClick={_handleToggleSort(name,sort)}
                  sorted={getSortOrder(name,sort)}>{display_name.toUpperCase()}
                </Table.HeaderCell>
              ))
            }

            {/* Row options */}
            {
              list.config.row.options && (<Table.HeaderCell textAlign='center'>OPTIONS</Table.HeaderCell>)
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            list.items.length > 0 ? (
              list.items.map((item, index) => {
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
                      list.config.row.options && (
                        <Table.Cell textAlign='center'>
                          {list.config.row.options
                            .filter(_option=> _option.is_inline)
                            .map((_item, index)=> (
                              <Button
                                icon key={index}
                                onClick={_handleOptionClick(_item.name, item)}>
                                <Icon name={_item.icon}/>
                              </Button>
                            ))}
                          <Dropdown
                            data-item-id={item.id}
                            onChange={_handleDropdownChange}
                            options={
                              list.config.row.options
                                .filter(_option => !_option.is_inline)
                                .map((item, index) => ({
                                  key  : index,
                                  icon : item.icon,
                                  value: item.name,
                                  text : item.display_name
                                }))
                            }
                            selectOnBlur={false}
                            text='Options'
                            value={null}/>
                        </Table.Cell>
                      )
                    }
                  </Table.Row>
                )
              })
            ) : (
              <Table.Row disabled>
                <Table.Cell colSpan={list.config.columns.length + Number(Boolean(list.config.row.options))} textAlign='center'>No items.</Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>

      {
        list.pagination && (
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
  onRowOptionClick: () => {},
  onRowClick      : null
}

export default compose(
  withRouter,
  connect(
    (state, props) => ({
      list: state[props.duck.store]
    }),
    dispatch => ({ dispatch })
  )
)(TableList)
