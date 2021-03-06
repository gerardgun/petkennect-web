import React from 'react'

export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Boarding Misc Services',
      name        : 'boarding_service',
      type        : 'string',
      align       : 'left',
      width       : null,
      sort        : false,
      formatter   : (cell, row) => {
        return (
          <span>
            <p><b>{cell}</b></p>
            {row.description}</span>
        )
      }
    },
    {
      display_name: 'Price',
      name        : 'price',
      width       : null,
      type        : 'number',
      align       : 'left',
      sort        : false,
      formatter   : (cell) => {
        return (
          <span>
            <p>${cell}</p></span>
        )
      }
    }
  ]
}
