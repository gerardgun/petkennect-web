import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  actions: [
    {
      display_name: 'New Area',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Area Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Species',
      name        : 'species_name',
      type        : 'string'
    },
    {
      display_name: 'Applies to Service Groups',
      name        : 'applies',
      type        : 'string'
    },
    {
      display_name: 'Surcharge',
      name        : 'surcharge',
      formatter   : cell => (
        <Checkbox checked={cell} disabled/>
      )
    },
    {
      display_name: 'Charge Type',
      name        : 'charge_type',
      type        : 'string'
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'Edit Type',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Type',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        },
        {
          display_name: 'View',
          name        : 'vie',
          icon        : 'eye',
          color       : 'teal'
        }
      ]
    }
  ]
}
