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
      display_name: 'Delete Incident Action',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: []
  },
  columns: [
    {
      display_name: 'Action name',
      name        : 'name',
      type        : 'string',
      width       : 4,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Action outcome',
      name        : 'result_type',
      type        : 'string',
      width       : 11,
      align       : 'left',
      sort        : false,
      formatter   : cell => {
        let result_str = 'Neither'

        if(cell === 'R') result_str = 'Removal for DayCamp'

        return result_str
      }
    }
  ]
}
