export default {
  base_uri: null,
  group_by: {
    column_name: 'is_pending',
    groups     : [
      {
        value     : true,
        icon_label: 'flag outline',
        text_label: 'Pending'
      },
      {
        value     : false,
        icon_label: 'flag outline',
        text_label: 'History'
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
      display_name: 'Report',
      name        : 'report-client-side',
      type        : 'action',
      width       : null,
      align       : 'left',
      action      : {
        name : 'show_report',
        label: 'View'
      }
    },
    {
      display_name: 'Detail',
      name        : 'detail-client-side',
      type        : 'action',
      width       : null,
      align       : 'left',
      action      : {
        name : 'show_detail',
        label: 'View'
      }
    }
  ]
}
