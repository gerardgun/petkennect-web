export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Interaction Type',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : 12,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Actions',
      type        : 'button',
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
