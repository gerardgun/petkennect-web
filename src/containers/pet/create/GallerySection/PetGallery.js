import React from 'react'
import PropTypes from 'prop-types'
import { Image, Button, Icon } from 'semantic-ui-react'

function PetGallery({ items , onDelete: _handleDelete /* onUpdate:_handleUpdate */ }) {
  return (
    <div className='gallery'>
      {items.map(item=> (
        <div
          className='gallery_image_container'
          key={item.id}>
          <Image
            bordered className='gallery_image' rounded
            src={item.filepath}/>
          <Button
            className='gallery_button-delete'
            icon
            onClick={_handleDelete(item)}>
            <Icon color='red' name='trash alternate outline'/>
          </Button>
          {/* <Button
            className='gallery_button-edit'
            icon='edit'
            onClick={_handleUpdate(item)}/> */}
        </div>))}
    </div>
  )
}

PetGallery.propTypes = {
  items   : PropTypes.arrayOf(PropTypes.shape({})),
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

PetGallery.defaultProps = {  }

export default PetGallery
