export default {
  actions: [
    {
      display_name: 'Add Measurement',
      name        : 'create',
      color       : 'teal'
    }
  ],
  columns: [
    {
      display_name: 'Medication Measurements',
      name        : 'name',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 2,
      options     : [
        {
          display_name: 'Edit Measurement',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Measurement',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
