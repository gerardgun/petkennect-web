import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import Camera from './Camera'
import Editor from './Editor'
import Picker from './Picker'
import View from './View'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useEffect } from 'react'

function ImageEditor(props) {
  const {
    list,
    circularCropper,
    duckDetail,
    detail
  } = props

  useEffect(()=> {
    if(detail.status === 'EDITOR_POSTED' || detail.status === 'EDITOR_PUT')
      _handleClose()
  }, [ detail.status ])

  const _handleClose = () => {
    props.dispatch(
      duckDetail.creators.resetEditorItem()
    )
    props.dispatch(
      duckDetail.creators.reset()
    )
  }

  const _handleTakePhoto = (_imageURL) => {
    props
      .dispatch(
        duckDetail.creators.setEditorItem({ ...detail.editorItem , filepath: _imageURL }, detail.editorMode, 'EDITOR')
      )
  }

  const _handleSelectPhoto = (_imageURL) => {
    props.dispatch(
      duckDetail.creators.setEditorItem({ ...detail.editorItem, filepath: _imageURL }, detail.editorMode, 'EDITOR')
    )
  }

  const getIsOpened = mode => (mode === 'EDITOR_CREATE' || mode === 'EDITOR_UPDATE' || mode === 'EDITOR_READ')

  const isOpened = useMemo(() => getIsOpened(detail.editorMode), [ detail.editorMode ])

  const saving = detail.status === 'EDITOR_POSTING' || detail.status === 'EDITOR_PUTTING'

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {detail.editorStep === 'VIEW' && <View item={detail.editorItem} onClose={_handleClose}/>}
        {detail.editorStep  === 'CAMERA' && (
          <Camera onClose={_handleClose} onTakePhoto={_handleTakePhoto}/>
        )}
        {detail.editorStep  === 'PICKER' && (
          <Picker
            images={list.items}
            onClose={_handleClose}
            onSavePhotoSelected={_handleSelectPhoto}/>
        )}
        {detail.editorStep  === 'EDITOR' && (
          <Editor
            circularCropper={circularCropper}
            detail={detail}
            duckDetail={duckDetail}
            item={detail.editorItem}
            loading={saving}
            onClose={_handleClose}/>
        )}

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
    (state, { duck, duckDetail }) => ({
      list  : duck.selectors.list(state),
      detail: state[duckDetail.store]
    }),
    (dispatch) => ({ dispatch })
  )
)(ImageEditor)
