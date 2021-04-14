
export default {
  actions: [
    {
      display_name: 'Create New Rating',
      name        : 'create',
      color       : 'teal'
    }
  ],
  columns: [
    {
      display_name: 'Rating key',
      name        : 'rating_key',
      type        : 'number',
      align       : 'left',
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
          display_name: 'Edit Reason',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Reason',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
