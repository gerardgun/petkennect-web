import React  from 'react'
import PropTypes from 'prop-types'
import { Header, Button, Icon, Image } from 'semantic-ui-react'
import ReactPlayer from 'react-player'

import { defaultImageUrl } from '@lib/constants'

import  './styles.scss'

function View({ onClose : _handleClose, item }) {
  return (
    <div className='c-view-wrapper'>
      <div className='flex justify-end'>
        <Button basic icon onClick={_handleClose}>
          <Icon name='delete'/>
        </Button>
      </div>
      <div className='flex justify-between'>
        <Header content='View photo'/>
      </div>

      <div className='c-view__image-wrapper'>
        {item.type === 'video' ? <ReactPlayer
          className='react-player'
          controls
          height='100%'
          url={item.filepath}
          width='100%'/> : (
          <Image
            className='web-camera'
            src={item.filepath || defaultImageUrl}/>

        )}
        <div className='overlay'>
          {
            item.description && <Header className='description' content={item.description}/>
          }
        </div>

      </div>
    </div>
  )
}

View.propTypes = {
  onClose    : PropTypes.func.isRequired,
  url        : PropTypes.string,
  description: PropTypes.string
}

View.defaultProps = {
  url        : '',
  description: ''
}

export default View
