export default {
  actions: [
    {
      display_name: 'New Service Option',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Service Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string'
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'money'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 2,
      options     : [
        {
          display_name: 'Edit Service Option',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Service Option',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
