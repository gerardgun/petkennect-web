import _truncate from 'lodash/truncate'

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
      display_name: 'Description',
      name        : 'description',
      formatter   : cell => _truncate(cell, { length: 35 })
    },
    {
      display_name: 'Applies to\nLocations',
      name        : 'applies_locations',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Services`,
      name        : 'service_group_names',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Service${'\n'}Types`,
      name        : 'service_type_names',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Reservation${'\n'}Types`,
      name        : 'applies_reservations',
      type        : 'string'
    },
    {
      display_name: 'Price',
      name        : 'price.price',
      type        : 'money'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 2,
      options     : [
        {
          display_name: 'Edit Add-On',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Add-On',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'red'
        }
      ]
    }
  ]
}
