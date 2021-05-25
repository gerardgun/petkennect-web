import React from 'react'
import { Checkbox, Icon, Popup } from 'semantic-ui-react'

export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Vaccination',
      name        : 'name',
      type        : 'string',
      width       : 2,
      align       : 'left'
    },
    {
      display_name: '',
      name        : 'expired',
      type        : 'boolean',
      width       : 1,
      align       : 'center',
      formatter   : (cell)=>{
        return (
          <>
            {
              cell == true

                ? <Popup
                  content='Missing or Expired' inverted position='bottom center'
                  size='tiny' trigger={<Icon color='red' name='medkit' size='large'/>}/>
                : <Popup
                  content='Coming Due' inverted position='bottom center'
                  size='tiny' trigger={<Icon color='yellow' name='medkit' size='large'/>}/>
            }
          </>
        )
      }
    },
    {
      display_name: 'Required',
      name        : 'status',
      type        : 'boolean',
      width       : 1,
      align       : 'center',
      formatter   : (cell)=>{
        return <Checkbox checked={cell} disabled/>
      }
    },
    {
      display_name: 'Expiration Date',
      name        : 'expired_at',
      type        : 'date-field',
      width       : 2,
      required    : true,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Comment',
      name        : 'notes',
      type        : 'text-field',
      width       : 5,
      required    : false,
      placeholder : 'Enter Comment',
      align       : 'left'
    }

  ]
}
