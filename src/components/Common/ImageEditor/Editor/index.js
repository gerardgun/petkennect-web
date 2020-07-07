import React , { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Header, Button, Icon } from 'semantic-ui-react'
import  AvatarEditor from 'react-avatar-editor'

function Editor({ imageURL, onClose : _handleClose , onSaveImage, circularCropper }) {
  const avatarEditorRef =  useRef()
  const [ scale, setScale ] = useState(1)
  const [ rotate, setRotate ] = useState(0)

  const  _handleSave = () => {
    if(avatarEditorRef.current) {
      // const img = avatarEditorRef.current.getImageScaledToCanvas().toDataURL()
      const img = avatarEditorRef.current.getImage().toDataURL()
      onSaveImage(img)
    }
  }

  const _handleScale = e => {
    const scale = parseFloat(e.target.value)
    setScale(scale)
  }

  const  _handleRotateClick = e => {
    e.preventDefault()

    setRotate(rotate - 90)
  }

  const  _handleLogEvent =  name => () => {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Editor event log: ${name}`)
  }

  const _handleMinusBtnClick = ()  => {
    if(scale > 1) {
      if(scale - 0.1 >= 1) {
        setScale(scale - 0.1)

        return
      }
      setScale(1)
    }
  }

  const _handlePlusBtnClick = ()  => {
    if(scale < 2) {
      if(scale + 0.1 <= 2) {
        setScale(scale + 0.1)

        return
      }
      setScale(2)
    }
  }

  return (
    <div className='c-editor-wrapper'>
      <div className='flex '>
        <Header content='Edit Photo'/>
      </div>
      <div className='flex flex-column align-center mh-auto'>
        <div className='image-wrapper'>
          {imageURL && (
            <AvatarEditor
              borderRadius={circularCropper ? 217 : 0}
              className='editor-canvas'
              color={[ 0, 0, 0, 0.4 ]}
              crossOrigin='anonymous'
              height={434}
              image={imageURL}
              onImageReady={_handleLogEvent('onImageReady')}
              onLoadFailure={_handleLogEvent('onLoadFailed')}
              onLoadSuccess={_handleLogEvent('onLoadSuccess')}
              ref={avatarEditorRef}
              rotate={parseFloat(rotate)}
              scale={parseFloat(scale)}
              width={434}/>

          )}
        </div>

      </div>
      <div className='flex justify-between mt16'>
        <Button icon onClick={_handleRotateClick}>
          <Icon name='undo'/>
        </Button>
        <div className='flex w100 ml16'>
          <Button
            basic className='mr4' icon
            onClick={_handleMinusBtnClick}>
            <Icon name='minus'/>
          </Button>
          <input
            className='w100'
            defaultValue='1'
            max='2'
            min='1'
            name='scale'
            onChange={_handleScale}
            step='0.01'
            type='range'
            value={scale}/>
          <Button
            basic className='ml4' icon
            onClick={_handlePlusBtnClick}>
            <Icon name='plus'/>
          </Button>

        </div>
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
          onClick={_handleSave}/>
      </div>

    </div>
  )
}

Editor.propTypes = {
  onClose        : PropTypes.func.isRequired,
  imageURL       : PropTypes.string.isRequired,
  onSaveImage    : PropTypes.func.isRequired,
  circularCropper: PropTypes.bool.isRequired
}

Editor.defaultProps = {  }

export default Editor
