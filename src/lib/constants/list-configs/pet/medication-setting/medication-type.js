import React from 'react'
import { Checkbox } from 'semantic-ui-react'

export default {
  options: {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      },
      {
        display_name: 'Print',
        name        : 'print',
        icon        : 'print'
      }
    ],
    single: [
      {
        display_name: 'Medication Types',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Medication Types',
      name        : 'name',
      type        : 'string',
      width       : 6,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Charge Applies',
      name        : 'charges',
      type        : 'string',
      width       : 6,
      align       : 'left',
      sort        : false,
      formatter   : cell => (
        <Checkbox
          checked={JSON.parse(cell)}
          disabled/>
      )
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'string',
      align       : 'left',
      sort        : false
    }
  ]
}
