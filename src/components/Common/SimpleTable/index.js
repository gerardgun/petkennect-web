import React from 'react'
import PropTypes from 'prop-types'
import { Dimmer, Dropdown, Image, Loader, Segment, Table } from 'semantic-ui-react'
import _get from 'lodash/get'

const SimpleTableList = ({ items, config, ...props }) => {
  const getColumnContent = (item, column) => {
    let content = _get(item, column.name, null)

    if(column.type === 'boolean') content = content ? 'Yes' : 'No'
    else if(column.type === 'image') content = <Image rounded size='mini' src={content || 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'}/>
    else if(column.type === 'date') content = (new Date(content)).toLocaleString().split(' ').shift()
    else if(column.type === 'datetime') content = (new Date(content)).toLocaleString()
    else if(column.type === 'string') content = content || <span style={{ color: 'grey' }}>-</span>

    return content
  }

  const _handleDropdownChange = (e, { value }) => {
    const itemId = +e.currentTarget.closest('.ui.dropdown').dataset.itemId
    const item = items.find(({ id }) => id === itemId)

    props.onRowOptionClick(value, item)
  }

  const _handleRowClick = e => {
    const isCheckbox = e.target.tagName === 'LABEL' && /ui.*checkbox/.test(e.target.parentNode.classList.value)
    const item = items.find(({ id }) => id === +e.currentTarget.dataset.itemId)

    if(!isCheckbox)
      if(props.onRowClick) props.onRowClick(e, item)
      else if(config.base_uri) props.history.push(`${config.base_uri}/${item.id}`)
  }

  return (
    <Dimmer.Dimmable
      as={Segment}
      className='table-primary-segment-dimmable'
      dimmed={props.loading}
      raised>
      <Dimmer active={props.loading} inverted>
        <Loader>Loading...</Loader>
      </Dimmer>

      <Table
        basic='very' className='table-primary' selectable
        sortable>
        <Table.Header>
          <Table.Row>
            {/* Row selection */}

            {/* Row data header */}
            {
              config.columns.map(({ display_name }, index) => (
                <Table.HeaderCell
                  key={index}>{display_name}
                </Table.HeaderCell>
              ))
            }

            {/* Row options */}
            {
              config.row.options && (<Table.HeaderCell textAlign='center'>Options</Table.HeaderCell>)
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            items.length > 0 ? (
              items.map((item, index) => {
                return (
                  <Table.Row
                    data-item-id={item.id} key={index}
                    onClick={_handleRowClick}>

                    {/* Row data */}
                    {
                      config.columns.map(({ width = null, align = null, ...column }, index) => (
                        <Table.Cell key={index} textAlign={align} width={width}>{getColumnContent(item, column)}</Table.Cell>
                      ))
                    }

                    {/* Row options */}
                    {
                      config.row.options && (
                        <Table.Cell textAlign='center'>
                          <Dropdown
                            data-item-id={item.id}
                            onChange={_handleDropdownChange}
                            options={
                              config.row.options.map((item, index) => ({
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
                <Table.Cell colSpan={config.columns.length + Number(Boolean(config.row.options))} textAlign='center'>No items.</Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    </Dimmer.Dimmable>
  )
}

SimpleTableList.defaultProps = {
  onRowOptionClick: () => {},
  onRowClick      : () => {},
  items           : [],
  loading         : false
}
SimpleTableList.propTypes = {
  onRowOptionClick: PropTypes.func,
  onRowClick      : PropTypes.func,
  items           : PropTypes.arrayOf(PropTypes.shape({})),
  loading         : PropTypes.bool,
  config          : PropTypes.shape({
    row     : PropTypes.shape({}),
    columns : PropTypes.arrayOf(PropTypes.shape({})),
    base_uri: PropTypes.string
  }).isRequired
}
export default  SimpleTableList
