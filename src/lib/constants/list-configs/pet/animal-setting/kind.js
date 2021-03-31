
import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default {
  search_placeholder: 'Search',
  options           : {
    basic: [
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
    single: [
      {
        display_name: 'Delete Species',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : 4,
      align       : 'left',
      sort        : true,
      sort_name   : 'pet__name'
    },
    {
      display_name: 'Applies To Location',
      name        : 'location',
      type        : 'string',
      width       : 6,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Actions',
      name        : 'vaccine_List',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'user__first_name',
      formatter   : () => (
        <Button
          as={Link}
          basic
          color='teal'
          to='/setup/animal-setting/vaccination'>
            Vaccine List
        </Button>
      )
    }
  ]
}
