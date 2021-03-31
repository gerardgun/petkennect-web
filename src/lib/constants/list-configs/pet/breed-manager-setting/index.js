
export default {
  base_uri: null,
  options : [
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
      display_name: 'Delete Client',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : true,
      color       : 'red'
    },
    { icon        : 'eye',
      display_name: 'View Clients and Pets',
      name        : 'view_client_pet'
    },
    { icon        : 'calendar alternate outline',
      display_name: 'View Reservation by Dates',
      name        : 'reservation_by_dates'
    },
    {
      icon        : 'qrcode',
      display_name: 'View Clients with Standing Day Care Reservations',
      name        : 'day_care_reservations'
    },
    {
      icon        : 'mail',
      display_name: 'Email Client List',
      name        : 'email_client_list'
    }
  ],
  row: {
    options        : [] ,
    dropdownOptions: [
      { icon        : 'eye',
        display_name: 'View Clients and Pets',
        name        : 'view_client_pet'
      },
      { icon        : 'calendar alternate outline',
        display_name: 'View Reservation by Dates',
        name        : 'reservation_by_dates'
      },
      {
        icon        : 'qrcode',
        display_name: 'View Clients with Standing Day Care Reservations',
        name        : 'day_care_reservations'
      },
      {
        icon        : 'mail',
        display_name: 'Email Client List',
        name        : 'email_client_list'
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
    }

  ]

}
