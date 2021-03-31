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
      display_name: 'Delete Type',
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
      display_name: 'Incident Type',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : 3,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Group Play Removal Limit',
      name        : 'groupLimit',
      type        : 'string',
      width       : 12,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'All Service Removal Limit',
      name        : 'allLimit',
      type        : 'string',
      width       : 12,
      align       : 'left',
      sort        : false
    }

  ]
}
