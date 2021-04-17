
export default {
  actions: [
    {
      display_name: 'New Species',
      name        : 'create',
      color       : 'teal'
    }
  ],
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : true,
      sort_name   : 'pet__name'
    },
    {
      display_name: 'Applies To Location',
      name        : 'location',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 4,
      options     : [
        {
          display_name: 'View Vaccination List',
          name        : 'view',
          icon        : 'eye',
          color       : 'blue'
        },
        {
          display_name: 'Edit Species',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Species',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
