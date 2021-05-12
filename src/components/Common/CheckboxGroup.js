import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const CheckboxGroup = props => {
  const {
    inline,
    options,
    ...rest
  } = props

  const _handleChange = (e, data) => {
    const currentValue = Array.from(rest.value)

    if(data.checked) currentValue.push(data.value)
    else currentValue.splice(currentValue.findIndex(value => value === data.value), 1)

    delete data.type

    props.onChange(e, {
      ...data,
      value: currentValue
    })
  }

  return (
    <div className='pt12'>
      {
        options.length > 0 ? (
          options.map((option, index) => (
            <Checkbox
              {...rest}
              checked={rest.value?.includes(option.value)}
              key={index}
              label={option.text}
              onChange={_handleChange}
              style={inline == false ? { marginTop: '.5rem' ,marginBottom: '.6rem' , display: 'block' } : { marginRight: '1.5rem' }}
              value={option.value}/>
          ))
        ) : (
          <div className='text-gray'>The are not available options.</div>
        )
      }
    </div>
  )
}

CheckboxGroup.defaultProps = {
  options: []
}

export default CheckboxGroup
