import React from 'react'
import { Checkbox } from 'semantic-ui-react'

import { FoodTypeChargeType } from '@lib/constants/service'

export default {
  actions: [
    {
      display_name: 'Add Food Type',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Food Types',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Charge Applies',
      name        : 'is_charged',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Charge Type',
      name        : 'charge_type',
      formatter   : (cell, row) => {
        if(row.is_charged === false) return 'No Charge'

        return FoodTypeChargeType[cell]
      }
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money',
      sort        : true
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 4,
      options     : [
        {
          display_name: 'Edit Food Type',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Food Type',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
