import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'

export default {
  base_uri          : null,
  search_placeholder: 'Search by name or email',
  options           : [
    {
      display_name: 'Download',
      name        : 'download',
      icon        : 'download'
    },
    {
      display_name: 'Print',
      name        : 'print',
      icon        : 'print'
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
      display_name: 'Client Name',
      name        : 'first_name',
      type        : null, // string, image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true,
      formatter   : (cell, row) => {
        return (
          <Link to={`/client/show/${row.id}`}>
            <Image
              className='profile' rounded size='mini'
              src={row.thumbnail_path || defaultImageUrl}/>
            <span>{`${cell} ${row.last_name}`}</span>
          </Link>
        )
      }
    },
    {
      display_name: 'Email',
      name        : 'email',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'State',
      name        : 'state_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'City',
      name        : 'city',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Location',
      name        : 'location_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Phone Mobile',
      name        : 'phones[0]',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'boolean_active',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Created At',
      name        : 'created_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
