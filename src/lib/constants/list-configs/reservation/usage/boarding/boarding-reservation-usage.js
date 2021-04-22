import React from 'react'
import { Header } from 'semantic-ui-react'
export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Past',
      name        : 'past',
      align       : 'center',
      type        : 'string',
      formatter   : (cell, row) => {
        return <Header as='h4' color='teal'style={{ 'padding-top': '14%', 'padding-bottom': '14%' }}>{row.past}</Header>
      }
    },
    {
      display_name: 'Upcoming',
      name        : 'upcoming',
      align       : 'center',
      type        : 'string',
      formatter   : (cell, row) => {
        return <Header as='h4' color='teal'style={{ 'padding-top': '14%', 'padding-bottom': '14%' }}>{row.upcoming}</Header>
      }
    },
    {
      display_name: 'Canceled',
      name        : 'canceled',
      align       : 'center',
      type        : 'string',
      formatter   : (cell, row) => {
        return <Header as='h4' color='teal'style={{ 'padding-top': '14%', 'padding-bottom': '14%' }}>{row.canceled}</Header>
      }
    },
    {
      display_name: 'Action',
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
