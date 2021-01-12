export default {
  base_uri: null,
  row     : {
    options: [
      {
        display_name      : 'Check In',
        name              : 'check_in',
        icon              : 'arrow right',
        conditional_render: item => item.is_pending
      },
      {
        display_name      : 'Check Out',
        name              : 'check_out',
        icon              : 'check',
        conditional_render: item => !item.is_pending
      }
    ],
    dropdownOptions: [
      {
        icon        : 'edit',
        display_name: 'Edit Reserve',
        name        : 'edit_reserve'
      },
      {
        icon        : 'eye',
        display_name: 'View Report',
        name        : 'view_report'
      },
      {
        icon        : 'edit outline',
        display_name: 'Edit Note',
        name        : 'edit_note'
      },
      {
        icon              : 'widnow close outline',
        display_name      : 'Cancel CheckIn',
        name              : 'cancel_checkIn',
        conditional_render: item => item.is_pending
      },
      {
        icon              : 'trash alternate outline',
        display_name      : 'Absent',
        name              : 'absent',
        conditional_render: item => !item.is_pending
      },
      {
        icon        : 'close',
        display_name: 'Cancel Reserve',
        name        : 'cancel_reserve'
      }
    ]
  },
  columns: [
    {
      display_name: 'RESERVATION DATE',
      name        : 'reserved_at',
      type        : 'date', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'LOCATION',
      name        : 'location_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'location__code'
    },
    {
      display_name: 'Kennel',
      name        : 'kennel',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Check In',
      name        : 'check_in_date',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Check Out',
      name        : 'check_out_date',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Night',
      name        : 'night',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Type',
      name        : 'type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    }
  ]
}
