
export default {
  base_uri      : null,
  search_enabled: false,

  row: {
    options        : [],
    dropdownOptions: [

      {
        display_name: 'Reservation',
        name        : 'reservation'
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
      display_name: 'Checked In',
      name        : 'checked_in',
      width       : null,
      type        : 'date',
      align       : 'center'

    },
    {
      display_name: 'Activity',
      name        : 'activity',
      width       : null,
      type        : 'string',
      align       : 'center'

    },
    {
      display_name: 'Meds',
      name        : 'meds',
      width       : null,
      type        : 'string',
      align       : 'center'

    }

  ]
}
