export default {
  base_uri      : null,
  search_enabled: false,

  options: [
    {
      display_name: 'Delete Yard Type',
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
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : false
    }

  ]
}
