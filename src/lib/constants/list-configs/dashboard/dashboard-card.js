export default {
  search_enabled: false,
  columns       : [
    {
      display_name: '',
      name        : 'custom_name',
      type        : 'action-button',
      options     : [
        {
          display_name: 'View',
          name        : 'add',
          icon        : 'add',
          disable     : item => item.buttonDisabled,
          color       : 'blue',
          type        : 'button',
          size        : 'mini'
        }
      ]
    },
    {
      display_name: 'Service',
      name        : 'service',
      type        : 'string',
      align       : 'left',
      width       : null

    },
    {
      display_name: 'Expected',
      name        : 'expected',
      type        : 'string',
      align       : 'center',
      width       : null
    },

    {
      display_name: 'In',
      name        : 'in',
      type        : 'string',
      align       : 'center',
      width       : null
    },
    {
      display_name: 'Out',
      name        : 'out',
      type        : 'string',
      align       : 'center',
      width       : null
    },
    {
      display_name: 'Total',
      name        : 'total',
      type        : 'string',
      align       : 'center',
      width       : null
    },
    {
      display_name: 'Occ. %',
      name        : 'occ',
      type        : 'string',
      align       : 'center',
      width       : null
    }

  ]
}
