export default {
  columns: [
    {
      display_name: 'Date',
      name        : 'reserved_at',
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
      name        : 'location_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Type',
      name        : 'daycamp.type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      filter      : {
        type        : 'dropdown',
        name        : 'type',
        options: [
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
      name        : 'reserved_at_time',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Out',
      name        : 'checkout_at',
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
      name        : 'daycamp.yard_type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          display_name: 'Edit Reserve',
          name        : 'edit_reserve',
          icon        : 'edit'
        },
        {
          display_name: 'View Notes',
          name        : 'view_notes',
          icon        : 'sticky note'
        },
        {
          display_name: 'Edit Note',
          name        : 'edit_note',
          icon        : 'edit outline'
        },
        {
          display_name: 'Report Cards',
          name        : 'add_report_card',
          icon        : 'file pdf'
        },
        {
          display_name: 'Add Grooming',
          name        : 'add_grooming',
          icon        : 'plus circle'
        },
        {
          display_name: 'Add-On Services',
          name        : 'add_on',
          icon        : 'clipboard list icon'
        },
        {
          display_name: 'Add Incident',
          name        : 'add_incident',
          icon        : 'blind'
        },
        {
          display_name: 'Convert to Boarding',
          name        : 'convert_to_boarding',
          icon        : 'fast forward icon'
        },
        {
          display_name: 'Cancel Reservation',
          name        : 'cancel_reservation',
          icon        : 'close'
        }
      ]
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'Check In',
          name        : 'check_in',
          disable     : item => item.isCheckOut,
          icon        : 'arrow right'
        },
        {
          display_name: 'Check Out',
          name        : 'check_out',
          disable     : item => !item.isCheckOut,
          icon        : 'check'
        }
      ]
    }
  ]
}
