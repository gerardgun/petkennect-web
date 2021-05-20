import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'New Type',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Service Type',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Applies to\nLocations',
      name        : 'applies_locations',
      type        : 'string'
    },
    {
      display_name: 'Type',
      name        : 'type_name',
      type        : 'string'
    },
    {
      display_name: 'Is\nscheduled',
      name        : 'is_scheduled',
      align       : 'center',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Time Offered',
      name        : 'time_offered',
      type        : 'string'
    },
    {
      display_name: 'Applies to\nSpecies',
      name        : 'applies_species',
      type        : 'string'
    },
    {
      display_name: 'Service Group',
      name        : 'service_group_name',
      type        : 'string'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 2,
      options     : [
        {
          display_name: 'Edit Reservation',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Reservation',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
