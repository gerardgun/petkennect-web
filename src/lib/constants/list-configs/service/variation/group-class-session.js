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
      name        : 'service_variation.name',
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
      name        : 'started_at',
      type        : 'date'
    },
    {
      display_name: 'Session\nDates',
      name        : 'started_at',
      formatter   : () => 'Multiselect Dates'
    },
    {
      display_name: 'Start Time',
      name        : 'started_at',
      formatter   : cell => cell.split('T')[1].substring(0, 5)
    },
    {
      display_name: 'Trainer',
      name        : 'trainer_employee',
      formatter   : cell => `${cell.first_name} ${cell.last_name}`
    },
    {
      display_name: 'Online\nEnrollment',
      name        : 'is_bookable_by_client',
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
