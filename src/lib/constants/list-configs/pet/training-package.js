export default {
  columns: [
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Trainer',
      name        : 'trainer',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Start Date',
      name        : 'starting_date',
      type        : 'date', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Type',
      name        : 'type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Purchased',
      name        : 'purchased',
      type        : 'date', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Contract',
      name        : 'contract',
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
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          icon        : 'edit',
          display_name: 'Edit Program',
          name        : 'edit_program'
        },
        {
          icon        : 'file text',
          display_name: 'View Logs',
          name        : 'view_logs'
        },
        {
          icon        : 'address card outline',
          display_name: 'View Report Card',
          name        : 'view_report_card'
        },
        {
          icon        : 'certificate',
          display_name: 'Print Graduation Certificate',
          name        : 'graduation_certificate'
        },
        {
          icon        : 'mail',
          display_name: 'Send Contract',
          name        : 'send_contract'
        },
        {
          icon        : 'print',
          display_name: 'Print Contract',
          name        : 'print_contract'
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
