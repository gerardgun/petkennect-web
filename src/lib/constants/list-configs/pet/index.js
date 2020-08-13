import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Label } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'
import { VaccinationStatus } from '@lib/constants/pet'

import locationDuck from '@reducers/location'
import petBreedDuck from '@reducers/pet/breed'

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
      display_name: 'Fork',
      name        : 'multiple',
      icon        : 'fork',
      is_multiple : true
    },
    {
      display_name: 'Delete Pet',
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
        return <Link to={`/client/${row.client}`}>{cell}</Link>
      }
    },
    {
      display_name: 'Breed',
      name        : 'breed_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'breed__name',
      filter      : {
        type        : 'dropdown',
        name        : 'breed__id',
        source_store: petBreedDuck.store
      }
    },
    {
      display_name: 'Vaccination',
      name        : 'summary.vaccination_status',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell, row) => {
        const vaccinationStatus = VaccinationStatus[row.summary.vaccination_request ? 'requested' : cell]

        return <Label circular color={vaccinationStatus.color} horizontal>{vaccinationStatus.text}</Label>
      }
    },
    {
      display_name: 'Location',
      name        : 'client_location_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'client__location__code',
      filter      : {
        type        : 'dropdown',
        name        : 'client__location__id',
        source_store: locationDuck.store
      }
    },
    {
      display_name: 'Retired',
      name        : 'retired',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type        : 'dropdown',
        name        : 'retired',
        source_store: [
          {
            value: true,
            text : 'Yes'
          },
          {
            value: false,
            text : 'No'
          }
        ]
      }
    },
    {
      display_name: 'Sex',
      name        : 'sex',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type        : 'dropdown',
        name        : 'sex',
        source_store: [
          {
            value: 'M',
            text : 'Male'
          },
          {
            value: 'F',
            text : 'Female'
          }
        ]
      },
      formatter: cell => {
        return cell === 'F' ? 'Female' : 'Male'
      }
    }
  ]
}
