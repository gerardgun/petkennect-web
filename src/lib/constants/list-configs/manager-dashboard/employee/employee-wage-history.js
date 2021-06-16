export default {
  search_enabled    : false,
  search_placeholder: 'Search',

  columns: [
    {
      display_name: 'Role',
      name        : 'role',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Hourly Rate',
      name        : 'hourly_rate',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Salaried',
      name        : 'salaried',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Salaried Rate',
      name        : 'salaried_rate',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Adjustment Type',
      name        : 'adjustment_type',
      type        : 'string',
      width       : null,
      align       : 'left'
    },

    {
      display_name: 'Start Date',
      name        : 'start_date',
      type        : 'string',
      width       : null,
      align       : 'left'
    },

    {
      display_name: 'End Date',
      name        : 'end_date',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: '',
      name        : 'custom_name',
      type        : 'action-button',
      options     : [
        {
          display_name   : '',
          name           : 'custom_name',
          type           : 'dropdown',
          dropdownOptions: [
            {
              icon        : 'pencil',
              display_name: 'Edit Wage',
              name        : 'edit_wage'
            },
            {
              icon        : 'cancel',
              display_name: 'End Wage',
              name        : 'end_wage'
            },
            {
              icon        : 'delete',
              display_name: 'Delete Wage',
              name        : 'delete_wage'
            }
          ]
        }

      ]
    }
  ]
}
