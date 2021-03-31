
import React from 'react'
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
      display_name: 'Delete Title',
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
