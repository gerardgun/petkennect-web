import React from 'react'
import Switch from 'react-switch'

export default {
  options: {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      },
      {
        display_name: 'Print',
        name        : 'print',
        icon        : 'print'
      }
    ],
    single: [
      {
        display_name: 'Status',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Administration Status',
      name        : 'name',
      type        : 'string',
      width       : 15,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Charge Applies',
      name        : 'charges',
      type        : 'string',
      width       : 15,
      align       : 'left',
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
              height={30}
              onColor='#00aa9f'
              width={60}/>
          </>
        )
      }
    }
  ]
}
