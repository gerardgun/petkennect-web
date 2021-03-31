
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
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          display_name: 'Reservation',
          name        : 'reservation'
        }
      ]
    }
  ]
}
