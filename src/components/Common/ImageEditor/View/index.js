import React  from 'react'
import PropTypes from 'prop-types'
import { Header, Button, Icon, Image } from 'semantic-ui-react'
import ReactPlayer from 'react-player'
import  './styles.scss'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

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
            src={item.filepath || defaultImage}/>

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
