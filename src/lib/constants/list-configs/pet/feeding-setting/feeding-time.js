import React from 'react'
import Switch from 'react-switch'

export default {
  options: {
  },
  columns: [
    {
      display_name: 'Feeding Schedules',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Charge Applies',
      name        : 'charges',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell) => {
        let checked

        if(cell === 'true')
          checked = true
        else if(cell === 'false')
          checked = false

        return (
          <div  style={{ 'margin-left': '30px' }}>
            <Switch
              checked={checked}
              className='react-switch'
              height={21}
              onColor='#00aa9f'
              width={40}/>
          </div>
        )
      }
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'string',
      width       : 3,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'Edit',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete',
          name        : 'delete',
          icon        : 'trash alternate outline'
        }
      ]
    }
  ]
}
