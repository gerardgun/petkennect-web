import React from 'react'
import { ProductFamilyType } from '@lib/constants/product'

export default {
  search_placeholder: 'Search by name',
  actions           : [
    {
      display_name: 'Add Family',
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
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Type',
      name        : 'type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : cell => ProductFamilyType[cell]
    },
    {
      display_name: 'Attributes',
      name        : 'attributes',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : cell => {
        let attributeNames = <span className='text-gray'>No related attributes</span>

        if(cell.length > 0)
          attributeNames = cell
            .map(({ name }) => name)
            .join(', ')

        return attributeNames
      }
    },
    {
      display_name: 'Total Products',
      name        : 'count_products',
      type        : 'string',
      formatter   : cell => `${cell} products`
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'Edit Family',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Family',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
