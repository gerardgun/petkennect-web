import React , { useState } from 'react'
import PropTypes from 'prop-types'
import { Header, Button, Icon } from 'semantic-ui-react'
import  './styles.scss'
import ImageItem from './ImageItem'

function Picker({ onClose : _handleClose , onSavePhotoSelected, images }) {
  const [ currentImage, setCurrentImage ] = useState({})

  const _handleSelectPhoto = (_image) => {
    setCurrentImage(_image)
  }

  const _handleDoneBtnClick = () => {
    onSavePhotoSelected(currentImage.url)
  }

  return (
    <div className='c-picker-wrapper'>
      <div className='flex justify-end'>
        <Button basic icon onClick={_handleClose}>
          <Icon name='delete'/>
        </Button>
      </div>
      <div className='flex justify-between'>
        <Header content='Select photo'/>
      </div>

      <div className='images-wrapper'>
        {images.length === 0 && <Header>Empty gallery</Header>}
        {images.map(_image => (
          <ImageItem
            image={_image} key={_image.id} onSelectImage={_handleSelectPhoto}
            selected={_image.id === currentImage.id}/>
        ))}
      </div>
      <div className='flex justify-end mt36'>
        <Button
          className='w120'
          content='Cancel'
          onClick={_handleClose}
          type='button'/>
        <Button
          className='w120'
          color='teal'
          content='Done'
          disabled={!currentImage.url}
          onClick={_handleDoneBtnClick}/>
      </div>
    </div>
  )
}

Picker.propTypes = {
  onClose    : PropTypes.func.isRequired,
  onTakePhoto: PropTypes.func.isRequired,
  images     : PropTypes.arrayOf(PropTypes.shape({}))
}

Picker.defaultProps = { images: [] }

export default Picker
