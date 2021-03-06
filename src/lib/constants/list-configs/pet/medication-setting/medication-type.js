import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'Add Type',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Medication Types',
      name        : 'name',
      type        : 'string',
      width       : 6,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Charge Applies',
      name        : 'is_charged',
      type        : 'string',
      width       : 6,
      align       : 'left',
      sort        : false,
      formatter   : cell => (
        <Checkbox
          checked={JSON.parse(cell)}
          disabled
          style={{ 'margin-left': '40px' }}/>
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
          display_name: 'Edit Type',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Type',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
