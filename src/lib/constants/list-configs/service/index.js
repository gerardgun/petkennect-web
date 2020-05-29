export default {
  base_uri: null,
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
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Plans',
      name        : 'plans.length',
      type        : 'number', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Active',
      name        : 'is_active',
      type        : 'boolean', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left'
    }
  ]
}
