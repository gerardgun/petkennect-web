import React from 'react'
import { Checkbox, Input } from 'semantic-ui-react'

import { getContentMoney } from '@components/Table/Body/Cell/helpers'

export default {
  columns: [
    {
      display_name: 'Service',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Enabled',
      name        : 'sku_id',
      type        : 'string'
    },
    {
      display_name: 'Taxable',
      name        : 'service.name',
      formatter   : cell => (
        <Checkbox checked={cell} disabled toggle/>
      )
    },
    {
      display_name: 'Tax Rate',
      type        : 'text',
      formatter   : cell => (
        <Input placeholder='0.00' disabled toggle/>
      )
    },
  ]
}
