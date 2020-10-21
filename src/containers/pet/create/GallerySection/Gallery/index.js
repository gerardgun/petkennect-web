import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { Card, Dimmer, Loader } from 'semantic-ui-react'

import GalleryItem from './Item'

import './styles.scss'

function Gallery({ duckDetail, detail, list, selectable, onItemClick, onItemOptionClick: _handleItemOptionClick, ...props }) {
  const _handleItemClick = (e, data) => {
    if(selectable)
      props.dispatch(duckDetail.creators.setItem({ ...data.item, ...initialItemState }, detail.mode))
    else
      onItemClick(e, data)
  }

  const initialItemState = useMemo(() => detail ? detail.item : null, [])
  const loading = list.status === 'GETTING'

  return (
    <Dimmer.Dimmable as='div' dimmed={loading}>
      <Dimmer active={loading} inverted>
        <Loader>Loading</Loader>
      </Dimmer>

      <Card.Group
        className='gallery' doubling={true} itemsPerRow={3}
        stackable={true}>
        {
          list.items.length > 0 ? (
            list.items.map((item) => (
              <GalleryItem
                item={item} key={item.id}
                onClick={_handleItemClick} onOptionClick={_handleItemOptionClick}
                selected={selectable ? detail.item.id === item.id : null}/>
            ))
          ) : (
            <p style={{ color: '#AAA', textAlign: 'center', width: '100%' }}>There {'aren\'t'} photos or videos.</p>
          )
        }
      </Card.Group>
    </Dimmer.Dimmable>
  )
}

Gallery.propTypes = {
  duck             : PropTypes.object,
  duckDetail       : PropTypes.object,
  onItemOptionClick: PropTypes.func.isRequired,
  onItemClick      : PropTypes.func.isRequired,
  selectable       : PropTypes.bool
}

Gallery.defaultProps = {
  duck             : null,
  duckDetail       : null,
  onItemOptionClick: () => {},
  onItemClick      : () => {},
  selectable       : false
}

export default compose(
  connect(
    (state, { duck, duckDetail }) => ({
      detail: typeof duckDetail !== 'undefined' ? state[duckDetail.store] : null,
      list  : state[duck.store]
    }),
    dispatch => ({ dispatch })
  )
)(Gallery)
