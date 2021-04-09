export default {
  search_placeholder: 'Search',
  columns           : [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : 4,
      align       : 'left',
      sort        : true,
      sort_name   : 'pet__name'
    },
    {
      display_name: 'Applies To Location',
      name        : 'location',
      type        : 'string',
      width       : 7,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [

        {
          display_name: 'Vaccine List',
          name        : 'vaccine_list',
          icon        : 'eye',
          color       : 'teal'
        },
        {
          display_name: 'Edit Record',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Record',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }

      ]
    }

  ]
}
