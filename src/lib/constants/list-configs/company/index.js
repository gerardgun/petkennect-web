import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'

export default {
  search_placeholder: 'Search by legal name',
  options           : {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      },
      {
        display_name: 'Print',
        name        : 'print',
        icon        : 'print'
      }
    ],
    single: [
      {
        display_name: 'Delete Company',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Legal name',
      name        : 'legal_name',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        return (
          <Link to={`/company/${row.id}`}>
            <Image
              className='profile' rounded size='mini'
              src={row.thumbnail || defaultImageUrl}/>
            <span>{cell}</span>
          </Link>
        )
      }
    },
    {
      display_name: 'Organization',
      name        : 'organization_legal_name',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        return row.organization ? <Link to={`/organization/${row.organization}`}>{cell}</Link> : '-'
      }
    },
    {
      display_name: 'Subdomain',
      name        : 'subdomain_prefix',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : cell => {
        return <a href={`https://${cell}.petkennect.com`} rel='noopener noreferrer' target='_blank'>{cell}</a>
      }
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
      display_name: 'Status',
      name        : 'status',
      type        : 'boolean_active',
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
