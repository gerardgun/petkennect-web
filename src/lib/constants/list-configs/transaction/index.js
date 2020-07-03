import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'

export default {
  base_uri: null,
  options : [
    {
      display_name: 'Download Excel',
      name        : 'download-excel',
      icon        : 'file excel outline'
    },
    {
      display_name: null,
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: []
  },
  columns: [
    {
      display_name: 'Company',
      name        : 'company_legal_name',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        return (
          <Link to={`/company/${row.company}`}>
            <Image
              className='profile' rounded size='mini'
              src={row.company_thumbnail || defaultImageUrl}/>
            <span>{cell}</span>
          </Link>
        )
      }
    },
    {
      display_name: 'Seller',
      name        : 'seller_legal_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        return <Link to={`/organization/${row.seller}`}>{cell}</Link>
      }
    },
    {
      display_name: 'Buyer',
      name        : 'buyer_legal_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        return <Link to={`/organization/${row.buyer}`}>{cell}</Link>
      }
    },
    {
      display_name: 'Transacted at',
      name        : 'transacted_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Created at',
      name        : 'created_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
