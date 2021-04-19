export default {
  actions: [
    {
      display_name: 'Add Veterinary',
      name        : 'create',
      color       : 'teal',
      icon        : 'Add'
    }
  ],
  columns: [
    {
      display_name: 'Veterinarian Name',
      name        : 'name',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 4,
      options     : [
        {
          display_name: 'Edit Veterinary',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Veterinary',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
