import React from 'react'
import { Link } from 'react-router-dom'

export default {
  base_uri: null,
  options : [
    {
      display_name: 'Download',
      name        : 'download',
      icon        : 'download'
    },
    {
      display_name: 'Print',
      name        : 'print',
      icon        : 'print'
    }
  ],
  row: {
    options: []
  },
  columns: [
    {
      display_name: 'Breed',
      name        : 'breed',
      type        : 'string',
      align       : 'left',
      width       : 3,
      sort        : true
    },

    {
      display_name: 'Pet',
      name        : 'pet',
      type        : 'string',
      align       : 'left',
      width       : 3,
      sort        : true,
      formatter   : (cell, row) => {
        let id
        if(row.pet === 'Pepper')
          id = 81

        else if(row.pet === 'Marilie')
          id = 130

        else if(row.pet === 'Karina')
          id = 130

        return (

          <Link to={`/pet/${id}`}>{row.pet}</Link>
        )
      }
    },
    {
      display_name: 'Owner',
      name        : 'owner',
      type        : 'string',
      align       : 'left',
      sort        : true,
      width       : 3,
      formatter   : (cell, row) => {
        let id
        if(row.owner === 'Diana Zuckerberg')
          id = 14

        else if(row.owner === 'Alessia Dickinson')
          id = 102

        return (

          <Link to={`/client/${id}`}><span>{row.owner}</span></Link>
        )
      }
    },

    {
      display_name: 'Next Reservation',
      name        : 'next_reservation',
      type        : 'string',
      align       : 'left',
      width       : 4,
      sort        : true
    },
    {
      display_name: 'Last Reservation',
      name        : 'last_reservation',
      type        : 'number',
      align       : 'left',
      sort        : true
    }

  ]
}
