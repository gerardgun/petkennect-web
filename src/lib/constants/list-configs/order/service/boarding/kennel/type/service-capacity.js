import React from 'react'
import { Checkbox, Select } from 'semantic-ui-react'

import { ChargeTypeOptions } from '@lib/constants/service'

export default {
  actions: [
    {
      display_name: 'New Type',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Lodging Type',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Applies to Areas',
      name        : 'kennel_areas',
      formatter   : cell => {
        let names = <span className='text-gray'>No related Kennel Areas</span>

        if(cell.length > 0)
          names = cell
            .map(({ name }) => name)
            .join(', ')

        return names
      }
    },
    {
      display_name: 'Size',
      name        : 'size_width',
      formatter   : (cell, row) => `${cell}x${row.size_height} cm`
    },
    {
      display_name: 'Surcharge',
      name        : 'is_surcharge',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Charge Type',
      name        : 'charge_type',
      type        : 'string',
      formatter   : cell => (
        <Select
          disabled
          options={ChargeTypeOptions}
          value={cell}/>
      )
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: 'Photo',
      name        : 'image_url',
      formatter   : cell => (
        <a href={cell} target='_black'>View</a>
      )
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
