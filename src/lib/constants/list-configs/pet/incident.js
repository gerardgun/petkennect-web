export default {
  base_uri: null,
  row     : {
    options: [
      {
        name     : 'view_pdf',
        icon     : 'file pdf outline',
        is_inline: true
      },
      {
        name     : 'edit',
        icon     : 'edit outline',
        is_inline: true
      },
      {
        name     : 'delete',
        icon     : 'trash alternate outline',
        is_inline: true
      },
      {
        display_name: 'Email Report',
        name        : 'preview_report',
        icon        : 'print'
      },
      {
        display_name: 'Download Report',
        name        : 'download_report',
        icon        : 'download'
      }
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
      display_name: 'Notified',
      name        : 'is_client_notified',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Registered By',
      name        : 'employee',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    }

  ]
}
