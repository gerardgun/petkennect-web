import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Notice Type',
      name        : 'notice_type',
      type        : 'string',
      align       : 'left',
      width       : 5

    },
    {
      display_name: 'Subject',
      name        : 'subject',
      type        : 'string',
      align       : 'left',
      width       : 5
    },
    {
      display_name: 'Action',
      name        : 'action',
      type        : 'string',
      align       : 'left',
      width       : null,
      formatter   : (cell) => {
        return (
          <div>
            <Link>{cell}</Link>
          </div>
        )
      }
    },
    {
      display_name: '',
      name        : 'bell',
      type        : 'string',
      align       : 'left',
      width       : null,
      formatter   : (cell) => {
        return (
          <div>
            {
              cell === 'true' && (
                <Icon color='red' name='bell'></Icon>
              )
            }
          </div>
        )
      }
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'string',
      align       : 'left',
      width       : null,
      formatter   : (cell) => {
        return (
          <div>
            {
              cell === 'Completed' ? (
                <span style={{ color: '#2dbd39' }}>{cell}</span>
              ) : (<span style={{ color: 'red' }}>{cell}</span>)
            }
          </div>
        )
      }
    }

  ]
}
