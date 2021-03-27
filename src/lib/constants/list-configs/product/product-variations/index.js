export default {
  search_placeholder: 'Search by product name',
  options           : {
    single: [
      {
        display_name: 'Delete Product',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'SKU',
      name        : 'sku_id',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Active',
      name        : 'is_activve',
      type        : 'boolean_active',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Base Price',
      name        : 'price',
      type        : 'money',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Stock',
      name        : 'stock',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : true
    }
  ]
}
