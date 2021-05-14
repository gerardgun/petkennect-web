export default {
  search_placeholder: 'Search by name or slug',
  actions           : [
    {
      display_name: 'Add Category',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Slug',
      name        : 'slug',
      type        : 'string'
    },
    {
      display_name: 'Total Products',
      name        : 'count_products',
      type        : 'string',
      formatter   : cell => `${cell} products`
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'Edit Category',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Category',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}
