export default {
  actions: [
    {
      display_name: 'New Incident Type',
      name        : 'create',
      color       : 'teal'
    }
  ],
  columns: [
    {
      display_name: 'Incident Type',
      name        : 'name',
      type        : 'string',
      width       : 3,
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
      width       : 2,
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
