import React from 'react'
import { span, Icon } from 'semantic-ui-react'

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
        display_name: 'Delete Product',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
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
        else if(cell === 'K')
          type_str = 'Kennel'
        else if(cell === 'L')
          type_str = 'Location'
        else if(cell === 'S')
          type_str = 'Pet Size'
        else if(cell === 'Y')
          type_str = 'Yard'
        else
          type_str = cell

        return (
          <span>
            <span>{type_str}</span>&nbsp;
            { cell != 'D' && cell != 'R'
          && <Icon disabled={true} name='lock'/>
            }
          </span>
        )
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
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'Add Attribute Value',
          name        : 'edit',
          icon        : 'bars'
        }
      ]
    }
  ]
}
