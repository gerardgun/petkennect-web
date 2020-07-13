export default {
  base_uri : null,
  no_search: true,
  options  : [
    {
      display_name: 'Download',
      name        : 'download',
      icon        : 'download'
    },
    {
      display_name: 'Print',
      name        : 'print',
      icon        : 'print'
    },
    {
      display_name: null,
      name        : 'view_pdf',
      icon        : 'file pdf outline',
      is_multiple : false
    },
    {
      display_name      : null,
      name              : 'edit',
      icon              : 'edit outline',
      is_multiple       : false,
      conditional_render: (item) => !item.is_client_notified
    },
    {
      display_name      : null,
      name              : 'preview_report',
      icon              : 'envelope outline',
      is_multiple       : false,
      conditional_render: (item) => !item.is_client_notified
    },
    {
      display_name      : null,
      name              : 'delete',
      icon              : 'trash alternate outline',
      is_multiple       : false,
      color             : 'red',
      conditional_render: (item) => !item.is_client_notified
    }
  ],
  row: {
    options: [
      // {
      //   name     : 'view_pdf',
      //   icon     : 'file pdf outline',
      // },
      // {
      //   name     : 'edit',
      //   icon     : 'edit outline',
      // },
      // {
      //   name     : 'delete',
      //   icon     : 'trash alternate outline',
      // },
      // {
      //   display_name: 'Email Report',
      //   name        : 'preview_report',
      //   icon        : 'print'
      // },
      // {
      //   display_name: 'Download Report',
      //   name        : 'download_report',
      //   icon        : 'download'
      // }
    ]
  },
  columns: [
    {
      display_name: 'Incised at',
      name        : 'incised_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Type',
      name        : 'type_name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        selectable: true,
        label     : 'Incident Type',
        name      : 'type'
      }
    },
    {
      display_name: 'Outcome',
      name        : 'action_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        selectable: true,
        label     : 'Incident Action',
        name      : 'action'
      }
    },
    {
      display_name: 'Registered By',
      name        : 'employee_fullname',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Notified',
      name        : 'is_client_notified',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : false
    }

  ]
}
