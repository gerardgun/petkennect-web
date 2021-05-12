import React from 'react'
import { Image } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'

export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Combination',
      name        : 'attributes',
      type        : 'string',
      formatter   : (cell, row) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              className='profile' rounded size='mini'
              src={row.filepath || defaultImageUrl}/>
            <div>
              {
                cell.map((item, index) => (
                  <div key={index}>
                    <strong>{item.attribute_name}:</strong> {item.attribute_value_display}
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    },
    {
      display_name: 'SKU',
      name        : 'sku_id',
      type        : 'string'
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: 'Stock',
      name        : 'stock',
      type        : 'string'
    },
    {
      display_name: 'Active',
      name        : 'is_active',
      type        : 'boolean_active'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'Edit Variation',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        }
      ]
    }
  ]
}
