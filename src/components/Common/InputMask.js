import React from 'react'
import ReactInputMask from 'react-input-mask'

function InputMask(props) {
  const {
    // Native Props of Input Mask
    alwaysShowMask,
    beforeMaskedStateChange,
    mask,
    maskPlaceholder,
    // Props that needs managed for Input Mask
    onChange,
    onFocus: _handleFocus,
    onBlur,
    value,
    disabled,
    readOnly
  } = props

  const _handleChange = e => {
    const data = {
      ...props,
      value: e.currentTarget.value
    }

    onChange.call(this, e, data)
  }

  const _handleBlur = e => {
    const data = {
      ...props,
      value: e.currentTarget.value
    }

    onBlur.call(this, e, data)
  }

  return (
    <ReactInputMask
      alwaysShowMask={alwaysShowMask} beforeMaskedStateChange={beforeMaskedStateChange} disabled={disabled}
      mask={mask} maskPlaceholder={maskPlaceholder} onBlur={_handleBlur}
      onChange={_handleChange}
      onFocus={_handleFocus} readOnly={readOnly}
      value={value}>
    </ReactInputMask>
  )
}

InputMask.defaultProps = {
  alwaysShowMask         : false,
  beforeMaskedStateChange: null,
  maskPlaceholder        : '_',
  value                  : null
}

export default InputMask
