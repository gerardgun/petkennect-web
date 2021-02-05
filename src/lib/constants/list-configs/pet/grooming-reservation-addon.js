import React from 'react'

export default {
  base_uri      : null,
  search_enabled: false,

  row: {
    options       : [],
    checkboxOption: [
      {
        name: 'add'
      }
    ]
  },
  columns: [
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
      align       : 'center'

    }

  ]
}
