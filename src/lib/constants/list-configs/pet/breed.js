export default {
  actions: [
    {
      display_name: 'New Breed',
      name        : 'create',
      color       : 'teal'
    }
  ],
  columns: [
    {
      display_name: 'Species',
      name        : 'pet_class_name',
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Breed',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Coloring',
      name        : 'name',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Weight Range',
      name        : 'weight',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Size',
      name        : 'size',
      type        : null,
      align       : 'left',
      sort        : true,
      formatter   : cell => {
        let size_str = '-'

        if(cell === 'S') size_str = 'Small'
        else if(cell === 'M') size_str = 'Medium'
        else if(cell === 'L') size_str = 'Large'
        else if(cell === 'G') size_str = 'Giant'

        return size_str
      }
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'View',
          name        : 'view',
          icon        : 'eye',
          color       : 'blue'
        },
        {
          display_name: 'Edit Reason',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Reason',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
