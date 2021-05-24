import React from 'react'
import { Checkbox, Select } from 'semantic-ui-react'

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
      display_name: 'Applies to\nLocations',
      name        : 'applies_locations',
      type        : 'string'
    },
    {
      display_name: 'Applies to\nSpecies',
      name        : 'applies_species',
      type        : 'string'
    },
    {
      display_name: 'Group Play\nService',
      name        : 'group_play_service_enabled',
      align       : 'center',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Type',
      name        : 'type_id',
      align       : 'center',
      formatter   : cell => (
        <Select
          name='type'
          options={[
            { text: 'Reservation', value: 1 },
            { text: 'Appointment', value: 2 }
          ]}
          placeholder='Select Type'
          selectOnBlur={false}
          value={cell}/>
      )
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
    }
  ]
}
