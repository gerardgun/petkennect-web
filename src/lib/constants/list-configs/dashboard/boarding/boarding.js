
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
      display_name: 'Check Out',
      name        : 'check_out',
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
    },
    {
      display_name: 'Nights',
      name        : 'nights',
      width       : null,
      type        : 'number',
      align       : 'center'
    },
    {
      display_name: 'Current',
      name        : 'current',
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
          display_name: 'Availablity',
          name        : 'availabiity'
        },
        {
          display_name: 'Check In',
          name        : 'check_in'
        }
      ]
    }
  ]
}
