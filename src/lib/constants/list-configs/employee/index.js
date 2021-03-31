import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'

import employeeTitleDuck from '@reducers/employee/title'
import locationDuck from '@reducers/location'
import rolDuck from '@reducers/rol'

export default {
  search_placeholder: 'Search by name or email',
  options           : {
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
        display_name: 'Delete Employee',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Employee Name',
      name        : 'first_name',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'user__first_name',
      formatter   : (cell, row) => {
        return (
          <Link to={`/employee/${row.id}`}>
            <Image
              className='profile' rounded size='mini'
              src={row.thumbnail_path || defaultImageUrl}/>
            <span>{`${cell} ${row.last_name}`}</span>
          </Link>
        )
      }
    },
    {
      display_name: 'Email',
      name        : 'email',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'user__email'
    },
    {
      display_name: 'Location',
      name        : 'location_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'location__code',
      filter      : {
        type   : 'dropdown',
        name   : 'location__id',
        options: locationDuck.store
      }
    },
    {
      display_name: 'Title',
      name        : 'title_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'title__name',
      filter      : {
        type   : 'dropdown',
        name   : 'title__id',
        options: employeeTitleDuck.store
      }
    },
    {
      display_name: 'Role',
      name        : 'role_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'role__name',
      filter      : {
        type   : 'dropdown',
        name   : 'role__id',
        options: rolDuck.store
      }
    },
    {
      display_name: 'Status',
      name        : 'is_active',
      type        : 'boolean_active',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'is_active',
      filter      : {
        type   : 'dropdown',
        name   : 'is_active',
        options: [
          {
            value: true,
            text : 'Active'
          },
          {
            value: false,
            text : 'Inactive'
          }
        ]
      }
    },
    {
      display_name: 'Created at',
      name        : 'created_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'created_at',
      filter      : {
        type: 'range_date',
        name: [ 'created_at__gt', 'created_at__lt' ]
      }
    }
  ]
}
