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
      display_name: 'Interaction Type',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : 15,
      align       : 'left',
      sort        : false
    }
  ]
}
