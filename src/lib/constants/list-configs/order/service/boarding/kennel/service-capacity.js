export default {
  actions: [
    {
      display_name: 'Bulk Upload',
      name        : 'bulk',
      color       : 'teal',
      basic       : true,
      icon        : 'upload'
    },
    {
      display_name: 'New Kennel',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Lodging Type',
      name        : 'type_name',
      type        : 'string'
    },
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string'
    },
    {
      display_name: 'Kennel ID',
      name        : 'code',
      type        : 'string'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'Edit Type',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Type',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
