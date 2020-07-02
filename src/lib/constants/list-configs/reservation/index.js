export default {
  base_uri: null,
  row     : {
    options: [
      {
        display_name: 'View Report',
        name        : 'view_report',
        icon        : 'print'
      },
      {
        display_name: 'View Detail',
        name        : 'view_detail',
        icon        : 'eye'
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
    }
  ]
}
