import React , { useState } from 'react'
import PropTypes from 'prop-types'
import {  Modal } from 'semantic-ui-react'
import  Camera from './Camera'
import Editor from  './Editor'
import Picker from './Picker'
import View from './View'
import { v4 as uuidv4 } from 'uuid'

function ImageEditor({ initialStep, open, onClose : _handleClose , pickerImages, initialImageURL, onSaveImage , circularCropper }) {
  const [ step, setStep ] = useState(initialStep)
  const [ imageURL, setImageURL ] = useState(initialImageURL)

  const _handleTakePhoto = _imageURL => {
    setImageURL(_imageURL)
    setStep('EDITOR')
  }

  const _handleSelectPhoto = _imageURL => {
    setImageURL(_imageURL)
    setStep('EDITOR')
  }

  const _handleSaveEditorImage = _imageUrl => {
    const url = _imageUrl
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([ blob ], `${uuidv4()}.png`,{ type: 'image/png' })
        onSaveImage(file)

        // eslint-disable-next-line no-restricted-syntax
        console.log(file)
      })
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={open}
      size='small'>
      <Modal.Content>
        {step === 'VIEW' && <View imageURL={initialImageURL} onClose={_handleClose}/>}
        {step === 'CAMERA' && <Camera onClose={_handleClose} onTakePhoto={_handleTakePhoto}/>}
        {step === 'PICKER' && <Picker images={pickerImages} onClose={_handleClose} onSavePhotoSelected={_handleSelectPhoto}/>}
        {step === 'EDITOR' && <Editor
          circularCropper={circularCropper} imageURL={imageURL} onClose={_handleClose}
          onSaveImage={_handleSaveEditorImage}/>}
      </Modal.Content>
    </Modal>
  )
}

ImageEditor.propTypes = {
  open           : PropTypes.bool.isRequired,
  initialStep    : PropTypes.oneOf([ 'VIEW','CAMERA', 'EDITOR', 'PICKER' ]),
  initialImageURL: PropTypes.string,
  onClose        : PropTypes.func.isRequired,
  onSaveImage    : PropTypes.func.isRequired,
  circularCropper: PropTypes.bool,
  /**
   * use when initialStep: 'PICKER'
   *  */
  pickerImages   : PropTypes.arrayOf(PropTypes.shape({
    id : PropTypes.oneOfType([ PropTypes.number,PropTypes.string ]).isRequired,
    url: PropTypes.string.isRequired
  }))

}

ImageEditor.defaultProps = {
  initialStep    : 'CAMERA',
  initialImageURL: null,
  pickerImages   : [],
  circularCropper: false
}

export default ImageEditor
