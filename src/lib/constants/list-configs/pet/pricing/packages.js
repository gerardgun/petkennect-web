export default {
  columns: [
    {
      display_name: 'Package Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'string',
      align       : 'center'
    },
    {
      display_name: 'Price Code',
      name        : 'price_code',
      type        : 'string',
      align       : 'center'
    },
    {
      display_name: 'Service Group',
      name        : 'service_group',
      type        : 'string',
      align       : 'center'
    },
    {
      display_name: 'Service Type',
      name        : 'service_type',
      type        : 'string',
      align       : 'center'
    },
    {
      display_name: 'Locations',
      name        : 'locations',
      type        : 'string',
      align       : 'center'
    },
    {
      display_name: 'Credits',
      name        : 'credits',
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

