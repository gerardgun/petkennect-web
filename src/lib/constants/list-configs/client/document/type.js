export default {
  base_uri: null,
  row     : {
    options: [
      {
        display_name: 'Edit',
        name        : 'edit',
        icon        : 'edit outline'
      },
      {
        display_name: 'Delete',
        name        : 'delete',
        icon        : 'trash alternate outline'
      }
    ]
  },
  columns: [
    {
      display_name: 'ID',
      name        : 'id',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Document Type Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }
    // {
    //   display_name: 'Upload User',
    //   name        : 'user',
    //   type        : 'string',
    //   width       : null,
    //   align       : 'left',
    //   sort        : false
    // },
    // {
    //   display_name: 'Date of Upload',
    //   name        : 'uploaded_at',
    //   type        : 'date',
    //   width       : null,
    //   align       : 'left',
    //   sort        : false
    // }
  ]
}
