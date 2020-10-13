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
      display_name: 'Delete Product',
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
      display_name      : 'Color',
      name              : 'value',
      type              : 'color',
      width             : null,
      align             : 'left',
      sort              : false,
      conditional_render: item => item.isColorVisible
    }
  ]
}
