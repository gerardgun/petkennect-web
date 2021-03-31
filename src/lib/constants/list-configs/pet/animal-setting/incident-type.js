export default {
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
    single: [
      {
        display_name: 'Delete Type',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Incident Type',
      name        : 'name',
      type        : 'string',
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
