import React from 'react'
export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Past',
      name        : 'past',
      align       : 'center',
      type        : 'string',
      formatter   : (cell, row) => {
        return <label> {row.past}</label>
      }
    },
    {
      display_name: 'Upcoming',
      name        : 'upcoming',
      align       : 'center',
      type        : 'string'
    },
    {
      display_name: 'Canceled',
      name        : 'canceled',
      align       : 'center',
      type        : 'string'
    },
    {
      display_name: 'Actions',
      type        : 'dropdown',
      options     : [
        {
          display_name: 'Recon Report',
          name        : 'recon_report',
          icon        : 'file'
        },
        {
          display_name: 'View Detail',
          name        : 'view_detail',
          icon        : 'eye'

        }
      ]
    }
  ]
}
