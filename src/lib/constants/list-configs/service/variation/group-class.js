import React from 'react'
import { Checkbox } from 'semantic-ui-react'

import { VariationDurationType } from '@lib/constants/service'

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
      display_name: 'Service Type',
      name        : 'service.name',
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
      display_name: 'Length',
      name        : 'duration_minutes',
      formatter   : cell => `${cell} minutes`
    },
    {
      display_name: 'Size Limit',
      name        : 'capacity',
      align       : 'center',
      formatter   : cell => `${cell} pets`
    },
    {
      display_name: 'Duration',
      name        : 'config',
      formatter   : cell => {
        return `${cell.duration_value} ${VariationDurationType[cell.duration_type]}`
      }
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
      width       : 2,
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
