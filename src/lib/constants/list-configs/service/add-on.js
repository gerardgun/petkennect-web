import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import _truncate from 'lodash/truncate'

export default {
  actions: [
    {
      display_name: 'New Add-On Service',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Add-On Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Description',
      name        : 'description',
      formatter   : cell => _truncate(cell, { length: 35 })
    },
    {
      display_name: 'Applies to\nLocations',
      name        : 'applies_locations',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Services`,
      name        : 'applies_service_type',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Service${'\n'}Types`,
      name        : 'applies_service_type',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Reservation${'\n'}Types`,
      name        : 'applies',
      type        : 'string'
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: 'Is\nscheduled',
      name        : 'is_scheduled',
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
          display_name: 'Edit Add-On',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Add-On',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
