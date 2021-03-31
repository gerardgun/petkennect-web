export default {
  search_enabled: false,
  options       : {
    single: [
      {
        display_name: 'Delete Kennel Type',
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
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : false
    }
  ]
}
