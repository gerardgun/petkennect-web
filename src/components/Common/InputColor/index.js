import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Icon, Input, Popup } from 'semantic-ui-react'
import { SketchPicker } from 'react-color'
import { v4 as uuidv4 } from 'uuid'

import './style.scss'

function InputColor(props) {
  const _handlePickerChange = ({ hex }, e) => {
    const data = {
      ...props,
      value: hex.toUpperCase()
    }

    props.onChange.call(this, e, data)
  }

  const uuidClassName = useMemo(() => `input-color-icon-${uuidv4()}`, [])

  return (
    <>
      <style>
        {
          `
            i.circular.inverted.icon.${uuidClassName} {
              background-color: ${props.value} !important;
            }
          `
        }
      </style>
      <Input
        className='input-color'
        icon={
          <Popup
            basic
            className='input-color-pop-up'
            content={()=>(
              <SketchPicker
                color={props.value}
                disableAlpha
                onChangeComplete={_handlePickerChange}/>
            )}
            on='click'
            pinned
            trigger={
              <Icon
                circular className={`input-color-icon ${uuidClassName}`} disabled={props.disabled}
                inverted link name='eye dropper'/>
            }/>
        }
        {...props}/>
    </>
  )
}

InputColor.propTypes = {
  onChange   : PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

InputColor.defaultProps = {
  onChange   : () => {},
  placeholder: 'Pick color'
}

export default InputColor
