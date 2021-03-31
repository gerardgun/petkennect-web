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
        display_name: 'Feeding Methods',
        name        : 'delete',
        icon        : 'trash alternate outline',
        is_multiple : false,
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Feeding Methods',
      name        : 'name',
      type        : 'string',
      width       : 15,
      align       : 'left',
      sort        : false
    }
  ]
}
