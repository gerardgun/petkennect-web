import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Label } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'

export default {
  base_uri          : null,
  search_placeholder: 'Search by pet name',
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
      display_name: null,
      name        : 'multiple',
      icon        : 'fork',
      is_multiple : true
    },
    {
      display_name: null,
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
      display_name: 'Pet name',
      name        : 'name',
      type        : null, // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true,
      formatter   : (cell, row) => {
        return (
          <Link to={`/pet/${row.id}`}>
            <Image
              className='profile' rounded size='mini'
              src={row.image_filepath || defaultImageUrl}/>
            <span>{cell}</span>
          </Link>
        )
      }
    },
    {
      display_name: 'Owner',
      name        : 'client_fullname',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'client__user__first_name',
      formatter   : (cell, row) => {
        return <Link to={`/client/show/${row.client}`}>{cell}</Link>
      }
    },
    {
      display_name: 'Breed',
      name        : 'breed_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'breed__name'
    },
    {
      display_name: 'Vaccination',
      name        : 'summary.vaccination_status',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        let color, text

        if(row.summary.vaccination_request) {
          color = 'blue'
          text = 'Verify!'
        } else if(cell === 'missing') {
          color = 'black'
          text = 'Missing'
        } else if(cell === 'expired') {
          color = 'red'
          text = 'Expired'
        } else if(cell === 'coming_due') {
          color = 'orange'
          text = 'Coming Due'
        } else if(cell === 'vaccinated') {
          color = 'green'
          text = 'Current'
        }

        return <Label circular color={color} horizontal>{text}</Label>
      }
    },
    {
      display_name: 'Retired',
      name        : 'retired',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Sex',
      name        : 'sex',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      formatter   : cell => {
        return cell === 'F' ? 'Female' : 'Male'
      }
    }
  ]
}
