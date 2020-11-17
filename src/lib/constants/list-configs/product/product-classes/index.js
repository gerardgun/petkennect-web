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
      display_name: 'Delete Product',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: [

    ]
  },
  columns: [ {
    display_name: 'Id',
    name        : 'id',
    type        : 'number',
    width       : null,
    align       : 'left',
    sort        : false
  },
  {
    display_name: 'Name',
    name        : 'name',
    type        : 'string',
    width       : null,
    align       : 'left',
    sort        : false
  },
  {
    display_name: 'Type',
    name        : 'type',
    type        : 'string',
    width       : null,
    align       : 'left',
    sort        : false,
    formatter   : cell => {
      let type_str = ''

      if(cell === 'F')
        type_str = 'Food'
      else if(cell === 'A')
        type_str = 'Accessory'
      else if(cell === 'C')
        type_str = 'Custom'

      return type_str
    }
  },
  {
    display_name: 'Attributes',
    name        : 'attributesName',
    type        : 'string',
    width       : null,
    align       : 'left',
    sort        : false
  }
  ]
}
