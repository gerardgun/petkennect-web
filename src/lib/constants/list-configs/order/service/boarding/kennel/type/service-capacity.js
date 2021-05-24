import React from 'react'
import { Checkbox, Select } from 'semantic-ui-react'

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
      name        : 'applies',
      type        : 'string'
    },
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string'
    },
    {
      display_name: 'Size',
      name        : 'size',
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
