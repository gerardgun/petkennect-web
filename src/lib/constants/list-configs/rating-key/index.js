
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
    multiple: [
      {
        display_name: 'Delete Price',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'RATING KEY',
      name        : 'rating_key',
      type        : 'number',
      align       : 'left',
      width       : 4,
      sort        : true
    },
    {
      display_name: 'Name',
      name        : 'name',
      width       : 10,
      type        : 'string',
      align       : 'left',
      sort        : true
    }
  ]
}
