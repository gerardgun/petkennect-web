import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'Add New Group Class',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Group Class Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Applies to\nLocations',
      name        : 'applies_locations',
      type        : 'string'
    },
    {
      display_name: 'Class Size Limit',
      name        : 'max_capacity_per_day',
      type        : 'string',
      align       : 'center'
    },
    {
      display_name: 'Duration',
      name        : 'duration_week',
      formatter   : cell => `${cell} weeks`
    },
    {
      display_name: 'Length',
      name        : 'duration',
      formatter   : cell => `${cell} hours`
    },
    {
      display_name: 'Active',
      name        : 'is_active',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'Edit Group Class',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Group Class',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
