import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import { Button, Image, Input, Label, Icon } from 'semantic-ui-react'
import _truncate from 'lodash/truncate'

import './styles.scss'

function InputFile(props) {
  const { accept, multiple, value, ...rest } = props

  const [ filename, setFilename ] = useState('')
  const [ tempURL, setTempURL ] = useState('')

  useEffect(() => {
    if(value) {
      setFilename(_truncate(value.split('/').pop(), { length: 30 }))
      setTempURL(value)
    }
  }, [])

  const _handleDeleteClick = () => {
    setFilename('')
    setTempURL('')
  }

  const _handleDrop = useCallback((acceptedFiles, fileRejections, e) => {
    const [ file ] = acceptedFiles

    setFilename(_truncate(file.name, { length: 30 }))
    setTempURL(URL.createObjectURL(file))

    const data = {
      ...props,
      value: acceptedFiles
    }

    props.onChange.call(this, e, data)
  }, [])

  const { getRootProps, getInputProps/* , isDragActive */ } = useDropzone({ onDrop: _handleDrop })

  return (
    <Input
      action={Boolean(tempURL)}
      className='input-file'
      labelPosition='left' {...rest} {...getRootProps()}>
      {
        tempURL ? (
          <Label basic image>
            <Image src={tempURL}/>
          </Label>
        ) : (
          <Label basic>
            <Icon name='cloud upload'/>
          </Label>
        )
      }
      <input readOnly value={filename}/>
      <input
        type='hidden' {...getInputProps()} accept={accept}
        multiple={multiple}/>
      {
        tempURL && (
          <Button
            basic icon='delete' onClick={_handleDeleteClick}
            type='button'/>
        )
      }
    </Input>
  )
}

InputFile.propTypes = {
  onChange   : PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

InputFile.defaultProps = {
  onChange   : () => {},
  placeholder: 'Choose file...',
  accept     : 'image/*',
  multiple   : false
}

export default InputFile
