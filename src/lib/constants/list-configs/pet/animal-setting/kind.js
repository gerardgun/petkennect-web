
import React from 'react'
import {  Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default {
  base_uri          : null,
  search_placeholder: 'Search',
  options           : [
    {
      display_name: 'Download',
      name        : 'download',
      icon        : 'download'
    },
    {
      display_name: 'Print',
      name        : 'print',
      icon        : 'print'
    },
    {
      display_name: 'Delete Species',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: []

  },
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      width       : 4,
      sort        : true,
      sort_name   : 'pet__name'
    },
    {
      display_name: 'Applies To Location',
      name        : 'location',
      width       : 6,
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Actions',
      name        : 'vaccine_List',
      type        : null, // string, image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'user__first_name',
      formatter   : () => {
        return (
          <>
            <Link to={'/setup/animal-setting/vaccination'}>
              <Button
                basic
                color='teal'>
                Vaccine List
              </Button>
            </Link>

          </>)
      }

    }

  ]
}
