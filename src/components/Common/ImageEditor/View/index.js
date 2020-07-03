import React  from 'react'
import PropTypes from 'prop-types'
import { Header, Button, Icon, Image } from 'semantic-ui-react'
import  './styles.scss'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

function View({ onClose : _handleClose, imageURL }) {
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

      <div className='flex flex-column align-center mh-auto'>
        <Image
          className='web-camera'
          src={imageURL || defaultImage}/>

      </div>
    </div>
  )
}

View.propTypes = {
  onClose : PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired
}

View.defaultProps = {  }

export default View
