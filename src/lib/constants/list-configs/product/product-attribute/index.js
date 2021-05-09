import React from 'react'
import { ProductAttributeType, ProductAttributeTypeOptions } from '@lib/constants/product'

export default {
  search_placeholder: 'Search by name',
  actions           : [
    {
      display_name: 'Create Attribute',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      sort        : true
    },
    {
      display_name: 'Type',
      name        : 'type',
      formatter   : cell => ProductAttributeType[cell],
      filter      : {
        type   : 'dropdown',
        name   : 'type',
        options: ProductAttributeTypeOptions
      }
    },
    {
      display_name: 'Values',
      name        : 'values',
      formatter   : cell => {
        let valueNames = <span className='text-gray'>The are not values</span>

        if(cell.length > 0) {
          const firstFour = cell.slice(0, 4)

          valueNames = firstFour
            .map(({ value_display }) => value_display)
            .join(', ')

          const rest = cell.slice(4)

          if(rest.length > 0)
            valueNames = `${valueNames}, +${rest.length} more`
        }

        return valueNames
      }
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'Edit Attribute',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Attribute',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        },
        {
          display_name: 'List Values',
          name        : 'list_values',
          icon        : 'list ul',
          color       : 'grey'
        }
      ]
    }
  ]
}
