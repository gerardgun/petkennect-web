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
      {
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
      display_name: 'PET',
      name        : 'pet',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'RES TYPE',
      name        : 'res-type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'RES DATE',
      name        : 'res-date',
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
      display_name: 'COMMENTS',
      name        : 'comments',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    }

  ]
}
