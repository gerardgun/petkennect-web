
export default {
  options: {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      },
      {
        display_name: 'Print',
        name        : 'print',
        icon        : 'print'
      },
      {
        display_name: 'View Clients and Pets',
        name        : 'view_client_pet',
        icon        : 'eye'
      },
      {
        display_name: 'View Reservation by Dates',
        name        : 'reservation_by_dates',
        icon        : 'calendar alternate outline'
      },
      {
        display_name: 'View Clients with Standing Day Care Reservations',
        name        : 'day_care_reservations',
        icon        : 'qrcode'
      },
      {
        display_name: 'Email Client List',
        name        : 'email_client_list',
        icon        : 'mail'
      }
    ],
    multiple: [
      {
        display_name: 'Delete Client',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Species',
      name        : 'species',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Breed',
      name        : 'breed',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Coloring',
      name        : 'coloring',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Weight Range',
      name        : 'weight_range',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Size',
      name        : 'size',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Actions',
      type        : 'dropdown',
      width       : null,
      align       : 'left',
      options     : [
        {
          display_name: 'View Clients and Pets',
          name        : 'view_client_pet',
          icon        : 'eye'
        },
        {
          display_name: 'View Reservation by Dates',
          name        : 'reservation_by_dates',
          icon        : 'calendar alternate outline'
        },
        {
          display_name: 'View Clients with Standing Day Care Reservations',
          name        : 'day_care_reservations',
          icon        : 'qrcode'
        },
        {
          display_name: 'Email Client List',
          name        : 'email_client_list',
          icon        : 'mail'
        }
      ]
    }
  ]

}
