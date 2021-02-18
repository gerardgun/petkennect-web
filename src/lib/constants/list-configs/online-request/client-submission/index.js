import React from 'react'
import { Label } from 'semantic-ui-react'

export default {
  base_uri: null,
  row     : {
    options: [
      {
        name        : 'review',
        display_name: 'Review',
        content     : 'Review',
        color       : 'teal'
      }
    ]
  },
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
        const isNew = cell > 0 || row.status === 'P'

        return (
          <Label
            circular color={isNew ? 'green' : 'orange'} horizontal
            style={{ minWidth: '6rem' }}>{isNew ? 'New' : 'In Progress'}</Label>
        )
      }
    },
    {
      display_name: 'Notes',
      name        : 'notes',
      type        : 'action',
      width       : null,
      align       : 'left',
      sort        : true,
      action      : {
        name : 'view',
        label: 'View'
      }
    }
  ]
}
