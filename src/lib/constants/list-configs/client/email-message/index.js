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
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Sent',
      name        : 'sent',
      type        : 'string',
      width       : 'null',
      align       : 'left',
      sort        : false
    }
  ]
}
