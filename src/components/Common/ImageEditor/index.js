import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'

import Camera from './Camera'
import Editor from './Editor'
import Picker from './Picker'
import View from './View'

import './styles.scss'

function ImageEditor(props) {
  const {
    circularCropper,
    detail,
    duck,
    duckDetail
  } = props

  useEffect(()=> {
    if(detail.status === 'POSTED' || detail.status === 'PUT') _handleClose()
  }, [ detail.status ])

  const _handleClose = () => {
    props.dispatch(
      duckDetail.creators.resetItem()
    )
  }

  const _handleTakePhoto = (_imageURL) => {
    props.dispatch(
      duckDetail.creators.setItem({ ...detail.item , filepath: _imageURL }, 'CREATE')
    )
  }

  const _handlePickConfirm = () => {
    props.dispatch(
      duckDetail.creators.setItem(detail.item, 'CREATE')
    )
  }

  const isOpened = useMemo(() => {
    return [ 'CREATE', 'READ', 'PICK', 'TAKE', 'UPDATE' ].includes(detail.mode)
  }, [ detail.mode ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {
          (detail.mode === 'CREATE' || detail.mode === 'UPDATE') && (
            <Editor
              circularCropper={circularCropper}
              detail={detail}
              duckDetail={duckDetail}
              onClose={_handleClose}/>
          )
        }
        {
          detail.mode === 'READ' && <View item={detail.item}/>
        }
        {
          detail.mode === 'PICK' && (
            <Picker
              detail={detail}
              duck={duck}
              duckDetail={duckDetail}
              onClose={_handleClose}
              onConfirm={_handlePickConfirm}/>
          )
        }
        {
          detail.mode === 'TAKE' && <Camera onClose={_handleClose} onTakePhoto={_handleTakePhoto}/>
        }
      </Modal.Content>
    </Modal>
  )
}

ImageEditor.propTypes = {
  circularCropper: PropTypes.bool
}

ImageEditor.defaultProps = {
  duck           : null,
  duckDetail     : null,
  circularCropper: false
}

export default compose(
  connect(
    (state, { duckDetail }) => ({
      detail: state[duckDetail.store]
    }),
    dispatch => ({ dispatch })
  )
)(ImageEditor)
