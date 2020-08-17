import React from 'react'

export default {
  base_uri          : null,
  search_placeholder: 'Search',
  options           : [
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
      display_name: 'View Document',
      name        : 'view_pdf',
      icon        : 'file pdf outline',
      is_multiple : false
    },
    {
      display_name: 'Edit Document',
      name        : 'edit',
      icon        : 'edit outline',
      is_multiple : false
    },
    {
      display_name: 'Email Document',
      name        : 'send_document',
      icon        : 'envelope outline',
      is_multiple : false
    },
    {
      display_name: 'Delete Documents',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : true,
      color       : 'red'
    }
  ],
  row: {
    options: []
  },
  columns: [
    {
      display_name: 'DOCUMENT NAME',
      name        : 'filename',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      formatter   : cell => <a style={{ cursor: 'pointer' }}>{cell}</a>
    },
    {
      display_name: 'TYPE',
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
      sort        : false
    }

  ]
}
