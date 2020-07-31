import React from 'react'
import PropTypes from 'prop-types'
import { Card, Dimmer, Loader } from 'semantic-ui-react'

import GalleryItem from './Item'

import './styles.scss'

function Gallery({ list, onItemClick: _handleItemClick, onItemOptionClick: _handleItemOptionClick }) {
  const loading = list.status === 'GETTING'

  return (
    <Dimmer.Dimmable as='div' dimmed={loading}>
      <Dimmer active={loading} inverted>
        <Loader>Loading</Loader>
      </Dimmer>

      <Card.Group className='gallery' itemsPerRow={3}>
        {
          list.items.length > 0 ? (
            list.items.map((item) => (
              <GalleryItem
                item={item} key={item.id} onClick={_handleItemClick}
                onOptionClick={_handleItemOptionClick}/>
            ))
          ) : (
            <p style={{ color: '#CCC', textAlign: 'center', width: '100%' }}>There {'aren\'t'} photos or videos.</p>
          )
        }
      </Card.Group>
    </Dimmer.Dimmable>
  )
}

Gallery.propTypes = {
  list             : PropTypes.shape({}),
  onItemOptionClick: PropTypes.func.isRequired,
  onItemClick      : PropTypes.func.isRequired
}

export default Gallery
