export default {
  base_uri      : null,
  search_enabled: false,

  row: {
    options: [
      {
        display_name: 'Re-Aprove',
        content     : 'Re-Aprove',
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
      display_name: 'REASON',
      name        : 'reason',
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
    }
  ]
}
