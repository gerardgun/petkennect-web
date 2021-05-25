import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Icon, Popup } from 'semantic-ui-react'
import { defaultImageUrl } from '@lib/constants'
import { BiTennisBall } from 'react-icons/bi'
import { GiDogBowl } from 'react-icons/gi'

export default {
  columns: [
    {
      display_name: 'Pet',
      name        : 'pet',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type: 'dropdown',
        name: 'pet'
      },
      formatter: (cell, row) => {
        return (

          <div className='flex'>
            <div>
              <Popup
                size='small'
                trigger={
                  <Image
                    circular className='profile' size='mini'
                    src={row.pet.image || defaultImageUrl}/>
                }> <Popup.Content>
                  <div className='flex'>
                    <Image
                      size='medium'
                      src={row.pet.image || defaultImageUrl}/>
                  </div>

                </Popup.Content></Popup>
            </div>

            <div>
              <b>{row.pet.name}</b>
              <label style={{ display: 'block' }}>{row.pet.breed}</label>
              <div>
                <Popup
                  content='Vaccination' inverted
                  position='bottom center'
                  size='tiny'
                  trigger={
                    <Link to={{ pathname: '/dashboard', state: { info: row, screen: 'vaccination' } }}>
                      <Icon
                        name='medkit' style={{ fontSize: '15px' }}/>
                    </Link>

                  }/>
                <Popup
                  content='pop up'
                  inverted position='bottom center'
                  size='tiny'
                  trigger={
                    <Icon name='venus' style={{ color: 'pink', fontSize: '15px' }}/>
                  }/>
                <Popup
                  content='pop up'
                  inverted position='bottom center'
                  size='tiny'
                  trigger={
                    <Icon style={{ color: 'teal', fontSize: '15px' }}><GiDogBowl/></Icon>
                  }/>
                <Popup
                  content='pop up'
                  inverted position='bottom center'
                  size='tiny'
                  trigger={
                    <Icon style={{ color: 'teal', fontSize: '15px' }}><BiTennisBall/></Icon>
                  }/>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      display_name: 'Service',
      name        : 'service',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type: 'dropdown',
        name: 'service'
      },
      formatter: (cell,row)=>{
        return (<div>
          <label><b>{row.service.name}</b></label>
          <label style={{ display: 'block' }}>{row.service.checkin}</label>
          {/* <label>{row.service.checkout}</label> */}
          <label style={{ display: 'block' }}>{row.service.type}</label>
        </div>)
      }
    },
    {
      display_name: 'Client',
      name        : 'client',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type: 'dropdown',
        name: 'client'
      },
      formatter: (cell,row)=>{
        return (
          <div>
            <b>{row.client.name}</b>
            <div>
              <label>{row.client.phone}</label>|
              <Popup
                content='Email'
                inverted position='bottom center'
                size='tiny'
                trigger={
                  <Link to=''><Icon name='mail' style={{ fontSize: '15px', color: '#868788b8' }}></Icon></Link>
                }/>
            </div>

            <div>
              <Popup
                content='pop up' inverted
                position='bottom center'
                size='tiny'
                trigger={
                  <Icon name='credit card' style={{ color: 'blue',fontSize: '15px' }}/>
                }/>
              <Popup
                content='pop up'
                inverted position='bottom center'
                size='tiny'
                trigger={
                  <Icon name='dollar sign' style={{ color: 'green', fontSize: '15px' }}/>
                }/>
            </div>
          </div>
        )
      }

    },
    {
      display_name: 'Report Card',
      name        : 'report_card',
      type        : 'string',
      width       : null,
      align       : 'center',
      formatter   : (cell) => {
        return (
          <>

            <span>
              <Link to=''>
                {cell}
              </Link>
            </span>

          </>
        )
      }
    },
    {
      display_name: 'Run',
      name        : 'run',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'Add-Ons',
      name        : 'add_on',
      type        : 'button',
      align       : 'center',
      options     : [
        {
          display_name: 'addon',
          name        : 'add-on',
          icon        : 'add',
          color       : 'teal'
        }
      ]
    },

    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'action-button',
      options     : [
        {
          display_name: 'Check In',
          name        : 'check_in',
          icon        : 'check',
          color       : 'green',
          type        : 'button'
        },
        {
          display_name   : '',
          name           : 'custom_name',
          type           : 'dropdown',
          dropdownOptions: [
            {
              icon        : 'calendar alternate outline',
              display_name: 'Edit Reservation',
              name        : 'edit_reservation'
            },
            {
              icon        : 'paw',
              display_name: 'Edit Pet',
              name        : 'edit_pet'
            },
            {
              icon        : 'user',
              display_name: 'Edit client',
              name        : 'edit_client'
            },
            {
              icon        : 'medkit',
              display_name: 'Vaccinations',
              name        : 'vaccinations'
            }

          ]
        }

      ]
    }
  ]
}
