export default {
  base_uri: null,
  row     : {
    options        : [ ],
    dropdownOptions: [
      {
        icon        : 'arrow right',
        display_name: 'Reservation',
        name        : 'reservation'
      },
      {
        icon        : 'trophy',
        display_name: 'Training Performance',
        name        : 'view_performance'
      },
      {
        icon        : 'address card outline',
        display_name: 'Report Cards',
        name        : 'view_report_card'
      },
      {
        icon        : 'mail',
        display_name: 'Email Package',
        name        : 'email'
      },
      {
        icon        : 'hand point left',
        display_name: 'Digitally Sign Contract In Person',
        name        : 'email'
      },
      {
        icon        : 'arrow alternate circle up',
        display_name: 'Send Training Contract to Client',
        name        : 'email'
      },
      {
        icon        : 'print',
        display_name: 'Print Paper Contract',
        name        : 'email'
      }
    ]
  },
  columns: [
    {
      display_name: 'Package Name',
      name        : 'package_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Trainer',
      name        : 'trainer',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Starting Date',
      name        : 'starting_date',
      type        : 'date', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Reason',
      name        : 'reason',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }

  ]
}
