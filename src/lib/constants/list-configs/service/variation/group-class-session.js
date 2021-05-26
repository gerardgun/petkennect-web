import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  search_placeholder: 'Search by sku_id, name or description',
  actions           : [
    {
      display_name: 'Add New',
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
      display_name: 'Locations',
      name        : 'locations',
      formatter   : cell => {
        let locationNames = <span className='text-gray'>No related locations</span>

        if(cell.length > 0)
          locationNames = cell
            .map(({ name }) => name)
            .join(', ')

        return locationNames
      }
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
      display_name: 'Start Time',
      name        : 'created_at',
      formatter   : () => '7:00 PM'
    },
    {
      display_name: 'Trainer',
      name        : 'created_at',
      formatter   : () => 'Select'
    },
    {
      display_name: 'Online\nEnrollment',
      name        : 'is_active',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 2,
      options     : [
        {
          display_name: 'Edit Session',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Session',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
