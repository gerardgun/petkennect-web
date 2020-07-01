import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import {  Dimmer, Image, Loader, Segment, Table, Button, Ref } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import ModalDelete from '@components/Modal/Delete'
import { reorder } from '@components/Gallery/helpers'
import { getItemStyle, getListStyle } from './helpers'

import { useDebounce } from '@hooks/Shared'
import _get from 'lodash/get'
import useModal from '@components/Modal/useModal'
import { useStateDerivedFromProps } from '@hooks/Shared'

const portal = document.getElementById('root')

const TableSortableList = ({ duckDetail, list,detail, ...props }) => {
  const [ items, setItems ] = useStateDerivedFromProps([ ...list.items ].sort((_firstItem,_secondItem)=>_firstItem.order - _secondItem.order))

  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const getColumnContent = (item, column) => {
    let content = _get(item, column.name, null)

    if(column.type === 'boolean') content = content ? 'Yes' : 'No'
    else if(column.type === 'image') content = <Image rounded size='mini' src={content || 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'}/>
    else if(column.type === 'date') content = (new Date(content)).toLocaleString().split(' ').shift()
    else if(column.type === 'datetime') content = (new Date(content)).toLocaleString()
    else if(column.type === 'string') content = content || <span style={{ color: 'grey' }}>-</span>

    return content
  }
  const { _handleDebounce: _handleUpdateOrderImages } = useDebounce(
    (_items) =>
    {
      props.dispatch(
        duckDetail.creators.put({
          items: _items.map((item, index) => ({
            ...item,
            order: index + 1
          }))
        })
      )
    }

  )

  const _handleUpdateImages = (_items) => {
    setItems(_items)
    _handleUpdateOrderImages(_items)
  }

  const _handleDragEnd = (result) => {
    // dropped outside the list
    if(!result.destination) return
    const _items = reorder(
      items,
      result.source.index,
      result.destination.index
    )
    _handleUpdateImages(_items)
  }

  const _handleDelete = (item) => () => {
    props.dispatch(
      duckDetail.creators.setItem(item)
    )
    _handleOpen()
  }

  const loading = list.status === 'GETTING' || detail.status === 'PUTTING'

  const _renderItem = (item, provided, snapshot) => {
    const itemNode = (

      <Ref innerRef={provided.innerRef}>
        <Table.Row
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
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
                <Button
                  color='google plus'
                  disabled={snapshot.isDragging}
                  icon='trash alternate outline'
                  onClick={_handleDelete(item)}/>
              </Table.Cell>
            )
          }
        </Table.Row>
      </Ref>
    )

    return snapshot.isDragging
      ? ReactDOM.createPortal(itemNode, portal)
      : itemNode
  }

  return (
    <Dimmer.Dimmable
      as={Segment}
      className='table-primary-segment'
      dimmed={loading}
      raised>
      <Dimmer active={loading} inverted>
        <Loader>Loading...</Loader>
      </Dimmer>

      <Table
        basic='very' className='table-primary' selectable>
        <Table.Header>
          <Table.Row>
            {/* Row data header */}
            {
              list.config.columns.map(({ display_name }, index) => (
                <Table.HeaderCell
                  key={index}>{display_name}
                </Table.HeaderCell>
              ))
            }

            {/* Row options */}
            {
              list.config.row.options && (<Table.HeaderCell textAlign='center'>Options</Table.HeaderCell>)
            }
          </Table.Row>
        </Table.Header>

        {
          items.length > 0 ? (

            <DragDropContext onDragEnd={_handleDragEnd}>
              <Droppable direction='vertical' droppableId='droppable-package-section'>
                {(provided, snapshot) => (
                  <Ref innerRef={provided.innerRef}>
                    <Table.Body
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}>

                      {[ ...items ]
                        .map((item, index) => (

                          <Draggable draggableId={'' + item.id} index={index} key={item.id}>
                            {(provided, snapshot) => _renderItem(item, provided, snapshot)}
                          </Draggable>

                        ))}
                      {provided.placeholder}
                    </Table.Body>
                  </Ref>
                )}
              </Droppable>
            </DragDropContext>

          ) : (
            <Table.Body>
              <Table.Row disabled>
                <Table.Cell colSpan={list.config.columns.length + Number(Boolean(list.config.row.options))} textAlign='center'>No items.</Table.Cell>
              </Table.Row>
            </Table.Body>
          )
        }
      </Table>
      <ModalDelete
        duckDetail={duckDetail}
        onClose={_handleClose}
        open={open}/>
    </Dimmer.Dimmable>
  )
}

TableSortableList.defaultProps = {
  duck      : null,
  duckDetail: null
}
TableSortableList.propTypes = {
  duck      : PropTypes.shape({}).isRequired,
  duckDetail: PropTypes.shape({}).isRequired
}

export default compose(
  withRouter,
  connect(
    (state, props) => ({
      list  : state[props.duck.store],
      detail: state[props.duckDetail.store]
    }),
    dispatch => ({ dispatch })
  )
)(TableSortableList)
