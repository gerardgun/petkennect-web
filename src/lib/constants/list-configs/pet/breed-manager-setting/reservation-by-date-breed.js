import React from 'react'
import { Link } from 'react-router-dom'

export default {
  options: [
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
  columns: [
    {
      display_name: 'Breed',
      name        : 'breed',
      type        : 'string',
      width       : 2,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Pet',
      name        : 'pet',
      type        : 'string',
      width       : 2,
      align       : 'left',
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
      width       : 3,
      align       : 'left',
      sort        : true,
      formatter   : (cell, row) => {
        let id
        if(row.owner === 'Diana Zuckerberg')
          id = 14

        else if(row.owner === 'Alessia Dickinson')
          id = 102

        return (

          <Link to={`/client/${id}`}>{row.owner}</Link>
        )
      }
    },
    {
      display_name: 'Date',
      name        : 'date',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type: 'range_date',
        name: [ 'created_at__gt', 'created_at__lt' ]
      }
    },
    {
      display_name: 'Day Services',
      name        : 'day_services',
      type        : 'number',
      width       : 1,
      align       : 'center',
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

          <Link to={{ pathname: `/pet/${id}`,  state: {  option: 'services', type: 'F'  } }}>{row.day_services}</Link>
        )
      }
    },
    {
      display_name: 'Boarding',
      name        : 'boarding',
      type        : 'number',
      width       : 1,
      align       : 'center',
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

          <Link to={{ pathname: `/pet/${id}`,  state: {  option: 'services', type: 'B'  } }}>{row.boarding}</Link>
        )
      }
    },
    {
      display_name: 'Grooming',
      name        : 'grooming',
      type        : 'number',
      width       : 1,
      align       : 'center',
      formatter   : (cell, row) => {
        let id
        if(row.pet === 'Pepper')
          id = 81

        else if(row.pet === 'Marilie')
          id = 130

        else if(row.pet === 'Karina')
          id = 130

        return (

          <Link to={{ pathname: `/pet/${id}`,  state: {  option: 'services', type: 'G'  } }}>{row.grooming}</Link>
        )
      }
    },
    {
      display_name: 'Training',
      name        : 'training',
      type        : 'number',
      width       : 1,
      align       : 'center',
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

          <Link to={{ pathname: `/pet/${id}`,  state: {  option: 'services', type: 'T'  } }}>{row.training}</Link>
        )
      }
    }
  ]
}
