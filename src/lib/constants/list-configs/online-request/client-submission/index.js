import faker from 'faker'

export default {
  base_uri      : null,
  search_enabled: true,
  row           : {
    options: [
      {
        name        : 'review',
        display_name: 'Review',
        content     : 'Review',
        color       : 'teal'
      }
    ]
  },
  columns: [
    {
      display_name: 'Client',
      name        : 'client_first_name',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        return `${row.client_last_name}, ${cell}`
      }
    },
    {
      display_name: 'Email',
      name        : 'email',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : () => faker.internet.email()
    },
    {
      display_name: 'MOBILE',
      name        : 'mobile',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : () => faker.phone.phoneNumber()
    },
    {
      display_name: 'LOCATION',
      name        : 'location',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : () => '02-RH'
    },
    {
      display_name: 'Notes',
      name        : 'notes',
      type        : 'action',
      width       : null,
      align       : 'left',
      sort        : false,
      action      : {
        name : 'view',
        label: 'View'
      }
    }
  ]
}
