import React from 'react'
import { Label } from 'semantic-ui-react'

export default {
  search_enabled: false,

  columns: [
    {
      display_name: 'Department',
      name        : 'department',
      type        : 'string',
      align       : 'left',
      formatter   : (cell, row) => {
        return (
          <div>
            <span>
              {cell}({row.role.length})
            </span>
          </div>
        )
      }
    },
    {
      display_name: 'Roles',
      name        : 'role',
      type        : 'string',
      align       : 'left',
      formatter   : (cell) => {
        return (
          <div>
            {cell.map((item, index) => {
              return (<Label
                basic
                className='ml0 mr12 mt12'
                color='teal'
                key={index} size='large'>
                {item}
              </Label>) }
            )
            }
          </div>
        )
      }
    },
    {
      display_name: 'Locations',
      name        : 'location',
      type        : 'string',
      align       : 'left',
      formatter   : (cell) => {
        return (
          <div>
            {cell.map((item, index) => {
              return (<Label
                basic
                className='ml0 mr12 mt12'
                color='teal'
                key={index} size='large'>
                {item}
              </Label>) }
            )
            }
          </div>
        )
      }
    },
    {
      display_name: '',
      name        : 'custom_name',
      type        : 'action-button',
      options     : [
        {
          display_name: 'Delete',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'red',
          type        : 'button'
        }
      ]
    }
  ]
}
