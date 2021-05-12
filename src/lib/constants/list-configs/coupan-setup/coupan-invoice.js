import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {

  actions: [
    {
      display_name: 'Add Coupon',
      name        : 'add_coupon',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  search_enabled: true,
  columns       : [

    {
      display_name: 'Coupon Name',
      name        : 'coupon_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Code',
      name        : 'coupon_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Expiration',
      name        : 'expiration_date',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Active',
      name        : 'status',
      type        : 'boolean',
      width       : null,
      align       : 'center',
      formatter   : cell => {
        return (
          <Checkbox
            checked={JSON.parse(cell)}
            toggle/>
        )
      }

    },

    {
      display_name: 'Type',
      name        : 'discount_type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Value',
      name        : 'value',
      type        : 'string',
      width       : null,
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Reusable',
      name        : 'reusable',
      type        : 'boolean',
      width       : null,
      align       : 'center',
      formatter   : cell => {
        return (
          <Checkbox
            checked={JSON.parse(cell)}
            toggle/>
        )
      }

    },
    {
      display_name: 'Action',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'View Usage',
          name        : 'view_usage',
          icon        : 'eye',
          color       : 'blue'
        },
        {
          display_name: 'Edit Coupon',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Coupon',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }

  ]
}
