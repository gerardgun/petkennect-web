export default {
  base_uri: null,
  group_by: {
    column_name: 'is_pending',
    groups     : [
      {
        value     : true,
        icon_label: 'flag outline',
        text_label: 'Current'
      },
      {
        value     : false,
        icon_label: 'flag outline',
        text_label: 'Upcoming'
      }
    ]
  },
  row: {
    options: [
      // {
      //   display_name: 'View Report',
      //   name        : 'view_report',
      //   icon        : 'print'
      // },
      // {
      //   display_name: 'View Detail',
      //   name        : 'view_detail',
      //   icon        : 'eye'
      // }
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
        display_name: 'View Report',
        name        : 'view_report'
      },
      {
        display_name: 'Edit Note',
        name        : 'edit_note'
      },
      {
        display_name: 'Edit Reserve',
        name        : 'edit_reserve'
      },
      {
        display_name      : 'Cancel CheckIn',
        name              : 'cancel_checkIn',
        conditional_render: item => item.is_pending
      },
      {
        display_name      : 'Absent',
        name              : 'absent',
        conditional_render: item => !item.is_pending
      },
      {
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
      display_name      : 'Reservation Status',
      name              : 'service__current_upcoming',
      type              : 'string',
      width             : null,
      align             : 'left',
      sort              : true,
      conditional_render: item => item.service__upcoming,
      filter            : {
        type        : 'dropdown',
        name        : 'service__current_upcoming',
        multiple    : true,
        source_store: [
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
    }
  ]
}
