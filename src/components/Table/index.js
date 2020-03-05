import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Checkbox, Dimmer, Dropdown, Loader, Segment, Table } from 'semantic-ui-react'

import Pagination from '@components/Pagination'

const TableList = ({ duck, list, ...props }) => {
  const getColumnContent = (item, column) => {
    let content = item[column.name]

    if(column.type === 'boolean') content = content ? 'Yes' : 'No'

    return content
  }

  const _handleDropdownChange = (e, { value }, item) => {
    props.onRowOptionClick(value, item)
  }

  const _handlePaginationChange = (e, { activePage }) => {
    props.dispatch(
      duck.creators.get({
        page: activePage
      })
    )
  }

  const _handleRowClick = (e, item) => {
    const isCheckbox = e.target.tagName === 'LABEL' && /ui.*checkbox/.test(e.target.parentNode.classList.value)
    
    if(!isCheckbox) {
      if(props.onRowClick) props.onRowClick(e, item)
      else props.history.push(`${list.config.base_uri}/${item.id}`)
    }
  }

  const _handleSelectorCheckboxChange = (e, { checked }, { id }) => {
    props.dispatch(
      checked === true ? duck.creators.selectIds(id) : duck.creators.removeSelectedIds(id)
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
      className='table-primary-segment-dimmable'
      dimmed={loading}
      as={Segment}
      raised
    >
      <Dimmer active={loading} inverted>
        <Loader>Cargando...</Loader>
      </Dimmer>

      <Table basic='very' selectable className='table-primary'>
        <Table.Header>
          <Table.Row>
            {/* Row selection */}
            {
              list.selector && (
                <Table.HeaderCell>
                  <Checkbox
                    checked={areAllItemsChecked}
                    onChange={_handleSelectorCheckboxHeaderChange} />
                </Table.HeaderCell>
              )
            }
            
            {/* Row data header */}
            {
              list.config.columns.map(({ display_name }, index) => (<Table.HeaderCell key={index}>{display_name}</Table.HeaderCell>))
            }

            {/* Row options */}
            {
              list.config.row.options && (<Table.HeaderCell textAlign='center'>Options</Table.HeaderCell>)
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            list.items.map((item, index) => {
              const checked = list.selector && list.selector.selected_items.some(({ id }) => id === item.id)
              
              return (
                <Table.Row active={checked} key={index} onClick={e => _handleRowClick(e, item)}>
                  {/* Row selection */}
                  {
                    list.selector && (
                      <Table.Cell>
                        <Checkbox
                          checked={checked}
                          onChange={(e, data) => _handleSelectorCheckboxChange(e, data, item)} />
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
                        <Dropdown
                          text='Options'
                          onChange={(e, data) => _handleDropdownChange(e, data, item)}
                          options={
                            list.config.row.options.map((item, index) => ({
                              key: index,
                              icon: item.icon,
                              value: item.name,
                              text: item.display_name,
                            }))
                          }
                          selectOnBlur={false}
                        />
                      </Table.Cell>
                    )
                  }
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>

      {
        list.pagination && (
          <Pagination
            activePage={list.pagination.params.page}
            onPageChange={_handlePaginationChange}
            totalPages={list.pagination.meta.last_page}
            from={list.pagination.meta.from}
            to={list.pagination.meta.to}
            total={list.pagination.meta.total}
          />
        )
      }
    </Dimmer.Dimmable>
  )
}

TableList.defaultProps = {
  duck: null,
  onRowOptionClick: () => {},
  onRowClick: null
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
