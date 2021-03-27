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
      display_name: 'Name',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : 3,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Limit of incidents',
      name        : 'limit',
      type        : 'string',
      width       : 12,
      align       : 'left',
      sort        : false
    }

  ]
}
