export default {
  base_uri: null,
  row     : {
    // options: [
    // {
    //   display_name: 'Edit',
    //   name        : 'edit',
    //   icon        : 'edit outline'
    // },
    // {
    //   display_name: 'Delete',
    //   name        : 'delete',
    //   icon        : 'trash alternate outline'
    // }
    // ]
  },
  columns: [
    {
      display_name: 'VACCINE',
      name        : 'type_name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'EXPIRED DATE',
      name        : 'expired_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'VERIFY BY',
      name        : 'employee_fullname',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'STATUS',
      name        : 'status',
      type        : 'badge',
      badge       : {
        colors: {
          'Comming due': 'amber',
          'Verify!"'   : 'blue',
          'Expired!"'  : 'red',
          Current      : 'green'
        }
      },
      width: null,
      align: 'left'
    }
  ]
}
