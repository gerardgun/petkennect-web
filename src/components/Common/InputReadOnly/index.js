import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import './styles.scss'

function InputReadOnly({ value, label, ...rest }) {
  return (
    <Grid.Column className='input-read-only' {...rest}>
      <label>{label}</label>
      {value}
    </Grid.Column>
  )
}

InputReadOnly.propTypes = {
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]).isRequired,
  label: PropTypes.string.isRequired
}

export default InputReadOnly
