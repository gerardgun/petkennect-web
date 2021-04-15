import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'Add Status',
      name        : 'create',
      color       : 'teal'
    }
  ],
  columns: [
    {
      display_name: 'Administration Status',
      name        : 'name',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Charge Applies',
      name        : 'charges',
      type        : 'string',
      align       : 'left',
      formatter   : cell => (
        <Checkbox
          checked={JSON.parse(cell)}
          disabled/>
      )
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 2,
      options     : [
        {
          display_name: 'Edit Report Status',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Report Status',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
