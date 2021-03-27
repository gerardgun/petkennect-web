export default {
  columns: [
    {
      display_name: 'Name',
      name        : 'product_name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Slug',
      name        : 'slug',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : true
    }
  ]
}
