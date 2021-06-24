export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Manager Notifications',
      name        : 'manager_notification',
      type        : 'string',
      align       : 'left',
      width       : null
    },
    {
      display_name: 'SMS',
      name        : 'sms',
      align       : 'center',
      type        : 'checkbox'
    },
    {
      display_name: 'Email',
      name        : 'email',
      align       : 'center',
      type        : 'checkbox'
    }
    // {
    //   display_name: 'Email',
    //   name        : 'email',
    //   type        : 'string',
    //   align       : 'center',
    //   width       : null,
    //   formatter   : cell => (
    //     <Checkbox
    //       checked={JSON.parse(cell)}/>
    //   )
    // }

  ]
}
