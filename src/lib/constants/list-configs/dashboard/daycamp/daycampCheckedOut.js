
export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Pet',
      name        : 'pet',
      type        : 'string',
      align       : 'left',
      width       : null
    },
    {
      display_name: 'Hours In',
      name        : 'hours_in',
      width       : null,
      type        : 'string',
      align       : 'center'
    },
    {
      display_name: 'Type',
      name        : 'type',
      width       : null,
      type        : 'string',
      align       : 'center'
    },
    {
      display_name: 'Days',
      name        : 'days',
      width       : null,
      type        : 'number',
      align       : 'center'
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          display_name: 'Notes',
          name        : 'notes',
          icon        : 'sign in'
        }
      ]
    }
  ]
}
