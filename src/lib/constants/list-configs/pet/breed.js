export default {
  base_uri: null,
  options : [
    {
      display_name: 'Download',
      name        : 'download',
      icon        : 'download'
    },
    {
      display_name: 'Print',
      name        : 'print',
      icon        : 'print'
    },
    {
      display_name: null,
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: []
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : 4,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Size',
      name        : 'size',
      type        : null,
      width       : 3,
      align       : 'left',
      sort        : false,
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
      sort        : false
    }

  ]
}
