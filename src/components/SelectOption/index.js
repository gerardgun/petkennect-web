import React from 'react'
import './styles.scss'

function SelectOption({ defaul_option }) {
  return (
    <select className='select' id='location' name='locationPicker'>
      <option hidden selected>{defaul_option}</option>
      <option value='New York'>Option 1</option>
      <option value='New York'>Option 2</option>
      <option value='New York'>Option 3</option>
      <option value='New York'>Option 4</option>
      <option value='New York'>Option 5</option>
    </select>
  )
}

export default SelectOption
