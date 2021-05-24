import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'Add New Group Class Session',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Group\nClass Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Applies to\nLocations',
      name        : 'applies_locations',
      type        : 'string'
    },
    {
      display_name: 'Start Date',
      name        : 'created_at',
      type        : 'date'
    },
    {
      display_name: 'Session\nDates',
      name        : 'created_at',
      formatter   : () => 'Multiselect Dates'
    },
    {
      display_name: 'Session\nStart Time',
      name        : 'created_at',
      formatter   : () => '7:00 PM'
    },
    {
      display_name: 'Trainer',
      name        : 'created_at',
      formatter   : () => 'Select'
    },
    {
      display_name: 'Commision\nType',
      name        : 'created_at',
      formatter   : () => 'Dollar/Percent'
    },
    {
      display_name: 'Enable Online\nEnrollment',
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
          display_name: 'Edit Group Class Session',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Group Class Session ',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
