export default {
  base_uri      : null,
  search_enabled: false,
  group_by      : {
    column_name: 'Ready',
    groups     : [
      {
        value     : false,
        icon_label: 'flag outline',
        text_label: 'Ready'
      },
      {
        value     : true,
        icon_label: 'flag outline',
        text_label: 'Unfinished'
      }
    ]
  },
  row: {
    options: [
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
      display_name: 'PET',
      name        : 'pet',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'DATE',
      name        : 'date',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'TYPE',
      name        : 'type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'CHECK OUT',
      name        : 'check-out',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'GROOMING',
      name        : 'grooming',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'REASON',
      name        : 'reason',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'ACKNOWLEDGE BY',
      name        : 'acknowledge-by',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'ACKNOWLEDGE ON',
      name        : 'acknowledge-on',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    }

  ]
}
