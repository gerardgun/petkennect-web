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
      display_name: 'Delete Location',
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
      display_name: 'Group Name',
      name        : 'group name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Field Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
