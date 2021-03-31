export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Species',
      name        : 'species_name',
      type        : 'string'
    },
    {
      display_name: 'Breed',
      name        : 'breed_name',
      type        : 'string'
    },
    {
      display_name: 'Coloring',
      name        : 'coloring',
      type        : 'string'
    },
    {
      display_name: 'Size',
      name        : 'size',
      type        : 'string'
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'View Record',
          name        : 'show',
          icon        : 'eye'
        },
        {
          display_name: 'Edit Record',
          name        : 'edit',
          disable     : item => item.disabled,
          icon        : 'edit outline'
        },
        {
          display_name: 'Delete Record',
          name        : 'delete',
          disable     : item => item.disabled,
          icon        : 'trash alternate outline',
          color       : 'red'
        }
      ]
    }
  ]
}
