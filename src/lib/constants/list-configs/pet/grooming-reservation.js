export default {
  columns: [
    {
      display_name: 'RESERVATION DATE',
      name        : 'reserved_date',
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
      display_name: 'Time',
      name        : 'reserved_at_time',
      type        : 'time',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Services',
      name        : 'services',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          display_name: 'Edit Reserve',
          name        : 'edit_reserve',
          icon        : 'edit'
        },
        {
          display_name: 'View Report',
          name        : 'view_report',
          icon        : 'eye'
        },
        {
          display_name: 'Edit Note',
          name        : 'edit_note',
          icon        : 'edit outline'
        },
        {
          display_name: 'Cancel CheckIn',
          name        : 'cancel_checkIn',
          disable     : item => !item.is_pending,
          icon        : 'widnow close outline'
        },
        {
          display_name: 'Absent',
          name        : 'absent',
          disable     : item => item.is_pending,
          icon        : 'trash alternate outline'
        },
        {
          display_name: 'Cancel Reserve',
          name        : 'cancel_reserve',
          icon        : 'close'
        }
      ]
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'Check In',
          name        : 'check_in',
          disable     : item => !item.is_pending,
          icon        : 'arrow right'
        },
        {
          display_name: 'Check Out',
          name        : 'check_out',
          disable     : item => item.is_pending,
          icon        : 'check'
        }
      ]
    }
  ]
}
