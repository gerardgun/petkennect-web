export default {
  actions: [
    {
      display_name: 'Add Command',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : 12,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'Edit Command',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Command',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
