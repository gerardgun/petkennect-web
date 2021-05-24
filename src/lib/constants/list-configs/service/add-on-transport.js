export default {
  actions: [
    {
      display_name: 'New Transport Route',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Route Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Services`,
      name        : 'applies_service_type',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Service${'\n'}Types`,
      name        : 'applies_service_type',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Reservation${'\n'}Types`,
      name        : 'applies',
      type        : 'string'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 2,
      options     : [
        {
          display_name: 'Edit Transport Route',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Transport Route',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
