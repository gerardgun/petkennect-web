import './styles.scss'
import React from 'react'
import { useDragLayer } from 'react-dnd'
import ItemTypes from '@lib/constants/ItemTypes'
import PetImageDragPreview from './PetImageDragPreview'
import snapToGrid from './snapToGrid'
const layerStyles = {
  position     : 'fixed',
  pointerEvents: 'none',
  zIndex       : 10000,
  left         : 0,
  top          : 0,
  width        : '100vh',
  height       : '100vh'
  // width          : '100%',
  // height         : '100%',
}
function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if(!initialOffset || !currentOffset)
    return {
      display: 'none'
      // position: 'absolute',
    }

  let { x, y } = currentOffset
  if(isSnapToGrid) {
    x -= initialOffset.x
    y -= initialOffset.y
    ;[ x, y ] = snapToGrid(x, y)
    x += initialOffset.x
    y += initialOffset.y
  }
  const transform = `translate(${x}px, ${y}px)`

  return {
    transform,
    WebkitTransform: transform
  }
}
const CustomDragLayer = (props) => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset
  } = useDragLayer((monitor) => ({
    item         : monitor.getItem(),
    itemType     : monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging   : monitor.isDragging()
  }))
  function renderItem() {
    switch (itemType) {
      case ItemTypes.PET_ITEM:
        return <PetImageDragPreview src={item.src}/>
      default:
        return null
    }
  }
  if(!isDragging)
    return null

  return (
    <div className='custom-dragger-layer' style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, false)}>
        {renderItem()}
      </div>
    </div>
  )
}
export default CustomDragLayer
