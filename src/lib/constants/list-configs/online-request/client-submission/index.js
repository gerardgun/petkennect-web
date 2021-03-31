import React from 'react'

export default {
  columns: [
    {
      display_name: 'CLIENT',
      name        : 'client_last_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => `${cell}, ${row.client_first_name}`
    },
    {
      display_name: 'MOBILE',
      name        : 'client.phones[0].number',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'LOCATION',
      name        : 'client.location.code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Created at',
      name        : 'created_at',
      type        : 'datetime',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Status',
      name        : 'count_notes',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        let status = cell > 0 ? 'in-progress' : row.status

        return (
          <span
            className={`txt-${status === 'in-progress' ? 'orange' : status === 'P' ? 'green' : 'red'}`}>
            {status === 'in-progress' ? 'In Progress' : status === 'P' ? 'New' : 'Declined'}
          </span>
        )
      }
    },
    {
      display_name: 'Notes',
      name        : 'note',
      type        : 'button',
      options     : [
        {
          display_name: 'View',
          name        : 'view',
          content     : 'View',
          color       : 'blue'
        }
      ]
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'Review',
          name        : 'review',
          content     : 'Review',
          color       : 'teal'
        }
      ]
    }
  ]
}
