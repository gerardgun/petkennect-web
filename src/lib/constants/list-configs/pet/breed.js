
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
  actions: [
    {
      display_name: 'Add Breed',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Species',
      name        : 'pet_class_name',
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Breed',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Coloring',
      name        : 'name',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Weight Range',
      name        : 'weight',
      type        : 'string',
      align       : 'left'
    },
    {
      display_name: 'Size',
      name        : 'size',
      type        : null,
      align       : 'left',
      sort        : true,
      formatter   : cell => {
        let size_str = '-'

        if(cell === 'S') size_str = 'Small'
        else if(cell === 'M') size_str = 'Medium'
        else if(cell === 'L') size_str = 'Large'
        else if(cell === 'G') size_str = 'Giant'

        return size_str
      }
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 3,
      options     : [
        {
          display_name: 'View',
          name        : 'view',
          icon        : 'eye',
          color       : 'blue'
        },
        {
          display_name: 'Edit Reason',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Reason',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]

}
