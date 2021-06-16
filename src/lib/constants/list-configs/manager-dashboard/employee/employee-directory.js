import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

export default {
  search_enabled: false,

  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      formatter   : (cell, row) => {
        return (
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Icon circular name='user' style={{ fontSize: '20px' }}/>
            <span>
              <Link to={`/manager-dashboard/employee-directory/${row.id}/personal-detail`}>
                {cell}
              </Link><br/>
              {row.designation}
            </span>
          </div>
        )
      }
    },
    {
      display_name: 'Location',
      name        : 'location',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Departments',
      name        : 'department',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Roles',
      name        : 'role',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    // {
    //   display_name: 'Phone',
    //   name        : 'phone',
    //   type        : 'string',
    //   width       : null,
    //   align       : 'left'
    // },
    {
      display_name: '',
      name        : 'custom_name',
      type        : 'action-button',
      options     : [
        {
          display_name   : '',
          name           : 'custom_name',
          type           : 'dropdown',
          dropdownOptions: [
            {
              icon        : 'pencil',
              display_name: 'Edit information',
              name        : 'edit'
            },
            {
              icon        : 'dollar',
              display_name: 'Wages',
              name        : 'wages'
            },
            {
              icon        : 'calendar alternate outline',
              display_name: 'Availability',
              name        : 'availability'
            },
            {
              icon        : 'sticky note outline',
              display_name: 'Add a note',
              name        : 'add_note'
            },
            {
              icon        : 'cancel',
              display_name: 'Terminate Team Member',
              name        : 'terminate_team_member'
            }

          ]
        }

      ]
    }
  ]
}
