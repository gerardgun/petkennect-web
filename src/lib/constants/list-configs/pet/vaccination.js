import React from 'react'
import { Label } from 'semantic-ui-react'

export default {
  base_uri : null,
  no_search: true,
  row      : {
    options: [
      // {
      //   display_name: 'Edit',
      //   name        : 'edit',
      //   icon        : 'edit outline'
      // },
      // {
      //   display_name: 'Delete',
      //   name        : 'delete',
      //   icon        : 'trash alternate outline'
      // }
    ]
  },
  columns: [
    {
      display_name: 'VACCINE',
      name        : 'type_name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'FILE',
      name        : 'document_path',
      type        : null, // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      formatter   : (value)=> {
        return value ? (
          <a href={value} rel='noopener noreferrer'  target='_blank'>
            <span>File</span>
          </a>
        ) : '-'
      }
      // action      : {
      //   name : 'document_path',
      //   label: 'File'
      // }
    },
    {
      display_name: 'EXPIRED DATE',
      name        : 'expired_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'VERIFY BY',
      name        : 'employee_fullname',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'STATUS',
      name        : 'status',
      type        : 'badge',
      formatter   : (value)=> {
        const color = {
          Missing      : 'black',
          'Comming due': 'yellow',
          'Verify!'    : 'blue',
          Expired      : 'red',
          Current      : 'teal'
        }

        return  (
          <Label
            circular color={color[value]} horizontal
            style={{ minWidth: '6rem' }}>{value}</Label>)
      },
      width: null,
      align: 'left'
    }
  ]
}
