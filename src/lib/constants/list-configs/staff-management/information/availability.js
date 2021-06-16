import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import moment from 'moment'

export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Day',
      name        : 'day',
      type        : 'string',
      align       : 'left',
      width       : null

    },
    {
      display_name: 'From',
      name        : 'from',
      type        : 'string',
      align       : 'left',
      width       : null,
      formatter   : cell => {
        let from = ''
        from = moment(cell, [ 'HH:mm' ]).format('hh:mm A')

        return (
          <span>{from}</span>
        )
      }
    },

    {
      display_name: 'To',
      name        : 'to',
      type        : 'string',
      align       : 'left',
      width       : null,
      formatter   : cell => {
        let to = ''
        to = moment(cell, [ 'HH:mm' ]).format('hh:mm A')

        return (
          <span>{to}</span>
        )
      }
    },
    {
      display_name: 'Anytime',
      name        : 'anytime',
      type        : 'string',
      align       : 'center',
      width       : null,
      formatter   : cell => (
        <Checkbox
          checked={JSON.parse(cell)}
          disabled/>
      )
    },
    {
      display_name: 'Unavailable',
      name        : 'unavailable',
      type        : 'string',
      align       : 'center',
      width       : null,
      formatter   : cell => (
        <Checkbox
          checked={JSON.parse(cell)}
          disabled/>
      )
    }

  ]
}
