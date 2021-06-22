import React from 'react'
import { Label } from 'semantic-ui-react'

export default {
  search_placeholder: 'Search by name',
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
        display_name: 'Delete Pet',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ],
    multiple: [
      {
        display_name: 'Fork',
        name        : 'multiple',
        icon        : 'fork'
      }
    ]
  },
  columns: [
    {
      display_name: 'User',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'string',
      width       : null,
      align       : 'left',
      formatter   : (cell, row) => {
        return (
          <>
            <Label style={{ backgroundColor: cell === 'Active' ? 'green' : 'red',
              color: 'white', width: '100px', textAlign: 'center' }}>{cell}</Label>
          </>
        )
      }
    },
    {
      display_name: 'Last Login',
      name        : 'last_login',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Roles',
      name        : 'roles',
      type        : 'string',
      width       : null,
      align       : 'left',
      filter      : {
        type   : 'dropdown',
        name   : 'role'
      }
    },
    {
      display_name: 'Group Access',
      name        : 'group_access',
      type        : 'string',
      width       : null,
      align       : 'left',
      filter      : {
        type   : 'dropdown',
        name   : 'access'
      }
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          display_name: 'Edit User',
          name        : 'edit_user',
          icon        : 'edit'
        },
        {
          display_name: 'Terminate Access',
          name        : 'terminate_access',
          icon        : 'cancel'
        },
        {
          display_name: 'View Employee File',
          name        : 'view_employee_file',
          icon        : 'user'
        }
      ]
    }
  ]
}
