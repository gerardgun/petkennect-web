import React , { useRef, useEffect } from 'react'
import { useDrag , useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { Button, Image } from 'semantic-ui-react'

import ItemTypes from '@lib/constants/ItemTypes'

const PetImage  =  ({ image , onDelete: _handleDelete, onUpdate: _handleUpdate }) => {
  const ref = useRef(null)
  const [ { opacity }, drag, preview ] = useDrag({
    item   : { id: image.id, type: ItemTypes.PET_ITEM, order: image.order ,src: image.filepath },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1
    })
  })

  const [ { isActive }, drop ] = useDrop({
    accept : ItemTypes.PET_ITEM,
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver()
    }),
    drop: (item) =>
      _handleUpdate({ pet_image_drag: item, pet_image_drop: image })
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  drag(drop(ref))

  return (
    <div  className={'gallery_image_container'} ref={ref}style={{ opacity }}>
      {isActive ? null : <Image
        bordered className='gallery_image'
        rounded src={image.filepath}/>}

      <Button className='gallery_button-delete' icon='trash alternate outline' onClick={_handleDelete(image)}/>
    </div>

  )
}

export default PetImage
