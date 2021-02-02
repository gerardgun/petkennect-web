
export default {
  base_uri      : null,
  search_enabled: false,

  row: {
    options        : [],
    dropdownOptions: [
      { icon        : 'sign in',
        display_name: 'Notes',
        name        : 'notes'
      }

    ]
  },
  columns: [
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

    }

  ]
}
