import React, { useRef, useState, useEffect } from 'react'
import './styles.scss'
import PropTypes from 'prop-types'
import { Header, Button, Icon, Form, Input } from 'semantic-ui-react'
import AvatarEditor from 'react-avatar-editor'
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { syncValidate, parseResponseError } from '@lib/utils/functions'
import { reduxForm, Field } from 'redux-form'

import  { v4 as uuidv4 } from 'uuid'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import ReactPlayer from 'react-player'

function Editor(props) {
  const {
    item,
    onClose: _handleClose,
    circularCropper,
    loading,
    detail,
    error,
    handleSubmit,
    reset
  } = props
  useEffect(()=> {
    return ()=> {
      reset()
    }
  }, [])
  const avatarEditorRef = useRef()
  const [ scale, setScale ] = useState(1)
  const [ rotate, setRotate ] = useState(0)

  const _handleSubmit = (values) => {
    if(item.type === 'video') {
      if(props.detail.editorMode === 'EDITOR_UPDATE')
        return props.dispatch(
          props.duckDetail.creators.editorPut({ ...item,...values  }, detail.editorMode)
        ).catch(parseResponseError)

      return props.dispatch(
        props.duckDetail.creators.editorPost({ ...item,...values ,file: item.video_file  }, detail.editorMode)
      ).catch(parseResponseError)
    }
    if(avatarEditorRef.current) {
      // const img = avatarEditorRef.current.getImageScaledToCanvas().toDataURL()
      const filepathlocal = avatarEditorRef.current.getImage().toDataURL()
      // onSaveImage({ filepath: img, ...values })
      const url = filepathlocal

      return  fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([ blob ], `${uuidv4()}.png`, { type: 'image/png' })

          if(props.detail.editorMode === 'EDITOR_UPDATE')
            return props.dispatch(
              props.duckDetail.creators.editorPut({ ...item,...values, file }, detail.editorMode)
            ).catch(parseResponseError)

          return props.dispatch(
            props.duckDetail.creators.editorPost({ ...item,...values , file  }, detail.editorMode)
          ).catch(parseResponseError)

          // onSaveImage(file)

        // eslint-disable-next-line no-restricted-syntax
        }).catch(parseResponseError)
    }
  }

  const _handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    setScale(scale)
  }

  const _handleRotateClick = (e) => {
    e.preventDefault()

    setRotate(rotate - 90)
  }

  const _handleLogEvent = (name) => () => {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Editor event log: ${name}`)
  }

  const _handleMinusBtnClick = () => {
    if(scale > 1) {
      if(scale - 0.1 >= 1) {
        setScale(scale - 0.1)

        return
      }
      setScale(1)
    }
  }

  const _handlePlusBtnClick = () => {
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
        <Header content={`Edit ${item.type === 'video' ? 'Video' : 'Photo'}`}/>
      </div>
      {item.type === 'video'  ? <div className='c-editor__image-wrapper'>

        <ReactPlayer
          className='react-player'
          controls
          height='100%'
          url={item.filepath}
          width='100%'/>
      </div> : (
        <div className='flex align-center justify-center'>
          {item.filepath ? (
            <AvatarEditor
              borderRadius={circularCropper ? 217 : 0}
              // className='web-camera'
              color={[ 0, 0, 0, 0.4 ]}
              crossOrigin='anonymous'
              height={434}
              image={item.filepath}
              onImageReady={_handleLogEvent('onImageReady')}
              onLoadFailure={_handleLogEvent('onLoadFailed')}
              onLoadSuccess={_handleLogEvent('onLoadSuccess')}
              ref={avatarEditorRef}
              rotate={parseFloat(rotate)}
              scale={parseFloat(scale)}
              width={434}/>
          ) : null}
        </div>
      )}

      {item.type !== 'video' && (
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
      )
      }

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form className='mt16' onSubmit={handleSubmit(_handleSubmit)}>
        <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={Input}
            // label='Description'
            name='description'
            placeholder='Enter description'/>
        </Form.Group>
        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }
      </Form>
      <div className='flex justify-end mt36'>
        <Button
          className='w120'
          content='Cancel'
          disabled={loading}
          onClick={_handleClose}
          type='button'/>
        <Button
          className='w120'
          color='teal'
          content='Done'
          disabled={loading}
          loading={loading}
          /* eslint-disable-next-line react/jsx-handler-names */
          onClick={handleSubmit(_handleSubmit)}/>
        {/* onClick={_handleSave}/> */}
      </div>
    </div>
  )
}

Editor.propTypes = {
  onClose        : PropTypes.func.isRequired,
  item           : PropTypes.shape({}),
  onSaveImage    : PropTypes.func.isRequired,
  circularCropper: PropTypes.bool.isRequired,
  loading        : PropTypes.bool
}

Editor.defaultProps = { item: {}, loading: false }

export default compose(
  connect(
    (state,  { item }) => {
      return {
        initialValues: item
      }
    },
    (dispatch) => ({ dispatch })
  ),
  reduxForm({
    form              : 'editor-create-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {

      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(Editor)
