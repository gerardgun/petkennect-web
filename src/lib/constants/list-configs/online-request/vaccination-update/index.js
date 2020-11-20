export default {
  base_uri      : null,
  search_enabled: false,
  group_by      : {
    column_name: 'ready',
    groups     : [
      {
        value     : true,
        icon_label: 'flag outline',
        text_label: 'Ready'
      },
      {
        value     : false,
        icon_label: 'flag outline',
        text_label: 'Unfinished'
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
      display_name: 'PET',
      name        : 'pet',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'VACCINATION TYPE',
      name        : 'vaccination_type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    }
  ]
}
