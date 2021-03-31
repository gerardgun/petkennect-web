import React from 'react'
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
        display_name: 'Delete Price',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'TYPE',
      name        : 'type',
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'SUB CATEGORY',
      name        : 'subcategory',
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'PRICE',
      name        : 'price',
      type        : 'string',
      align       : 'left',
      sort        : true,
      formatter   : (cell, row) => {
        return (
          <>{row.location}<br/>${cell}</>
        )
      }
    },
    {
      display_name: 'STOCK',
      name        : 'stock',
      type        : 'boolean',
      align       : 'left',
      sort        : true
    }
  ]
}
