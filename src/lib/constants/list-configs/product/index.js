import React from 'react'
import { Image } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'

import productFamilyDuck from '@reducers/product/family'

export default {
  search_placeholder: 'Search by product name',
  actions           : [
    {
      display_name: 'Create Product',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  options: {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      },
      {
        display_name: 'Print',
        name        : 'print',
        icon        : 'print'
      }
    ]
  },
  columns: [
    {
      display_name: 'Product Name',
      name        : 'name',
      type        : 'string',
      sort        : true,
      formatter   : (cell, row) => {
        return (
          <>
            <Image
              className='profile' rounded size='mini'
              src={row.filepath || defaultImageUrl}/>
            <span>{cell}</span>
          </>
        )
      }
    },
    {
      display_name: 'Slug',
      name        : 'slug',
      type        : 'string',
      formatter   : cell => {
        const auth_tenant = localStorage.getItem('@auth_tenant')

        return <a href={`https://${auth_tenant}.petkennect.com/${cell}`} rel='noopener noreferrer' target='_blank'>{cell}</a>
      }
    },
    {
      display_name: 'Family',
      name        : 'product_family',
      type        : 'string',
      sort        : true,
      sort_name   : 'product_family__name',
      formatter   : (cell, row) => {
        return cell === null ? '-' : row.family.name
      },
      filter: {
        type   : 'dropdown',
        name   : 'product_family',
        options: productFamilyDuck.store
      }
    },
    {
      display_name: 'Base Price',
      name        : 'price',
      type        : 'money'
      // filter      : {
      //   type: 'range',
      //   name: [ 'price__gt', 'price__lt' ]
      // }
    },
    {
      display_name: 'Stock',
      name        : 'stock',
      type        : 'string'
      // filter      : {
      //   type: 'range',
      //   name: [ 'stock__gt', 'stock__lt' ]
      // }
    },
    {
      display_name: 'Outstanding',
      name        : 'is_outstanding',
      type        : 'boolean_active',
      filter      : {
        type   : 'dropdown',
        name   : 'is_outstanding',
        options: [
          {
            value: true,
            text : 'True'
          },
          {
            value: false,
            text : 'False'
          }
        ]
      }
    },
    {
      display_name: 'Active',
      name        : 'is_active',
      type        : 'boolean_active',
      filter      : {
        type   : 'dropdown',
        name   : 'is_active',
        options: [
          {
            value: true,
            text : 'True'
          },
          {
            value: false,
            text : 'False'
          }
        ]
      }
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'Edit Product',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Product',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
