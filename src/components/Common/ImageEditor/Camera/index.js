import React , { useRef } from 'react'
import PropTypes from 'prop-types'
import { Header, Button, Icon } from 'semantic-ui-react'
import Webcam from 'react-webcam'
import  './styles.scss'

const videoConstraints = {
  width     : 570,
  height    : 570,
  facingMode: 'user,'
}

function Camera({ onClose : _handleClose , onTakePhoto }) {
  const webcamRef =  useRef()
  const _handleTakePhotoBtnClick = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot()
      onTakePhoto(imageSrc)
    },
    [ webcamRef ]
  )

  return (
    <div className='c-camera-wrapper'>
      <div className='flex justify-end'>
        <Button basic icon onClick={_handleClose}>
          <Icon name='delete'/>
        </Button>
      </div>
      <div className='flex justify-between'>
        <Header content='Take photo'/>
      </div>

      <div className='flex flex-column align-center mh-auto'>
        <Webcam
          audio={false}
          className='web-camera'
          mirrored
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          videoConstraints={videoConstraints}/>
        <Button
          color='teal' content='Take photo'
          onClick={_handleTakePhotoBtnClick}/>
      </div>
    </div>
  )
}

Camera.propTypes = {
  onClose    : PropTypes.func.isRequired,
  onTakePhoto: PropTypes.func.isRequired
}

Camera.defaultProps = {  }

export default Camera
