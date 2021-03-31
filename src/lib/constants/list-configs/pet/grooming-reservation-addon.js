import React from 'react'

export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Addon',
      name        : 'addon',
      type        : 'string',
      align       : 'left',
      width       : null,
      formatter   : (cell,row)=>{
        return (
          <>
            <span>

              <p><b>{row.addon}</b></p>

              {row.discription}
            </span>
          </>
        )
      }
    },
    {
      display_name: 'price',
      name        : 'price',
      width       : null,
      type        : 'string',
      align       : 'center',
      formatter   : (cell) => {
        return (
          <span>
            <p>${cell}</p></span>
        )
      }
    }
  ]
}
