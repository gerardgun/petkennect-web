export default {
  search_enabled: false,
  columns       : [
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
      name        : 'res_type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'RES DATE',
      name        : 'res_date',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'CHECK OUT',
      name        : 'check_out',
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
    },
    {
      display_name: 'Notes',
      name        : 'note',
      type        : 'button',
      options     : [
        {
          display_name: 'View',
          name        : 'view',
          content     : 'View',
          color       : 'blue'
        }
      ]
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'Review',
          name        : 'review',
          content     : 'Review',
          color       : 'teal'
        }
      ]
    }
  ]
}
