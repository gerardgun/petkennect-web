import React from 'react'
import { Label } from 'semantic-ui-react'

export default {
  search_placeholder: 'Search',

  actions: [
    {
      display_name: 'Add Role',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],

  columns: [
    {
      display_name: 'Role',
      name        : 'role',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 4,
      options     : [
        {
          display_name: 'Edit Role',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Role',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
