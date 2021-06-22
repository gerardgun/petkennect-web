export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Permission',
      name        : 'permission',
      type        : 'string',
      align       : 'left',
      width       : 7
    },
    {
      display_name: 'Admin',
      name        : 'admin',
      align       : 'center',
      type        : 'checkbox',
      width       : 1
    },
    {
      display_name: 'Manager',
      name        : 'manager',
      align       : 'center',
      type        : 'checkbox',
      width       : 1
    },
    {
      display_name: 'Supervisor',
      name        : 'supervisor',
      align       : 'center',
      type        : 'checkbox',
      width       : 1
    },
    {
      display_name: 'Customer Service',
      name        : 'customer_service',
      align       : 'center',
      type        : 'checkbox',
      width       : 1
    },
    {
      display_name: 'Read Only',
      name        : 'read_only',
      align       : 'center',
      type        : 'checkbox',
      width       : 1
    }
  ]
}
