import React from 'react'
import ReactDOM from 'react-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Image, Button } from 'semantic-ui-react'
import { useStateDerivedFromProps, useDebounce } from '@hooks/Shared'

const portal = document.getElementById('root')

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [ removed ] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  ...draggableStyle,
  width     : 120,
  minWidth  : 120,
  height    : 120,
  margin    : '0 4px'
})

const getListStyle = () => ({
  display  : 'flex',
  overflowX: 'auto'
})

function PetGallery(props) {
  const [ items, setItems ] = useStateDerivedFromProps(props.items)

  const { _handleDebounce: _handleUpdateOrderImages } = useDebounce(
    (_items) => {
      props.onUpdate(
        _items.map((item, index) => ({
          ...item,
          pet_image_id: item.id,
          order       : index
        }))
      )
    }
  )
  const _handleDragEnd = (result) => {
    // dropped outside the list
    if(!result.destination) return
    const _items = reorder(
      items,
      result.source.index,
      result.destination.index
    )
    _handleUpdateOrderImages(_items)
    setItems(_items)
  }
  const _renderItem = (item, provided, snapshot) => {
    const itemNode = (
      <div
        ref={provided.innerRef}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className='gallery_image_container'>
        <Image
          bordered className='gallery_image' rounded
          src={item.filepath}/>
        {!snapshot.isDragging && (
          <Button
            className='gallery_button-delete'
            icon='trash alternate outline'
            onClick={props.onDelete(item)}/>
        )}
      </div>
    )

    return snapshot.isDragging
      ? ReactDOM.createPortal(itemNode, portal)
      : itemNode
  }

  return (
    <DragDropContext onDragEnd={_handleDragEnd}>
      <Droppable direction='horizontal' droppableId='droppable'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable draggableId={'' + item.id} index={index} key={item.id}>
                {(provided, snapshot) => _renderItem(item, provided, snapshot)}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default PetGallery
