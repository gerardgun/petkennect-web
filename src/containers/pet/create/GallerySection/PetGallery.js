import React from 'react'
import PropTypes from 'prop-types'
import { Image, Button, Icon, Dropdown, Header } from 'semantic-ui-react'
import useModal from '@components/Modal/useModal'
import ReactPlayer from 'react-player'

function PetGalleryItem({ item , onOptionSelect: _handleOptionSelect }) {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  return (
    <div className='gallery_image_container'>
      {item.type === 'video' ? (
        <ReactPlayer
          className='react-player'
          height='100%'
          light
          url={item.filepath}
          width='100%'/>
      ) : (

        <Image
          bordered
          className='gallery_image'
          rounded
          src={item.filepath}/>
      )}
      {item.type === 'video'  && (
        <Icon className='gallery_camera-icon' name='video camera' size='large'/>
      )}
      <div className='gallery-description-container'>
        {item.description && <Header className='gallery_image-description' content={item.description}/>}
      </div>
      <Dropdown
        className='gallery_button-actions'
        direction='right'
        icon={null}
        onClose={_handleClose} onOpen={_handleOpen}
        selectOnBlur={false}
        trigger={
          <Button
            color={open ? 'blue' : null}
            icon>
            <Icon  name='ellipsis vertical'/>
          </Button>
        }
        value={null}>
        <Dropdown.Menu >
          {item.type === 'video' ? [
            { key: 'view_video', value: 'view_video', text: 'View Video' },
            {
              key      : 'delete_video',
              value    : 'delete_video',
              text     : 'Delete video',
              className: 'delete-option'
            }
          ] : [
            { key: 'view_photo', value: 'view_photo', text: 'View photo' },
            {
              key  : 'edit_photo',
              value: 'edit_photo',
              text : 'Edit photo'
            },
            {
              key      : 'delete_photo',
              value    : 'delete_photo',
              text     : 'Delete photo',
              className: 'delete-option'
            }
          ]
            .map(({ key, value, text,...rest }) => (
              <Dropdown.Item
                key={key}
                onClick={_handleOptionSelect(item)}
                value={value} {...rest}>
                {text}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

function PetGallery({
  items,
  onOptionSelect: _handleOptionSelect

}) {
  return (
    <div className='gallery'>
      {items.map((item) => (
        <PetGalleryItem
          item={item} key={item.id}
          onOptionSelect={_handleOptionSelect}/>
      ))}

    </div>
  )
}

PetGallery.propTypes = {
  items         : PropTypes.arrayOf(PropTypes.shape({})),
  onOptionSelect: PropTypes.func.isRequired
}

PetGallery.defaultProps = {}

export default PetGallery
