import React from 'react'
import { Label } from 'semantic-ui-react'

export default {
  columns: [
    {
      display_name: 'Task Name',
      name        : 'task',
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
      display_name: 'Priority',
      name        : 'priority',
      type        : 'string',
      width       : null,
      align       : 'left',
      formatter   : (cell) => {
        return (
          <div>
            {
              cell === 'High' && (
                <Label style={{ color          : 'white', backgroundColor: '#fc9e19', fontSize       : '13px',
                  height         : '20px', paddingTop     : '3px', paddingLeft    : '4px', paddingRight   : '4px',
                  width          : '70px',textAlign      : 'center' }}>High</Label>
              )
            }
            {
              cell === 'Medium' && (
                <Label style={{ color          : 'white', backgroundColor: '#306EFF', fontSize       : '13px',
                  height         : '20px', paddingTop     : '4px', paddingLeft    : '4px', paddingRight   : '4px',
                  textAlign      : 'center', width          : '70px' }}>Medium</Label>
              )
            }
            {
              cell === 'Low' && (
                <Label style={{ color          : 'white', backgroundColor: '#70c74e', fontSize       : '13px',
                  height         : '20px', paddingTop     : '4px', paddingLeft    : '5px', paddingRight   : '5px',
                  textAlign      : 'center', width          : '70px' }}>Low</Label>
              )
            }
          </div>
        )
      }
    }
  ]
}
