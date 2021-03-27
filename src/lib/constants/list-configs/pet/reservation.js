export default {
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
      display_name: 'TRAINING PACKAGE',
      name        : 'service_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'service_plan__service__name'
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
      display_name: 'ASIGNED TO',
      name        : 'employee_fullname',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'employee__user__last_name'
    },
    {
      display_name: 'Reservation Status',
      name        : 'service__current_upcoming',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type   : 'dropdown',
        name   : 'service__current_upcoming',
        options: [
          {
            value: 'current',
            text : 'Current'
          },
          {
            value: 'upcoming',
            text : 'Upcoming'
          }
        ]
      }
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          icon        : 'eye',
          display_name: 'View Report',
          name        : 'view_report'
        },
        {
          icon        : 'edit',
          display_name: 'Edit Note',
          name        : 'edit_note'
        },
        {
          icon        : 'edit outline',
          display_name: 'Edit Reserve',
          name        : 'edit_reserve'
        },
        {
          display_name: 'Cancel CheckIn',
          name        : 'cancel_checkIn',
          disable     : item => !item.is_pending
        },
        {
          display_name: 'Absent',
          name        : 'absent',
          disable     : item => item.is_pending
        },
        {
          display_name: 'Cancel Reserve',
          name        : 'cancel_reserve'
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
