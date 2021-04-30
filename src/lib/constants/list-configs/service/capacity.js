export default {
  columns: [
    {
      display_name: 'Species',
      name        : 'species_name',
      type        : 'string'
    },
    {
      display_name: 'Service Group',
      name        : 'service_group_name',
      type        : 'string'
    },
    {
      display_name: 'Service Type',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Applies to Reservations',
      name        : 'applies',
      type        : 'string'
    },
    {
      display_name: 'Max Capacity Per Day',
      name        : 'max_capacity_per_day',
      type        : 'string',
      align       : 'center'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'Edit Type',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Type',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
