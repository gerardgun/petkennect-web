import React from 'react'
import { Link } from 'react-router-dom'

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
        display_name: 'Delete Agreement',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Registered By',
      name        : 'employee_first_name',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        return <Link to={`/employee/show/${row.employee}`}>{cell} {row.employee_last_name}</Link>
      }
    },
    {
      display_name: 'Active',
      name        : 'is_active',
      type        : 'boolean_active',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Created At',
      name        : 'created_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Updated At',
      name        : 'updated_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    }

  ]
}
