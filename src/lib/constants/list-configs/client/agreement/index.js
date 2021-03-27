import React from 'react'
import { Label } from 'semantic-ui-react'

export default {
  search_enabled: false,
  columns       : [
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
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'View PDF',
          name        : 'view_pdf',
          disable     : item => !item.signed,
          icon        : 'eye'
        },
        {
          display_name: 'Print PDF',
          name        : 'print',
          disable     : item => !item.signed,
          icon        : 'print'
        },
        {
          display_name: 'Download PDF',
          name        : 'download',
          disable     : item => !item.signed,
          icon        : 'download'
        },
        {
          display_name: 'Email PDF',
          name        : 'send_document',
          disable     : item => !item.signed,
          icon        : 'envelope outline'
        },
        {
          display_name: 'Sign Agreement',
          name        : 'sign',
          disable     : item => item.signed,
          icon        : 'edit outline'
        }
      ]
    }
  ]
}
