export default {
  options: {
  },
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
