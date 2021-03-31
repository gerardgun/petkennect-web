export default {
  search_enabled: false,
  options       : {
    single: [
      {
        display_name: 'Delete Kennel',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Id',
      name        : 'id',
      type        : 'number',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Size',
      name        : 'size',
      type        : 'string',
      align       : 'left',
      sort        : false,
      formatter   : cell => {
        let type_str = ''

        if(cell === 'G')
          type_str = 'Giant'
        else if(cell === 'L')
          type_str = 'Large'
        else if(cell === 'M')
          type_str = 'Medium'
        else if(cell === 'S')
          type_str = 'Small'

        return type_str
      }
    },
    {
      display_name: 'Capacity',
      name        : 'capacity',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Kennel Area',
      name        : 'kennel_area',
      type        : 'string',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Kennel Type',
      name        : 'kennel_type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
