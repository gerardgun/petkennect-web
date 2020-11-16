import React from 'react'
import { Image } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'

export default {
  base_uri          : null,
  expandedRows      : true,
  search_placeholder: 'Search by product name',
  options           : [
    {
      display_name: 'Download',
      name        : 'download',
      icon        : 'download'
    },
    {
      display_name: 'Print',
      name        : 'print',
      icon        : 'print'
    },
    {
      display_name: 'Delete Product',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: []
  },
  columns: [
    {
      display_name: 'Product Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
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
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : cell => {
        const auth_tenant = localStorage.getItem('@auth_tenant')

        return <a href={`https://${auth_tenant}.petkennect.com/${cell}`} rel='noopener noreferrer' target='_blank'>{cell}</a>
      }
    },
    {
      display_name: 'Class',
      name        : 'family',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        return cell == null ? '' : row.product_family.name
      }
    },
    {
      display_name: 'Base Price',
      name        : 'price',
      type        : 'money',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type: 'range',
        name: [ 'price__gt', 'price__lt' ]
      }
    },
    {
      display_name: 'Stock',
      name        : 'stock',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type: 'range',
        name: [ 'stock__gt', 'stock__lt' ]
      }
    },
    {
      display_name: 'Outstanding',
      name        : 'is_outstanding',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Active',
      name        : 'is_activve',
      type        : 'boolean_active',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ],
  expandedColumns: [
    {
      display_name: 'Product Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      formatter   : (cell, row) => {
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex' }}>
                <Image
                  className='profile' rounded size='mini'
                  src={row.filepath || defaultImageUrl}/>&nbsp;&nbsp;&nbsp;
              </div>
              <div>
                {
                  row.attributes.map((item) => {
                    return (
                      <p key={item.id}><span>{item.product_family_attribute} : {item.product_attribute_value}</span></p>
                    )
                  })
                }
              </div>
            </div>
          </>
        )
      }
    },
    {
      display_name: 'Slug',
      name        : 'slug',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Class',
      name        : 'class',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Base Price',
      name        : 'price',
      type        : 'money',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Stock',
      name        : 'stock',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Outstanding',
      name        : 'is_outstanding',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Active',
      name        : 'is_activve',
      type        : 'boolean_active',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]

}
