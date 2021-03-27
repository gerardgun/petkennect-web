export default {
  options: {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      },
      {
        display_name: 'Print',
        name        : 'print',
        icon        : 'print'
      }
    ],
    single: [
      {
        display_name: 'Delete Vaccination',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : 3,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Pet Species',
      name        : 'pet_class_name',
      type        : 'string',
      width       : 4,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Required',
      name        : 'is_required',
      type        : 'boolean',
      width       : 8,
      align       : 'left',
      sort        : false
    }
  ]
}
