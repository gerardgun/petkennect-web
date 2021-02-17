export default {
  base_uri      : null,
  search_enabled: false,
  group_by      : {
    column_name: 'completed',
    groups     : [
      {
        value     : true,
        icon_label: 'flag outline',
        text_label: 'Completed'
      },
      {
        value     : false,
        icon_label: 'flag outline',
        text_label: 'InCompleted'
      }
    ]
  },
  row: {
    options: [
      {
        name        : 'review',
        display_name: 'Review',
        content     : 'Review',
        color       : 'teal'
      }
    ]
  },
  columns: [
    {
      display_name: 'CLIENT',
      name        : 'client',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'EMAIL',
      name        : 'email',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'MOBILE',
      name        : 'mobile',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'LOCATION',
      name        : 'location',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Notes',
      name        : 'notes',
      type        : 'action',
      width       : null,
      align       : 'left',
      sort        : true,
      action      : {
        name : 'view',
        label: 'View'
      }
    }
  ]
}
