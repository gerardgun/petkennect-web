export default {
  base_uri: null,
  row     : {
    options: [
      {
        display_name      : 'Check In',
        name              : 'check_in',
        icon              : 'arrow right',
        conditional_render: item => item.isCheckIn
      },
      {
        display_name      : 'Check Out',
        name              : 'check_out',
        icon              : 'check',
        conditional_render: item => item.isCheckOut
      }
    ],
    dropdownOptions: [
      {
        icon        : 'sticky note',
        display_name: 'View Notes',
        name        : 'view_notes'
      },
      {
        icon        : 'file pdf',
        display_name: 'Report Cards',
        name        : 'add_report_card'
      },
      {
        icon        : 'plus circle',
        display_name: 'Add Grooming',
        name        : 'add_grooming'
      },
      {
        icon        : 'clipboard list icon',
        display_name: 'Add-On Services',
        name        : 'add_on'
      },
      {
        icon        : 'blind',
        display_name: 'Add Incident',
        name        : 'add_incident'
      },{
        icon        : 'fast forward icon',
        display_name: 'Convert to Boarding',
        name        : 'convert_to_boarding'
      },{
        icon        : 'close',
        display_name: 'Cancel Reservation',
        name        : 'cancel_reservation'
      }
    ]
  },
  columns: [
    {
      display_name: 'Date',
      name        : 'date',
      type        : 'date', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false,
      filter      : {
        type: 'range_date',
        name: [ 'created_at__gt', 'created_at__lt' ]
      }
    },
    {
      display_name: 'Location',
      name        : 'location',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Type',
      name        : 'type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      filter      : {
        type        : 'dropdown',
        name        : 'type',
        source_store: [
          {
            value: 'type1',
            text : 'type1'
          },
          {
            value: 'type2',
            text : 'type2'
          }
        ]
      }
    },
    {
      display_name: 'In',
      name        : 'timeIn',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Out',
      name        : 'timeOut',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Lunch',
      name        : 'lunch',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Yard',
      name        : 'yard',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Run',
      name        : 'run',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }

  ]
}
