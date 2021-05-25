import React from 'react'
import { Label } from 'semantic-ui-react'

export default {
  columns: [
    {
      display_name: '',
      name        : 'type',
      type        : 'string',
      width       : null,
      align       : 'left',
      formatter   : (cell) => {
        return (
          <div>
            {
              cell === 'training' && (
                <Label style={{ height: '20px', backgroundColor: '#fc9e19' }}></Label>)
            }
            {
              cell === 'facility' && (
                <Label style={{ height: '20px', backgroundColor: '#306EFF' }}></Label>)
            }
            {
              cell === 'daycare' && (
                <Label style={{ height: '20px', backgroundColor: '#9C44AD' }}></Label>)
            }
          </div>
        )
      }
    },
    {
      display_name: 'Event',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Date',
      name        : 'date',
      type        : 'string',
      width       : null,
      align       : 'left',
      filter      : {
        type: 'range_date',
        name: [ 'created_at__gt', 'created_at__lt' ]
      }
    },
    {
      display_name: 'Time',
      name        : 'time',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Assigned',
      name        : 'assigned',
      type        : 'string',
      width       : null,
      align       : 'left'
    }
  ]
}
