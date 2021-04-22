import React from 'react'

export default {
  options: {
    multiple: [
      {
        display_name: 'Delete Message',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
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
          color = 'orange'
        else if(cell == 'Delivered')
          color = 'blue'
        else
          color = 'green'

        return (
          <span
            style={{ minWidth: '6rem', color: color }}><b>{cell}</b></span>
        )
      }
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          display_name: 'Resend',
          name        : 'resend',
          icon        : 'redo'
        },
        {
          display_name: 'Forward',
          name        : 'forward',
          icon        : 'send'
        }
      ]
    }
  ]
}
