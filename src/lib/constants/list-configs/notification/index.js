import locationDuck from '@reducers/location'
export default {
  options: {
    single: [
      {
        display_name: 'Delete Notification',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      },
      {
        display_name: 'Email',
        name        : 'send_email',
        icon        : 'envelope outline'
      }
    ]
  },
  columns: [
    {
      display_name: 'Comment',
      name        : 'comment',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'From Date',
      name        : 'from_date',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false,
      filter      : {
        type: 'range_date',
        name: [ 'from_date', 'to_date' ]
      }
    },
    {
      display_name: 'To Date',
      name        : 'to_date',
      type        : 'date',
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
      sort        : false,
      filter      : {
        type   : 'dropdown',
        name   : 'location',
        options: locationDuck.store
      }
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'boolean_active',
      width       : null,
      align       : 'left',
      sort        : false,
      filter      : {
        type   : 'dropdown',
        name   : 'status',
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
    },
    {
      display_name: 'Created By',
      name        : 'created_by',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
