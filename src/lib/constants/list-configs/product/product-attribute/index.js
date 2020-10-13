import React from 'react'
import { span } from 'semantic-ui-react'

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
      display_name: 'Delete Product',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: [
      {
        display_name: 'Add Attribute Value',
        name        : 'edit',
        icon        : 'bars'
      }
    ]
  },
  columns: [ {
    display_name: 'Id',
    name        : 'id',
    type        : 'number',
    width       : null,
    align       : 'left',
    sort        : false
  },
  {
    display_name: 'Name',
    name        : 'name',
    type        : 'string',
    width       : null,
    align       : 'left',
    sort        : false
  },
  {
    display_name: 'Type',
    name        : 'type',
    type        : 'string',
    width       : null,
    align       : 'left',
    sort        : false,
    formatter   : cell => {
      let type_str = ''

      if(cell === 'D')
        type_str = 'Dropdown'
      else if(cell === 'R')
        type_str = 'Radio'
      else if(cell === 'C')
        type_str = 'Color'

      return type_str
    }
  },
  {
    display_name: 'Num. Values',
    name        : 'name',
    type        : 'string',
    width       : null,
    align       : 'left',
    sort        : false,
    formatter   : (cell, row) => {
      return (
        <span>{row.values.length}</span>
      )
    }
  }
  ]
}
