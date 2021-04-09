import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  search_placeholder: 'Search by species, vaccine',
  columns           : [
    {
      display_name: 'Species',
      name        : 'pet_class_name',
      type        : 'string',
      width       : 3,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Vaccine',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      align       : 'left',
      width       : 4,
      sort        : false
    },
    {
      display_name: 'Required',
      name        : 'is_required',
      type        : 'boolean',
      width       : 3,
      align       : 'center',
      sort        : false,
      formatter   : (cell,row) => {
        return (
          <div  style={{ 'margin-right': '60px' }}>
            <Checkbox
              checked={row.is_required ? true : false}/></div>)
      }
    },
    {
      display_name: 'Active',
      name        : 'is_required',
      type        : 'boolean', // image, boolean, date, datetime, money, label
      align       : 'center',
      width       : 3,
      sort        : false,
      formatter   : (cell,row) => {
        return (<div style={{ 'margin-right': '78px' }}>
          <Checkbox
            checked={row.id % 2 === 0 ? true : false}/></div>)
      }
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [

        {
          display_name: 'Edit Record',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Record',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }

      ]
    }

  ]
}
