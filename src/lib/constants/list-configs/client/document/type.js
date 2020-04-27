export default {
  base_uri: null,
  row     : {
    options: [
      {
        display_name: 'Preview',
        name        : 'preview',
        icon        : 'search plus'
      },
      {
        display_name: 'Email',
        name        : 'email',
        icon        : 'paper plane outline'
      }
    ]
  },
  columns: [
    {
      display_name: 'Owner Name',
      name        : 'owner',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Document Name',
      name        : 'document',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Document Type',
      name        : 'document_type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string',
      width       : 'three',
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Upload User',
      name        : 'user',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Date of Upload',
      name        : 'uploaded_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}
