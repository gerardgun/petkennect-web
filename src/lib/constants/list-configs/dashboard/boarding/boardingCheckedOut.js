
export default {
  base_uri      : null,
  search_enabled: false,

  row: {
    options        : [],
    dropdownOptions: [
      {
        display_name: 'Check Out',
        name        : 'Check_out'
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
      display_name: 'CheckIn',
      name        : 'check_in',
      width       : null,
      type        : 'date',
      align       : 'center'

    },
    {
      display_name: 'Nights',
      name        : 'nights',
      width       : null,
      type        : 'number',
      align       : 'center'

    },
    {
      display_name: 'Card',
      name        : 'charge_card',
      width       : null,
      type        : 'string',
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
      display_name: 'by',
      name        : 'by',
      width       : null,
      type        : 'string',
      align       : 'center'

    }

  ]
}
