import  './styles.scss'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Image, Button } from 'semantic-ui-react'
import { useStateDerivedFromProps, useDebounce, useRefFromValue } from '@hooks/Shared'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
import { getItemStyle, reorder, getListStyle } from './helpers'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import { useGalleryDispatch, useGalleryState } from 'src/contexts/GalleryContext'

const portal = document.getElementById('root')

const uC = useCallback

function Gallery(props) {
  const itemsGallery = useGalleryState()
  const [ items, setItems ] = useStateDerivedFromProps(props.enableLocal ? itemsGallery : props.items)
  const itemsRef = useRefFromValue(items)
  const setItemsGallery = useGalleryDispatch()
  const { _handleDebounce: _handleUpdateOrderImages } = useDebounce(
    (_items) =>
      props.onUpdate(
        _items.map((item, index) => ({
          ...item,
          order: index
        }))
      )

  )
  useEffect(()=> {
    if(props.enableLocal)
      setItemsGallery(items)
  },[ items, props.enableLocal ])

  const _handleUpdateImages = (_items) => {
    setItems(_items)
    if(props.enableLocal)
      return
    _handleUpdateOrderImages(_items)
  }

  const _handleDelete = (item) => () => {
    if(props.enableLocal) {
      setItems(items.filter(_item=> _item.id !== item.id))

      return
    }
    props.onDelete(item)
  }

  const _handleCreate = (images = [], _acceptedFiles = []) => {
    if(props.enableLocal) {
      const reader = new FileReader()

      reader.onload = () => {
        setItems([ ...itemsRef.current,{ localPath: reader.result,id: uuidv4() ,/* temp reference is erased,jajaaj v:*/file: [ ...images ] } ])
      }
      reader.readAsDataURL(_acceptedFiles[0])

      return
    }

    props.onCreate(images)
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
          src={props.enableLocal ? item.localPath : item.filepath}/>
        {!snapshot.isDragging && (
          <Button
            className='gallery_button-delete'
            icon='trash alternate outline'
            onClick={_handleDelete(item)}/>
        )}
      </div>
    )

    return snapshot.isDragging
      ? ReactDOM.createPortal(itemNode, portal)
      : itemNode
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

  /** */

  const _handleDrop = uC((_acceptedFiles, _rejectedFiles , event) => {
    const images = event.dataTransfer ? event.dataTransfer.files : event.target.files
    _handleCreate(images,_acceptedFiles)
  }, [])

  const {
    getRootProps,
    getInputProps
  } = useDropzone({ onDrop: _handleDrop, accept: 'image/*' ,multiple: false })

  /** */
  return (

    <div className='c-gallery'>

      <div {...getRootProps()}  className='gallery_drop-zone'>
        <input {...getInputProps()}/>
        <div>Drag and Drop a Image</div>
      </div>
      <DragDropContext onDragEnd={_handleDragEnd}>
        <Droppable direction='horizontal' droppableId='droppable'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}>
              {items.map((item, index) => (
                props.enableLocal ?  (
                  <Draggable draggableId={'' + item.id} index={index} key={item.id}>
                    {(provided, snapshot) => _renderItem(item, provided, snapshot)}
                  </Draggable>
                ) : (
                  <Draggable draggableId={'' + item.id} index={index} key={item.id}>
                    {(provided, snapshot) => _renderItem(item, provided, snapshot)}
                  </Draggable>
                )
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  )
}

Gallery.defaultProps = {
  enableLocal: false,
  items      : []
}
Gallery.propTypes = {
  form: PropTypes.string.isRequired
}

export default Gallery

