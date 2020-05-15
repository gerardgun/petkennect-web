export default {
  base_uri: '/client',
  row     : {
    options: [
      {
        display_name: 'Edit',
        name        : 'edit',
        icon        : 'edit outline'
      }
    ]
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'first_name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Name',
      name        : 'last_name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Email',
      name        : 'email',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Location',
      name        : 'location_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Title',
      name        : 'title',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Role',
      name        : 'role',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
