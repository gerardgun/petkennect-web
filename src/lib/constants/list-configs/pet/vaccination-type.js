import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  search_placeholder: 'Search by species, vaccine',
  actions           : [
    {
      display_name: 'New vaccine',
      name        : 'create',
      color       : 'teal'
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
            disabled/>)
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
            disabled/>)
      }
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
