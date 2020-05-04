export default {
  base_uri: '/setup/location',
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
      display_name: 'Code',
      name        : 'code',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Address 1',
      name        : 'addresses[0]',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
