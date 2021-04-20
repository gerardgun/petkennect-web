import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  search_placeholder: 'Search by species, vaccine',
  actions           : [
    {
      display_name: 'Add Vaccine',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Species',
      name        : 'pet_class_name',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Vaccine',
      name        : 'name',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Required',
      name        : 'is_required',
      type        : null,
      align       : 'left',
      formatter   : cell => {
        return (
          <Checkbox
            checked={cell}
            disabled
            style={{ 'margin-left': '20px' }}/>)
      }
    },
    {
      display_name: 'Active',
      name        : 'id',
      type        : null,
      align       : 'left',
      formatter   : (cell,row) => {
        return (
          <Checkbox
            checked={row.id % 2 === 0 ? true : false}
            disabled
            style={{ 'margin-left': '11px' }}/>)
      }
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
