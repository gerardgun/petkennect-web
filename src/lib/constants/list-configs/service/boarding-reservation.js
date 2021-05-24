import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import _truncate from 'lodash/truncate'

export default {
  actions: [
    {
      display_name: 'Add New Reservation',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Reservation\nName',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Description',
      name        : 'description',
      formatter   : cell => _truncate(cell, { length: 40 })
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: "Add'l\nDog Price",
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: 'Active',
      name        : 'is_active',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Price\nStart Date',
      name        : 'created_at',
      type        : 'date'
    },
    {
      display_name: 'Price\nEnd Date',
      name        : 'created_at',
      type        : 'date'
    },
    {
      display_name: 'Pricing',
      name        : 'price_type',
      type        : 'string'
    },
    {
      display_name: 'Required\nDay Service',
      name        : 'is_day_service_required',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'Edit Reservation',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Reservation',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
