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
        display_name: 'Delete Product',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Id',
      name        : 'id',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Value',
      name        : 'display_value',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Color',
      name        : 'value',
      type        : 'color',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
