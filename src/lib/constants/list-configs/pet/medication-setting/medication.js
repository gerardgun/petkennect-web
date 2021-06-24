import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'Add Medication',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
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
      name        : 'description',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Type',
      name        : 'medication_type.name',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Charge Applies',
      name        : 'medication_type.is_charged',
      type        : 'string',
      align       : 'left',
      formatter   : cell => (
        <Checkbox
          checked={JSON.parse(cell)}
          disabled
          style={{ 'margin-left': '40px' }}/>
      )
    },
    {
      display_name: 'Price',
      name        : 'medication_type.price',
      type        : 'string',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 4,
      options     : [
        {
          display_name: 'Edit Medication',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Medication',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
