export default {
  columns: [
    {
      display_name: 'Interaction Type',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : 13,
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
