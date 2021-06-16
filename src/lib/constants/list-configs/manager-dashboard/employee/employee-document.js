export default {
  search_enabled    : false,
  search_placeholder: 'Search',

  columns: [
    {
      display_name: 'File Name',
      name        : 'file_name',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Document Type',
      name        : 'document_type',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Description',
      name        : 'description',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Category',
      name        : 'category',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Date Added',
      name        : 'date_added',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: '',
      name        : 'custom_name',
      type        : 'action-button',
      options     : [
        {
          display_name   : '',
          name           : 'custom_name',
          type           : 'dropdown',
          dropdownOptions: [
            {
              icon        : 'file pdf outline',
              display_name: 'View Docs',
              name        : 'view_docs'
            },
            {
              icon        : 'print',
              display_name: 'Print Docs',
              name        : 'print_docs'
            },
            {
              icon        : 'mail',
              display_name: 'Email Docs',
              name        : 'email_docs'
            },
            {
              icon        : 'download',
              display_name: 'Download Docs',
              name        : 'download_docs'
            }
          ]
        }

      ]
    }
  ]
}
