export default {
  options: {
  },
  columns: [
    {
      display_name: 'Medication Units',
      name        : 'name',
      type        : 'string',
      width       : 13,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'Edit',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete',
          name        : 'delete',
          icon        : 'trash alternate outline'
        }
      ]
    }
  ]
}
