import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const CheckboxGroup = props => {
  const {
    options,
    ...rest
  } = props

  const _handleChange = (e, data) => {
    const currentValue = Array.from(rest.value)

    if(data.checked) currentValue.push(data.value)
    else currentValue.splice(currentValue.findIndex(value => value === data.value), 1)

    props.onChange(e, {
      ...data,
      value: currentValue
    })
  }

  return (
    <div>
      {
        options.map((option, index) => (
          <Checkbox
            {...rest}
            checked={rest.value?.includes(option.value)}
            key={index}
            label={option.text}
            onChange={_handleChange}
            style={{ marginRight: '1.5rem' }}
            value={option.value}/>
        ))
      }
    </div>
  )
}

CheckboxGroup.defaultProps = {
  options: []
}

export default CheckboxGroup
