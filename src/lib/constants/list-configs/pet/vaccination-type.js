import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  base_uri          : null,
  search_placeholder: 'Search by species, vaccine',
  options           : [
    {
      display_name: 'Download',
      name        : 'download',
      icon        : 'download'
    },
    {
      display_name: 'Print',
      name        : 'print',
      icon        : 'print'
    },
    {
      display_name: 'Delete Vaccination',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: []
  },
  columns: [
    {
      display_name: 'Species',
      name        : 'pet_class_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Vaccine',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Required',
      name        : 'required',
      type        : 'boolean',
      align       : 'left',
      sort        : false,
      formatter   : (cell,row) => {
        return (

          <Checkbox
            checked={row.is_required ? true : false}/>)
      }
    },
    {
      display_name: 'Active',
      name        : 'is_active',
      type        : 'boolean', // image, boolean, date, datetime, money, label
      align       : 'left',
      sort        : false,
      formatter   : (cell,row) => {
        return (

          <Checkbox
            checked={row.id % 2 === 0 ? true : false}/>)
      }
    }

  ]
}
