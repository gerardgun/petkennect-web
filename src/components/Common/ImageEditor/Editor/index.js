import React, { useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import AvatarEditor from 'react-avatar-editor'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { Header, Button, Icon, Image, Form, Input } from 'semantic-ui-react'
import  { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { syncValidate, parseResponseError } from '@lib/utils/functions'

function Editor(props) {
  const {
    onClose: _handleClose,
    circularCropper,
    detail: { item, ...detail },
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const avatarEditorRef = useRef()
  const [ scale, setScale ] = useState(1)
  const [ rotate, setRotate ] = useState(0)

  const _handleSubmit = values => {
    if(detail.mode === 'CREATE') {
      if(item.filetype === 'video') {
        return props.dispatch(
          props.duckDetail.creators.post({ ...item,...values, files: item.filepath })
        ).catch(parseResponseError)
      } else if(item.filetype === 'image' && avatarEditorRef.current) {
        const dataURL = avatarEditorRef.current.getImage().toDataURL()

        return fetch(dataURL)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([ blob ], `${uuidv4()}.png`, { type: 'image/png' })

            return props.dispatch(
              props.duckDetail.creators.post({ ...item, ...values, files: file })
            ).catch(parseResponseError)
          })
      }
    } else if(detail.mode === 'UPDATE') {
      return props.dispatch(
        props.duckDetail.creators.put({ ...item, ...values, pet_id: item.pet, pet_image_id: item.id })
      ).catch(parseResponseError)
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

  const objectURL = useMemo(() => {
    return item.filepath instanceof File ? URL.createObjectURL(item.filepath) : null
  }, [])

  return (
    <>
      <Header as='h2'>
        <Header.Content>
          Edit {item.filetype === 'video' ? 'Video' : 'Photo'}
          <Header.Subheader>{item.filename}</Header.Subheader>
        </Header.Content>
      </Header>
      {
        item.filetype === 'video' && (
          <div className='player-wrapper mb16'>
            <ReactPlayer
              className='react-player'
              controls
              height='100%'
              url={objectURL || item.filepath}
              width='100%'/>
          </div>
        )
      }
      {
        item.filetype === 'image' && detail.mode === 'UPDATE' && (
          <Image
            className='mb16'
            rounded
            src={item.filepath}/>
        )
      }
      {
        item.filetype === 'image' && detail.mode === 'CREATE' && (
          <>
            <div className='flex align-center justify-center'>
              {objectURL ? (
                <AvatarEditor
                  borderRadius={circularCropper ? 217 : 0}
                  color={[ 0, 0, 0, 0.4 ]}
                  crossOrigin='anonymous'
                  height={434}
                  image={objectURL}
                  onImageReady={_handleLogEvent('onImageReady')}
                  onLoadFailure={_handleLogEvent('onLoadFailed')}
                  onLoadSuccess={_handleLogEvent('onLoadSuccess')}
                  ref={avatarEditorRef}
                  rotate={parseFloat(rotate)}
                  scale={parseFloat(scale)}
                  width={434}/>
              ) : null}
            </div>
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
          </>
        )
      }

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form className='mt16' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        <Form.Group widths='equal'>
          <Field
            autoFocus
            component={FormField}
            control={Input}
            // label='Description'
            name='filename'
            placeholder='Enter some description'/>
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

        <Form.Group widths='equal'>
          <Form.Field style={{ textAlign: 'right' }}>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              disabled={submitting}
              onClick={_handleClose}
              type='button'/>
            <Button
              className='w120'
              color='teal'
              content='Done'
              disabled={submitting}
              loading={submitting}/>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  )
}

Editor.propTypes = {
  onClose        : PropTypes.func.isRequired,
  detail         : PropTypes.shape({}),
  circularCropper: PropTypes.bool.isRequired
}

export default compose(
  connect(
    (state, { detail }) => {
      return {
        initialValues: { ...detail.item }
      }
    },
    dispatch => ({ dispatch })
  ),
  reduxForm({
    form              : 'gallery-editor',
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        filename: Yup.string().required('Filename is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(Editor)
