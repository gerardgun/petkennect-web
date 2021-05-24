import _truncate from 'lodash/truncate'

export default {
  actions: [
    {
      display_name: 'Add New Activity',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Price Code',
      name        : 'price_code',
      type        : 'string'
    },
    {
      display_name: 'Activity\nName',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Description',
      name        : 'description',
      formatter   : cell => _truncate(cell, { length: 40 })
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: "Add'l\nDog Price",
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: `Applies to${'\n'}Service${'\n'}Types`,
      name        : 'applies_service_type',
      type        : 'string'
    },
    {
      display_name: `Applies to${'\n'}Reservation${'\n'}Types`,
      name        : 'applies_service_type',
      type        : 'string'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'Edit Activity',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Activity',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
