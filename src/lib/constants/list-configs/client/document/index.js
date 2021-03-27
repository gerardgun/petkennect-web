import React from 'react'

export default {
  search_placeholder: 'Search',
  options           : {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      },
      {
        display_name: 'Print',
        name        : 'print',
        icon        : 'print'
      }
    ],
    single: [
      {
        display_name: 'View Document',
        name        : 'view_pdf',
        icon        : 'file pdf outline'
      },
      {
        display_name: 'Edit Document',
        name        : 'edit',
        icon        : 'edit outline'
      },
      {
        display_name: 'Email Document',
        name        : 'send_document',
        icon        : 'envelope outline'
      }
    ],
    multiple: [
      {
        display_name: 'Delete Documents',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Document Name',
      name        : 'filename',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      formatter   : cell => <a style={{ cursor: 'pointer' }}>{cell}</a>
    },
    {
      display_name: 'Type',
      name        : 'type_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Comment',
      name        : 'description',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }

  ]
}
