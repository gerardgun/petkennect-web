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
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Service Type',
      name        : 'service_name',
      type        : 'string'
    },
    {
      display_name: 'Applies to Appointments',
      name        : 'applies',
      type        : 'string'
    },
    {
      display_name: 'Max Scheduled Per Day',
      name        : 'max_scheduled_per_day',
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
