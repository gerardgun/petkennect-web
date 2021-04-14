import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'New Medication',
      name        : 'create',
      color       : 'teal'
    }
  ],
  columns: [
    {
      display_name: 'Medication Name',
      name        : 'name',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Purpose',
      name        : 'purpose',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Type',
      name        : 'type',
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
      display_name: 'Price',
      name        : 'price',
      type        : 'string',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 2,
      options     : [
        {
          display_name: 'Edit Reason',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Reason',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
