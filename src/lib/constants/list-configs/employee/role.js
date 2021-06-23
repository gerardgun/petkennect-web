export default {
  actions: [
    {
      display_name: 'Add New',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Per Role',
      name        : 'role.name',
      type        : 'string'
    },
    {
      display_name: 'Service Type',
      name        : 'service_type.name',
      type        : 'string'
    },
    {
      display_name: 'Applies to Appointments',
      name        : 'service_variations',
      formatter   : cell => {
        let reservationTypeNames = 'All'

        if(cell.length > 0)
          reservationTypeNames = cell
            .map(({ name }) => name)
            .join(', ')

        return reservationTypeNames
      }
    },
    {
      display_name: 'Max Scheduled Per Day',
      name        : 'max_reservations_per_day',
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
