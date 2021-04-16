import React from 'react'
import { Header } from 'semantic-ui-react'

export default {
  search_enabled: false,
  columns       : [
    {
      display_name: '',
      name        : 'service_name',
      type        : 'string',
      formatter   : (cell, row) => {
        return <Header as='h5' color='teal'style={{ 'padding-top': '12%', 'padding-bottom': '12%' ,'padding-right': '0' }}> {row.service_name}</Header>
      }
    },
    {
      display_name: 'Prepaid',
      name        : 'prepaid',
      align       : 'center',
      type        : 'string',
      formatter   : (cell, row) => {
        return <label> {row.prepaid}</label>
      }
    },
    {
      display_name: '# Remaining',
      name        : 'remaining',
      align       : 'center',
      type        : 'string'
    },
    {
      display_name: '$ Remaining',
      align       : 'center',
      name        : 'remaining_price',
      type        : 'string'
    }

  ]
}
