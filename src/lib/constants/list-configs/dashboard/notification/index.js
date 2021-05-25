import React from 'react'
import { Link } from 'react-router-dom'
import { Label, Icon } from 'semantic-ui-react'

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
              cell === 'vaccination' && (
                <Label
                  circular
                  style={{ height: '35px', backgroundColor: '#fc9e19', color: 'white' }}>
                  <Icon
                    name='plus' style={{ width      : '15px', margin     : '0 .75em 0 0',  marginLeft : '5px',
                      marginTop  : '5px',  marginRight: '5px' }}></Icon>
                </Label>)
            }
            {
              cell === 'request' && (<Label
                circular
                style={{ height: '35px', backgroundColor: '#70c74e', color: 'white' }}>
                <Icon
                  name='comment' style={{ width      : '15px', margin     : '0 .75em 0 0',  marginLeft : '5px',
                    marginTop  : '5px',  marginRight: '5px' }}></Icon>
              </Label>)
            }
            {
              cell === 'cancel' && (<Label
                circular
                style={{ height: '35px', backgroundColor: '#c93434', color: 'white' }}>
                <Icon
                  name='exclamation' style={{ width      : '15px', margin     : '0 .75em 0 0',  marginLeft : '5px',
                    marginTop  : '5px',  marginRight: '5px' }}></Icon>
              </Label>)
            }
            {
              cell === 'information' && (<Label
                circular
                style={{ height: '35px', backgroundColor: '#306EFF', color: 'white' }}>
                <Icon
                  name='plus' style={{ width      : '15px', margin     : '0 .75em 0 0',  marginLeft : '5px',
                    marginTop  : '5px',  marginRight: '5px' }}></Icon>
              </Label>)
            }
          </div>
        )
      }
    },
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      formatter   : (cell) => {
        return (
          <>
            <Link style={{ color: 'blue' }}>
              {cell}
            </Link>
          </>
        )
      }
    },
    {
      display_name: 'Notifications',
      name        : 'notification',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Requests',
      name        : 'request',
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
    }
  ]
}
