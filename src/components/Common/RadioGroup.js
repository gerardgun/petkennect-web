import React from 'react'
import { Radio } from 'semantic-ui-react'

const RadioGroup = props => {
  const {
    inline,
    options,
    label,
    ...rest
  } = props

  return (
    <div className='pt12'>
      {
        label && (
          <label>{label}</label>
        )
      }
      {
        options.map(option => (
          <Radio
            {...rest}
            checked={option.value === rest.value} key={option.key}
            label={option.text}
            style={inline == false ? { marginTop: '.5rem' ,marginBottom: '.6rem' , display: 'block' } : { marginRight: '1.5rem' }}
            value={option.value}/>
        ))
      }
    </div>
  )
}

RadioGroup.defaultProps = {
  options: [],
  label  : null
}

export default RadioGroup
