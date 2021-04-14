
export default {
  search_enabled: false,

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
