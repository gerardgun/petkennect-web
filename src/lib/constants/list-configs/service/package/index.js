import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import _truncate from 'lodash/truncate'

export default {
  actions: [
    {
      display_name: 'New Package',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Package Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Service Type',
      name        : 'applies_service_type',
      type        : 'string'
    },
    {
      display_name: 'Locations',
      name        : 'applies_locations',
      formatter   : cell => _truncate(cell, { length: 35 })
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: 'Credits',
      name        : 'credits',
      type        : 'string'
    },
    {
      display_name: 'Active',
      name        : 'is_active',
      align       : 'center',
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
          display_name: 'Duplicate Package',
          name        : 'copy',
          icon        : 'copy outline',
          color       : 'olive'
        },
        {
          display_name: 'Edit Package',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        }
      ]
    }
  ]
}
