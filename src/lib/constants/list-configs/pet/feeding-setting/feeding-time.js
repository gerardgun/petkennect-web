import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'Add Meal Time',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Feeding Schedules',
      name        : 'name',
      type        : 'string',
      width       : 6,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Charge Applies',
      name        : 'charges',
      type        : 'string',
      width       : 4,
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
          display_name: 'Edit Feeding Time',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Feeding Time',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
