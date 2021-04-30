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
      display_name: 'Service Group',
      name        : 'service_group_name',
      type        : 'string'
    },
    {
      display_name: 'Service Type',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Applies to Locations',
      name        : 'applies_locations',
      type        : 'string'
    },
    {
      display_name: 'Applies to Species',
      name        : 'applies_species',
      type        : 'string'
    },
    {
      display_name: 'Group Play Service',
      name        : 'group_play_service_enabled',
      align       : 'center',
      formatter   : cell => (
        <Checkbox checked={cell} disabled/>
      )
    },
    {
      display_name: 'Type',
      name        : 'type_name',
      type        : 'string'
    },
    {
      display_name: 'Is scheduled',
      name        : 'is_scheduled',
      align       : 'center',
      formatter   : cell => (
        <Checkbox checked={cell} disabled/>
      )
    },
    {
      display_name: 'Time Offered',
      name        : 'time_offered',
      type        : 'string'
    }
  ]
}
