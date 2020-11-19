export default {
  base_uri      : null,
  search_enabled: false,
  options       : [
  ],
  row: {
    options: [
      {
        display_name: 'View',
        content     : 'view',
        color       : 'teal'
      }
    ]
  },
  columns: [
    {
      display_name: 'OWNER NAME',
      name        : 'owner_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'DOCUMENT NAME',
      name        : 'document_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'DOCUMENT TYPE',
      name        : 'document_type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'DESCRIPTION',
      name        : 'description',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'UPLOAD USER',
      name        : 'upload_user',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'DATE OF UPLOAD',
      name        : 'date_of_upload',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    }

  ]
}
