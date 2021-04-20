export default {
  actions: [
    {
      display_name: 'Add Incident Type',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Incident Type',
      name        : 'name',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Group Play Removal Limit',
      name        : 'groupLimit',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'All Service Removal Limit',
      name        : 'allLimit',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 4,
      options     : [
        {
          display_name: 'Edit Incident Type',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Incident Type',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
