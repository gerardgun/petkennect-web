export default {
  base_uri: null,
  options : [
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
      display_name: 'Mark as read',
      name        : 'delete',
      icon        : 'envelope open outline icon',
      is_multiple : false,
      color       : 'teal'

    },
    {
      display_name: 'Mark as unread',
      name        : 'delete',
      icon        : 'envelope outline icon',
      is_multiple : false,
      color       : 'teal'
    },
    {
      display_name: 'Delete Title',
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
      display_name: 'From',
      name        : 'from',
      type        : 'string',
      width       : 20,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Subject',
      name        : 'subject',
      type        : 'string',
      width       : null,
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
    }
  ]
}
