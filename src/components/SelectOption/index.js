import React from 'react'
import './styles.scss'

import { Select } from 'semantic-ui-react'

function SelectOption({ defaul_option }) {
  const countries = [
    {key: '1', value: '1', text:'New York'},
    {key: '1', value: '1', text:'New York'},
    {key: '1', value: '1', text:'New York'},
    {key: '1', value: '1', text:'New York'},
    {key: '1', value: '1', text:'New York'},
    {key: '1', value: '1', text:'New York'},
    {key: '1', value: '1', text:'New York'},
    {key: '1', value: '1', text:'New York'},
    {key: '1', value: '1', text:'New York'},
  ]
  
  return (
    <Select className='select' placeholder={defaul_option} options={countries}/>
  )
}

export default SelectOption
