
export default {
  base_uri          : null,
  search_placeholder: 'Search',

  row: {
    options        : [],
    dropdownOptions: [
      {
        icon        : 'calendar alternate outline icon',
        display_name: 'Add Reservation',
        name        : 'reservation'
      },
      {
        icon        : 'file pdf',
        display_name: 'Report Cards',
        name        : 'report_cards'
      }
    ]
  },
  columns: [
    {
      display_name: 'Type',
      name        : 'package_type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type        : 'dropdown',
        name        : 'program',
        source_store: [
          {
            value: 'Boarding',
            text : 'Boarding'
          },
          {
            value: 'DayCamp',
            text : 'DayCamp'
          },
          {
            value: 'Grooming',
            text : 'Grooming'
          },
          {
            value: 'Training',
            text : 'Training'
          }

        ]
      }
    },
    {
      display_name: 'Purchase Date',
      name        : 'date',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true

    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : true

    },
    {
      display_name: 'Days Allowed',
      name        : 'allow_days',
      type        : 'number',
      width       : null,
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Used',
      name        : 'used',
      width       : null,
      type        : 'number',
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Reservations',
      name        : 'reservations',
      type        : 'number',
      width       : null,
      align       : 'center',
      sort        : true

    },

    {
      display_name: 'Remaining',
      name        : 'remaining',
      type        : 'number',
      width       : null,
      align       : 'center',
      sort        : true
    }

  ]
}
