export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Allowed',
      name        : 'allowed',
      type        : 'string',
      width       : 1,
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Used',
      name        : 'used',
      type        : 'string',
      width       : 1,
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Remaining',
      name        : 'remaining',
      type        : 'string',
      width       : 1,
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Purchased',
      name        : 'purchased',
      type        : 'date',// image, boolean, date, datetime, money, label
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
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          icon        : 'edit',
          display_name: 'Edit Package',
          name        : 'edit_package'
        },
        {
          icon        : 'arrow alternate circle right outline',
          display_name: 'Transfer Package',
          name        : 'transfer_package'
        },
        {
          icon        : 'redo',
          display_name: 'Refund',
          name        : 'refund'
        },
        {
          icon        : 'trash alternate outline',
          display_name: 'Delete',
          name        : 'delete'
        }
      ]
    }
  ]
}
