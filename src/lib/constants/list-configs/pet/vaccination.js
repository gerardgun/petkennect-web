import React from 'react'
import { Label } from 'semantic-ui-react'

import { VaccinationStatus } from '@lib/constants/pet'

export default {
  base_uri      : null,
  search_enabled: false,
  row           : {
    options: []
  },
  columns: [
    {
      display_name: 'Vaccine',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'File',
      name        : 'dose.document_path',
      type        : null, // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      formatter   : value => {
        return value ? (
          <a href={value} rel='noopener noreferrer'  target='_blank'>
            <span>File</span>
          </a>
        ) : '-'
      }
    },
    {
      display_name: 'Expiration date',
      name        : 'dose.expired_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Verified by',
      name        : 'dose.employee_fullname',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'badge',
      formatter   : cell => (
        <Label
          circular color={VaccinationStatus[cell].color} horizontal
          style={{ minWidth: '6rem' }}>{VaccinationStatus[cell].text}</Label>
      ),
      width: null,
      align: 'left'
    }
  ]
}
