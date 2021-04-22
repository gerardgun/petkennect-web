import React from 'react'

export default {

  actions: [
    {
      display_name: 'Compose',
      name        : 'compose',
      color       : 'teal',
      icon        : 'edit'
    }
  ],

  options: {
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
    multiple: [
      {
        display_name: 'Mark as read',
        name        : 'read',
        icon        : 'envelope open outline icon',
        color       : 'teal'
      },
      {
        display_name: 'Mark as unread',
        name        : 'unread',
        icon        : 'envelope outline icon',
        color       : 'teal'
      },
      {
        display_name: 'Delete Title',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'From',
      name        : 'from',
      type        : 'string',
      width       : 20,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        let fontWeight = ''
        if(row.email === 'unread')
          fontWeight = 'bold'
        else
          fontWeight = 'normal'

        return (
          <span
            style={{ fontWeight: fontWeight }}>{cell}</span>
        )
      }
    },
    {
      display_name: 'Subject',
      name        : 'subject',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        let fontWeight = ''
        if(row.email === 'unread')
          fontWeight = 'bold'
        else
          fontWeight = 'normal'

        return (
          <span
            style={{ fontWeight: fontWeight }}>{cell}</span>
        )
      }
    },
    {
      display_name: 'Sent',
      name        : 'sent',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        let fontWeight = ''
        if(row.email === 'unread')
          fontWeight = 'bold'
        else
          fontWeight = 'normal'

        return (
          <span
            style={{ fontWeight: fontWeight }}>{cell}</span>
        )
      }
    }
  ]
}
