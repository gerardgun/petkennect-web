import React from 'react'
import Switch from 'react-switch'
export default {
  base_uri: null,
  options : [
    {
      display_name: 'Download',
      name        : 'download',
      icon        : 'download'
    },
    {
      display_name: 'Print',
      name        : 'print',
      icon        : 'print'
    },
    {
      display_name: 'Food Types',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: []
  },
  columns: [
    {
      display_name: 'Food Types',
      name        : 'name',
      type        : 'string',

      align: 'left',
      sort : false
    },
    {
      display_name: 'Charge Applies',
      name        : 'charges',
      type        : 'string',

      align    : 'left',
      sort     : false,
      formatter: (cell) => {
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

      align: 'left',
      sort : false
    }
  ]
}
