export default {
  base_uri: '/client',
  row: {
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
      },
    ]
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'City',
      name        : 'city',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'State',
      name        : 'state',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Location',
      name        : 'location',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Phone Mobile',
      name        : 'phone',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Phone Home',
      name        : 'home_phone',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Current',
      name        : 'current',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}