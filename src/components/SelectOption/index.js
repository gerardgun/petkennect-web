import React from 'react'
import './styles.scss'

import { Select } from 'semantic-ui-react'

function SelectOption({ defaul_option, label }) {
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
    <div className='container'>
      {label && <p className='label'>{label}</p>}
      <Select className='select' placeholder={defaul_option} options={countries}/>
    </div>
    
  )
}

export default SelectOption
