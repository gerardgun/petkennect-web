import React from 'react'
import { Checkbox, Select } from 'semantic-ui-react'

import petKindDuck from '@reducers/pet/kind'

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
      type        : 'string',
      sort        : true
    },
    {
      display_name: 'Species',
      name        : 'pet_class.name',
      type        : 'string',
      filter      : {
        type   : 'dropdown',
        name   : 'pet_class_id',
        options: petKindDuck.store
      }
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
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Charge Type',
      name        : 'charge_type',
      type        : 'string',
      formatter   : cell => (
        <Select
          label='Location'
          name='location'
          options={[
            { text: 'No Charge', value: 1 },
            { text: 'Per Stay', value: 2 },
            { text: 'Per Night', value: 3 }
          ]}
          placeholder='Select Location'
          selectOnBlur={false}
          value={cell}/>
      )
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
