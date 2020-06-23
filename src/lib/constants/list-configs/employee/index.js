
export default {
  base_uri: null,
  row     : {
    options: [
      {
        display_name: 'Edit',
        name        : 'edit',
        icon        : 'edit outline'
      },
      {
        display_name: 'Delete',
        name        : 'delete',
        icon        : 'trash alternate outline'
      }
    ]
  },
  columns: [
    {
      display_name: 'Employee Name',
      name        : 'first_name', // for sorting
      type        : 'avatar', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      avatar_image: 'thumbnail_path',
      avatar_name : [ 'first_name', 'last_name' ],
      avatar_link : '/employee/show/',
      sort        : true
    },
    {
      display_name: 'Email',
      name        : 'email',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Location',
      name        : 'location_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Title',
      name        : 'title_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Role',
      name        : 'role_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      labels      : {
        positive: 'Active',
        negative: 'Active'
      },
      sort: false
    },
    {
      display_name: 'Created At',
      name        : 'created_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
