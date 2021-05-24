export default {
  actions: [
    {
      display_name: 'New Area',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Belongings Area Name',
      name        : 'name',
      type        : 'string',
      sort        : true
    },
    {
      display_name: 'Bin No',
      name        : 'capacity',
      type        : 'string'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'Edit Area',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Area',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
