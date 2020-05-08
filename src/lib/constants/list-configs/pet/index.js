export default {
  base_uri: '/pet',
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
      display_name: 'Name',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Client First Name',
      name        : 'client_first_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Client Last Name',
      name        : 'client_last_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Breed',
      name        : 'breed_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Location',
      name        : 'location',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Current',
      name        : 'current',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Retired',
      name        : 'retired',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Reason',
      name        : 'reason',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Sex',
      name        : 'sex',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    }
  ]
}
