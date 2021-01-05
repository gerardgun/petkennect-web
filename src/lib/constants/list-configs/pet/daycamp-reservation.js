export default {
  base_uri: null,
  row     : {
    options        : [ ],
    dropdownOptions: [
      {
        icon        : 'file pdf',
        display_name: 'Report Cards',
        name        : 'report_cards'
      },
      {
        icon        : 'plus circle',
        display_name: 'Add Grooming',
        name        : 'add'
      },
      {
        icon        : 'list icon',
        display_name: 'Add-Ons',
        name        : 'add_ons'
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
      display_name: 'Visit Type',
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
      display_name: 'Time Out',
      name        : 'timeout',
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
    }

  ]
}
