export default {
  search_placeholder: 'Search by value',
  actions           : [
    {
      display_name: 'Add Value',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Id',
      name        : 'id',
      width       : 2,
      type        : 'string'
    },
    {
      display_name: 'Value',
      name        : 'value_display',
      type        : 'string'
    },
    {
      display_name: 'Color',
      name        : 'value',
      type        : 'color'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 2,
      options     : [
        {
          display_name: 'Edit Value',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Value',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
