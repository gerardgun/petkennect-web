import React from 'react'
import { Checkbox } from 'semantic-ui-react'

import { getContentMoney } from '@components/Table/Body/Cell/helpers'

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
      name        : 'service.service_group_name',
      type        : 'string'
    },
    {
      display_name: 'Reservation',
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
      display_name: 'Price',
      name        : 'prices',
      formatter   : cell => {
        let price = 0

        if(cell.length > 0) price = cell[cell.length - 1].price

        return getContentMoney(price)
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
