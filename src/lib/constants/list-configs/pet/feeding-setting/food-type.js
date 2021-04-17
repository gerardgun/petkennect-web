import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'Add Food Type',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Food Type',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Charge Applies',
      name        : 'charges',
      type        : 'string',
      align       : 'left',
      sort        : false,
      formatter   : cell => (
        <Checkbox
          checked={JSON.parse(cell)}
          disabled/>
      )
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 4,
      options     : [
        {
          display_name: 'Edit Food Type',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Food Type',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
