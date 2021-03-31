
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
