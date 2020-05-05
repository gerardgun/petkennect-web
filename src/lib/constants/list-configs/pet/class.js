export default {
  base_uri: null,
  row     : {
    options: [
      {
        display_name: 'Edit',
        name        : 'edit',
        icon        : 'edit outline'
      },
      {
        display_name: 'Delete',
        name        : 'delete',
        icon        : 'trash alternate outline'
      }
    ]
  },
  columns: [
    {
      display_name: 'ID',
      name        : 'id',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
