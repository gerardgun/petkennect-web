export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Numeric rating',
      name        : 'rating_score',
      type        : 'string'
    },
    {
      display_name: 'Rating',
      name        : 'rating_name',
      type        : 'string'
    },
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'Edit Record',
          name        : 'edit',
          icon        : 'edit outline'
        },
        {
          display_name: 'Delete Record',
          name        : 'delete',
          disable     : item => item.disabled,
          icon        : 'trash alternate outline',
          color       : 'red'
        }
      ]
    }
  ]
}
