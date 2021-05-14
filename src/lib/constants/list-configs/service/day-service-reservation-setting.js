export default {
  actions: [
    {
      display_name: 'New Reservation',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Service Type',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Reservation Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string'
    },
    {
      display_name: 'Applies to Species',
      name        : 'applies_species',
      type        : 'string'
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: 'Type',
      name        : 'type_name',
      type        : 'string'
    },
    {
      display_name: 'Charge Type',
      name        : 'charge_type',
      type        : 'string'
    }
  ]
}
