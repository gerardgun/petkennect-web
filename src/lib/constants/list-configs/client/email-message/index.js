export default {
  options: [
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
  columns: [
    {
      display_name: 'From',
      name        : 'from',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'To',
      name        : 'to',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Subject',
      name        : 'subject',
      type        : 'string',
      width       : 50,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Sent',
      name        : 'sent',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          display_name: 'Email Logs view',
          name        : 'email_logs_view',
          icon        : 'mail'
        },
        {
          display_name: 'Resend',
          name        : 'resend',
          icon        : 'redo'
        },
        {
          display_name: 'forward',
          name        : 'forward',
          icon        : 'send'
        }
      ]
    }
  ]
}
