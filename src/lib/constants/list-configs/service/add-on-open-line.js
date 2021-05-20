import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import _truncate from 'lodash/truncate'

export default {
  actions: [
    {
      display_name: 'New Line Item',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Item Name',
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
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: 'Can be\nnegative\n(Credit)',
      name        : 'is_scheduled',
      align       : 'center',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Is Taxed',
      name        : 'is_taxable',
      align       : 'center',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Is Tip',
      name        : 'is_active',
      align       : 'center',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Employee',
      name        : 'applies',
      type        : 'string'
    },
    {
      display_name: 'Custom\nAccount\nCode',
      name        : 'applies',
      type        : 'string'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 2,
      options     : [
        {
          display_name: 'Edit Line Item',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Line Item',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
