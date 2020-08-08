// import React from 'react'
export default {
  base_uri: null,
  group_by: {
    column_name: 'signed',
    groups     : [
      {
        value     : false,
        icon_label: 'flag outline',
        text_label: 'Pending'
      },
      {
        value     : true,
        icon_label: 'flag outline',
        text_label: 'Signed'
      }
    ]
  },
  row: {
    options: [
      {
        display_name: null,
        name        : 'view_pdf',
        icon        : 'file pdf outline',
        is_multiple : false
      },
      {
        display_name: null,
        name        : 'print',
        icon        : 'print',
        is_multiple : false
      },
      {
        display_name: null,
        name        : 'download',
        icon        : 'download',
        is_multiple : false
      },
      {
        display_name: null,
        name        : 'send_document',
        icon        : 'envelope outline',
        is_multiple : false
      },
      {
        display_name: null,
        name        : 'sign',
        icon        : 'playstation outline',
        is_multiple : false
      }
    ]
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Signed at',
      name        : 'signed_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Size',
      name        : 'size',
      type        : 'string',
      width       : 2,
      align       : 'left',
      sort        : false
    }
  ]
}
