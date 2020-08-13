import React from 'react'
import { Label } from 'semantic-ui-react'

export default {
  base_uri      : null,
  search_enabled: false,
  group_by      : {
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
        display_name      : 'View PDF',
        name              : 'view_pdf',
        icon              : 'eye',
        conditional_render: item => item.signed
      },
      {
        display_name      : 'Print PDF',
        name              : 'print',
        icon              : 'print',
        conditional_render: item => item.signed
      },
      {
        display_name      : 'Download PDF',
        name              : 'download',
        icon              : 'download',
        conditional_render: item => item.signed
      },
      {
        display_name      : 'Email PDF',
        name              : 'send_document',
        icon              : 'envelope outline',
        conditional_render: item => item.signed
      },
      {
        display_name      : 'Sign Agreement',
        name              : 'sign',
        icon              : 'edit outline',
        conditional_render: item => !item.signed
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
      sort        : false,
      formatter   : cell => (
        <>
          <Label color='teal' size='tiny' style={{ paddingTop: '0.8rem', paddingBottom: '0.8rem' }}>PDF</Label>&nbsp;&nbsp;&nbsp; {cell}
        </>
      )
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
