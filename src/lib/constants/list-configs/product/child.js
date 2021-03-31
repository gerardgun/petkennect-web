import React from 'react'
import { Image } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'

export default {
  columns: [
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
