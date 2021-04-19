
export default {
  actions: [
    {
      display_name: 'Add Rating',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Rating key',
      name        : 'rating_key',
      type        : 'string',
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'Edit Rating',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Rating',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
