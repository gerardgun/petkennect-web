export default {
  base_uri: null,
  row     : {
    options: [
      {
        display_name: 'Edit',
        name        : 'edit',
        icon        : 'edit outline'
      }
    ]
  },
  columns: [
    {
      display_name: 'Client Name',
      name        : 'first_name', // for sorting
      type        : 'avatar', // image, avatar, multiple, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      avatar_image: 'image_url',
      avatar_name : [ 'first_name', 'last_name' ],
      avatar_link : '/client/show/',
      sort        : true
    },
    {
      display_name: 'Email',
      name        : 'email',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'City',
      name        : 'city',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'State',
      name        : 'state',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Location',
      name        : 'emergency_vet_location',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Phone Mobile',
      name        : 'phones[0]',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      labels      : {
        positive: 'Active',
        negative: 'Active'
      },
      sort: false
    },
    {
      display_name: 'Created At',
      name        : 'created_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
