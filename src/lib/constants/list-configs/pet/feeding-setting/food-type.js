import React from 'react'
import Switch from 'react-switch'

export default {
  columns: [
    {
      display_name: 'Food Types',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Charge Applies',
      name        : 'charges',
      type        : 'string',
      align       : 'center',
      sort        : false,
      formatter   : (cell) => {
        let checked

        if(cell === 'true')
          checked = true
        else if(cell === 'false')
          checked = false

        return (
          <>
            <Switch
              checked={checked}
              className='react-switch'
              height={21}
              onColor='#00aa9f'
              width={40}/>
          </>
        )
      }
    },
    {
      display_name: 'Charge Type',
      name        : 'charge_type',
      type        : 'string',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'string',
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
