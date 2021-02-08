import React from 'react'
export default {
  base_uri      : null,
  search_enabled: false,
  options       : [],
  row           : {
    options       : [],
    checkboxOption: [
      {
        name: 'add'
      }
    ]
  },
  columns: [
    {
      display_name: 'Feeding Services',
      name        : 'feeding_service',
      type        : 'string',
      align       : 'left',
      width       : null,
      sort        : false
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
