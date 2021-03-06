export default {
  columns: [
    {
      display_name: 'Date',
      name        : 'created_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Staff',
      name        : 'employee_full_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Location',
      name        : 'location_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Comments',
      name        : 'comment',
      type        : 'string',
      width       : 'six',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Follow up',
      name        : 'follow_up',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
