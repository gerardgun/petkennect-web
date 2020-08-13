import React from 'react'
import PropTypes from 'prop-types'
import { Header, Button } from 'semantic-ui-react'

import Gallery from '@containers/pet/create/GallerySection/Gallery'

function Picker({ detail, duck, duckDetail, onClose: _handleClose, onConfirm: _handleConfirmBtnClick }) {
  return (
    <>
      <Header as='h2'>
        <Header.Content>
          Select Photo
        </Header.Content>
      </Header>
      <div className='mv32'>
        <Gallery
          duck={duck}
          duckDetail={duckDetail}
          selectable/>
      </div>
      <div className='flex justify-end mt36'>
        <Button
          basic
          className='w120'
          color='teal'
          content='Cancel'
          onClick={_handleClose}/>
        <Button
          className='w120'
          color='teal'
          content='Done'
          disabled={!detail.item.id}
          onClick={_handleConfirmBtnClick}/>
      </div>
    </>
  )
}

Picker.propTypes = {
  onClose  : PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default Picker
