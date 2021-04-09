export default {
  columns: [
    {
      display_name: 'Incident Type',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Group Play Removal Limit',
      name        : 'groupLimit',
      type        : 'string',
      width       : null,
      align       : 'center',
      sort        : false
    },
    {
      display_name: 'All Service Removal Limit',
      name        : 'allLimit',
      type        : 'string',
      width       : null,
      align       : 'center',
      sort        : false
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : null,
      options     : [
        {
          display_name: 'Edit Record',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Record',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }

      ]
    }

  ]
}
