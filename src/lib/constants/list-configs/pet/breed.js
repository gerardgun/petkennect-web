export default {
  options: {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      },
      {
        display_name: 'Print',
        name        : 'print',
        icon        : 'print'
      }
    ],
    single: [
      {
        display_name: 'Delete Breed',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : 4,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Size',
      name        : 'size',
      type        : null,
      width       : 3,
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
      display_name: 'Pet species',
      name        : 'pet_class_name',
      type        : 'string',
      width       : 8,
      align       : 'left',
      sort        : true
    }
  ]
}
