import React from 'react'
import { Link } from 'react-router-dom'

export default {

  search_enabled: false,
  columns       : [

    {
      display_name: 'Total Times Used',
      name        : 'total_times_uses',
      type        : 'string',
      width       : null,
      align       : 'center'
    },
    {
      display_name: 'Total Discount $',
      name        : 'total_discount',
      type        : 'string',
      width       : null,
      align       : 'center'

    },
    {
      display_name: 'Client Usage List',
      name        : 'client_usage_list',
      type        : 'string',
      width       : null,
      align       : 'center',
      formatter   : ()=>{
        return (
          <Link to=''>
              Client List
          </Link>

        )
      }
    }

  ]
}
