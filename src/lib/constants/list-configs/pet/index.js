import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Icon, Popup } from 'semantic-ui-react'
import { BiTennisBall } from 'react-icons/bi'
import { GiJumpingDog, GiDamagedHouse, GiDogBowl, GiSittingDog } from 'react-icons/gi'

import { defaultImageUrl } from '@lib/constants'
import { VaccinationStatus } from '@lib/constants/pet'

import locationDuck from '@reducers/location'
import petBreedDuck from '@reducers/pet/breed'

export default {
  search_placeholder: 'Search by pet name',
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
        display_name: 'Delete Pet',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ],
    multiple: [
      {
        display_name: 'Fork',
        name        : 'multiple',
        icon        : 'fork'
      }
    ]
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
        let sex = ''

        if(row.sex === 'M')
          sex = 'M'
        else if(row.sex === 'F')
          sex = 'F'

        let temp_jumped_fences = ''
        if(row.temp_jumped_fences === true)
          temp_jumped_fences = 'T'

        let info_housebroken = ''
        if(row.info_housebroken === true)
          info_housebroken = 'T'

        let food_aggressive = ''
        if(row.food_aggressive === true)
          food_aggressive = 'T'

        let toy_aggressive = ''
        if(row.toy_aggressive === true)
          toy_aggressive = 'T'

        let info_formal_training = ''
        if(row.info_formal_training === true)
          info_formal_training = 'T'

        const vaccinationStatus = VaccinationStatus[row.summary.vaccination_request ? 'requested' : row.summary.vaccination_status]

        return (
          <span>
            <p><Link to={`/pet/${row.id}`}>
              <Image
                className='profile' rounded size='mini'
                src={row.image_filepath || defaultImageUrl}/>
              <span>{cell}</span>
            </Link>
            </p>
            <Popup
              content={vaccinationStatus.text} inverted position='top center'
              size='tiny' trigger={<Icon name='medkit' style={{ color: vaccinationStatus.color, fontSize: '15px' }}></Icon>}/>
            {
              sex == 'M' ? (<Popup
                content='Male' inverted position='top center'
                size='tiny' trigger={<Icon name='mars' style={{ color: 'blue', fontSize: '15px' }}></Icon>}/>)
                : (<Popup
                  content='Female' inverted position='top center'
                  size='tiny' trigger={<Icon name='venus' style={{ color: 'pink', fontSize: '15px' }}></Icon>}/>)
            }
            {
              temp_jumped_fences == 'T' && (<Popup
                content='Jump Fences' inverted position='top center'
                size='tiny' trigger={<Icon style={{ color: 'teal', fontSize: '15px' }}><GiJumpingDog/></Icon>}/>)
            }
            {
              info_housebroken == 'T' && (<Popup
                content='House Broken' inverted position='top center'
                size='tiny' trigger={<Icon style={{ color: 'red', fontSize: '15px' }}><GiDamagedHouse/></Icon>}/>)
            }
            {
              food_aggressive == 'T' && (<Popup
                content='Food Aggressive' inverted position='top center'
                size='tiny' trigger={<Icon style={{ color: 'teal', fontSize: '15px' }}><GiDogBowl/></Icon>}/>)
            }
            {
              toy_aggressive == 'T' && (<Popup
                content='Toy Aggressive' inverted position='top center'
                size='tiny' trigger={<Icon style={{ color: 'teal', fontSize: '15px' }}><BiTennisBall/></Icon>}/>)
            }
            {
              info_formal_training == 'T' && (<Popup
                content='Received Training' inverted position='top center'
                size='tiny' trigger={<Icon style={{ color: 'green', fontSize: '15px' }}><GiSittingDog/></Icon>}/>)
            }
          </span>
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
        return (
          <>
            <Link to={`/client/${row.client}`}>{cell}</Link>
            {
              row.has_card && (
                <p><Popup
                  content='Credit Card' inverted position='top center'
                  size='tiny' trigger={<Icon className='mt16' name='credit card outline' style={{ color: 'teal', fontSize: '15px' }}></Icon>}/></p>
              )
            }
          </>
        )
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
        type   : 'dropdown',
        name   : 'breed__id',
        options: petBreedDuck.store
      }
    },
    // {
    //   display_name: 'Vaccination',
    //   name        : 'summary.vaccination_status',
    //   type        : null,
    //   width       : null,
    //   align       : 'left',
    //   sort        : false,
    //   formatter   : (cell, row) => {
    //     const vaccinationStatus = VaccinationStatus[row.summary.vaccination_request ? 'requested' : cell]

    //     return <Label circular color={vaccinationStatus.color} horizontal>{vaccinationStatus.text}</Label>
    //   }
    // },
    {
      display_name: 'Location',
      name        : 'client_location_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'client__location__code',
      filter      : {
        type   : 'dropdown',
        name   : 'client__location__id',
        options: locationDuck.store
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
        type   : 'dropdown',
        name   : 'retired',
        options: [
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
        type   : 'dropdown',
        name   : 'sex',
        options: [
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
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          display_name: 'Express Check In',
          name        : 'express_check_in',
          icon        : 'sign in'
        },
        {
          display_name: 'Services',
          name        : 'services',
          icon        : 'qrcode'
        },
        {
          display_name: 'Vaccination',
          name        : 'vaccination',
          icon        : 'medkit'
        }
      ]
    }
  ]
}
