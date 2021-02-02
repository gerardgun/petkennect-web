
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
      display_name: 'Check In',
      name        : 'check_in',
      width       : null,
      type        : 'date',
      align       : 'center'

    },
    {
      display_name: 'Dayleft',
      name        : 'days_left',
      width       : null,
      type        : 'number',
      align       : 'center'

    },
    {
      display_name: 'Groom',
      name        : 'groom',
      width       : null,
      type        : 'string',
      align       : 'center'

    },
    {
      display_name: 'Lunch',
      name        : 'lunch',
      width       : null,
      type        : 'string',
      align       : 'center'

    },
    {
      display_name: 'AddOn',
      name        : 'addon',
      width       : null,
      type        : 'string',
      align       : 'center'

    }
    // {
    //   display_name: 'Note',
    //   name        : 'action',
    //   width       : null,
    //   type        : 'string',
    //   align       : 'left'

    // }

  ]
}
