export default {
  columns: [
    {
      display_name: 'Client',
      name        : 'client_first_name',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        return `${row.client_last_name}, ${cell}`
      }
    },
    {
      display_name: 'PET',
      name        : 'pet_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'LOCATION',
      name        : 'client.location.code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : () => '02-RH'
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'Review',
          name        : 'review',
          content     : 'Review',
          color       : 'teal'
        }
      ]
    }
  ]
}
