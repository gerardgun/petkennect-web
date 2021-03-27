
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
      display_name: 'Day Camp',
      name        : 'daycamp',
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
      display_name: 'Current',
      name        : 'current',
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
          icon        : 'sign in',
          display_name: 'Notes',
          name        : 'notes'
        }
      ]
    }
  ]
}
