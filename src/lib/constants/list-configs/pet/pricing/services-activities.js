import React from 'react'
import { Checkbox } from 'semantic-ui-react'

import { getContentMoney } from '@components/Table/Body/Cell/helpers'

export default {
  search_placeholder: 'Search by sku_id, name or description',
  actions           : [
    {
      display_name: 'Add New Boarding Activity',
      name        : 'create_boarding_activity',
      color       : 'teal',
      icon        : 'add'
    },
    {
      display_name: 'Add New Reservation',
      name        : 'create_reservation_type',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Service Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Price',
      name        : 'prices',
      align       : 'rigth',
      formatter   : cell => {
        let price = 0

        if(cell.length > 0) price = cell[cell.length - 1].price

        return getContentMoney(price)
      }
    },
    {
      display_name: 'Service Group',
      name        : 'service.service_group_name',
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
      display_name: 'Custom Code',
      name        : 'sku_id',
      type        : 'string'
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
      width       : 3,
      options     : [
        {
          display_name: 'Edit',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}

