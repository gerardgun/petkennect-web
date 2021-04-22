export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Type',
      name        : 'type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Allowed',
      name        : 'allowed',
      type        : 'string',
      width       : null,
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Used',
      name        : 'used',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Remaining',
      name        : 'remaining',
      type        : 'string',
      width       : null,
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Purchased',
      name        : 'purchased',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Action',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          display_name: 'Edit Package',
          name        : 'edit_package',
          icon        : 'edit outline'
        },
        {
          display_name: 'Transfer Package',
          name        : 'transfer_package',
          icon        : 'share icon'
        },
        {
          display_name: 'Refund',
          name        : 'refund',
          icon        : 'paper plane outline'
        },
        {
          display_name: 'Delete',
          name        : 'delete',
          icon        : 'trash alternate outline'
        }
      ]
    }
  ]
}
