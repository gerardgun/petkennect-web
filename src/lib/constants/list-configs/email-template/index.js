export default {
  options: {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      },
      {
        display_name: 'Print',
        name        : 'print',
        icon        : 'print'
      }
    ],
    single: [
      {
        display_name: 'Delete Title',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Category',
      name        : 'category',
      type        : 'string',
      width       : null,
      align       : 'left',
      filter      : {
        type   : 'dropdown',
        name   : 'category',
        options: [
          {
            value: 'Client',
            text : 'Client'
          },
          {
            value: 'Employee',
            text : 'Employee'
          }
        ]
      }

    },
    {
      display_name: 'Name',
      name        : 'purpose',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Subject',
      name        : 'subject',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Created By',
      name        : 'created_by',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Status',
      name        : 'is_active',
      type        : 'boolean_active',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'is_active',
      filter      : {
        type   : 'dropdown',
        name   : 'is_active',
        options: [
          {
            value: true,
            text : 'Active'
          },
          {
            value: false,
            text : 'Inactive'
          }
        ]
      }
    }
  ]
}
