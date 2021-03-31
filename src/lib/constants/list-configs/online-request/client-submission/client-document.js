export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'DOCUMENT NAME',
      name        : 'filename',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'DOCUMENT TYPE',
      name        : 'type_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'COMMENT',
      name        : 'description',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'DATE OF UPLOAD',
      name        : 'created_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'View',
          name        : 'view',
          icon        : 'file pdf outline',
          color       : 'teal'
        }
      ]
    }
  ]
}
