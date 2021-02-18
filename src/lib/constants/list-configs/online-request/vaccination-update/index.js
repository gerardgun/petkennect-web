export default {
  base_uri: null,
  row     : {
    options: [
      {
        name        : 'review',
        display_name: 'Review',
        content     : 'Review',
        color       : 'teal'
      }
    ]
  },
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
    }
  ]
}
