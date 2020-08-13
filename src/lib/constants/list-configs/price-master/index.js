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
      display_name: 'Delete Price',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: [
      {
        display_name: 'Delete Price',
        name        : 'delete',
        icon        : 'trash alternate outline',
        is_multiple : false,
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'TYPE',
      name        : 'type',
      type        : 'string',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'SUB CATEGORY',
      name        : 'subcategory',
      type        : 'string',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'PRICE',
      name        : 'price',
      type        : 'string',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'STOCK',
      name        : 'stock',
      type        : 'boolean',
      align       : 'left',
      sort        : false
    }
  ]
}
