import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'semantic-ui-react'

function ImageItem({ image, onSelectImage, selected }) {
  const _handleSelectImage = ()=> {
    onSelectImage(image)
  }

  return (
    <Image className={`image-item  shadow-2 ${ selected && 'selected'}`} onClick={_handleSelectImage} src={image.filepath}/>
  )
}

ImageItem.propTypes = {
  image        : PropTypes.shape({}).isRequired,
  onSelectImage: PropTypes.func.isRequired
}

ImageItem.defaultProps = {  }

export default ImageItem
