import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'Add New Capacity',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Date Start',
      name        : 'start_at',
      type        : 'date'
    },
    {
      display_name: 'Date End',
      name        : 'ends_at',
      type        : 'date'
    },
    {
      display_name: 'Active',
      name        : 'is_active',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Species',
      name        : 'species_name',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Service${'\n'}Groups`,
      name        : 'service_group_name',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Service${'\n'}Types`,
      name        : 'service_name',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Reservation${'\n'}Types`,
      name        : 'reservation_name',
      type        : 'string'
    },
    {
      display_name: `Max${'\n'}Capacity${'\n'}Per Day`,
      name        : 'max_capacity_per_day',
      type        : 'string'
    },
    {
      display_name: 'Reason',
      name        : 'reason_description',
      type        : 'string'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'Edit Capacity',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Capacity',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
