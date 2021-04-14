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
        return <Header as='h4' color='teal'style={{ 'padding-top': '11%', 'padding-bottom': '11%' }}> {row.service_name}</Header>
      }
    },
    {
      display_name: 'Prepaid',
      name        : 'prepaid',
      align       : 'center',
      type        : 'string'
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
