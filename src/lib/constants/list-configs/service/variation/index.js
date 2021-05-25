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
      display_name: 'Reservation Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Price Code',
      name        : 'sku_id',
      type        : 'string'
    },
    {
      display_name: 'Service Group',
      name        : 'service_group_name',
      type        : 'string'
    },
    {
      display_name: 'Service Type',
      name        : 'type_name',
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
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
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
          display_name: 'Edit Service Type',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Service Type',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
