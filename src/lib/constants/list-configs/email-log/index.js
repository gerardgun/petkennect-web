import React from 'react'
import { Icon, Popup, Label } from 'semantic-ui-react'

export default {
  base_uri: null,
  options : [
    {
      display_name: 'Delete Message',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options        : [],
    dropdownOptions: [
      {
        icon        : 'mail',
        display_name: 'Email Logs view',
        name        : 'email_logs_view'
      },
      {
        icon        : 'redo',
        display_name: 'Resend',
        name        : 'resend'
      },
      {
        icon        : 'send',
        display_name: 'forward',
        name        : 'forward'
      }
    ]
  },
  columns: [
    {
      display_name: 'Subject',
      name        : 'subject',
      type        : 'string',
      width       : 20,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Sent',
      name        : 'date',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'To',
      name        : 'email',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : cell => {
        let color
        if(cell == 'Bounced')
          color = 'red'
        else if(cell == 'Clicked')
          color = 'blue'
        else
          color = 'green'

        return (
          <Label
            circular color={color} horizontal
            style={{ minWidth: '6rem' }}>{cell}</Label>
        )
      }
    }
  ]
}
