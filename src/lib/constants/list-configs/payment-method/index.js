
import React from 'react'
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
        display_name: 'Delete',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : 15,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'string',
      align       : 'left',
      sort        : false,
      formatter   : cell => {
        if(cell === 'Active')
          cell = <p style={{ color: 'red' }} >{cell}</p>

        else
          cell = <p style={{ color: 'green' }} >{cell}</p>

        return (
          <span>
            {cell}
          </span>
        )
      }
    }
  ]
}
