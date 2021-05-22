import React from 'react'
import './styles.scss'

function InputLabel({ type, label, color }) {
  return (
    <label className={`label label-${color ? color : 'gray'}`}>
      {label}
      <input className='label-input' type={type}/>
    </label>
  )
}

function InputFront({ type, label, color }) {
  return (
    <label className={`label check label-${color ? color : 'gray'}`}>
      <input className={`label-input ${type === 'checkbox' ? 'checkDisplay' : ''}`} type={type}/>
      {label}
    </label>
  )
}

export { InputLabel, InputFront }
