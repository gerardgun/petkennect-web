import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Popup } from 'semantic-ui-react'

import { formatPhoneNumber } from '@lib/utils/functions'

import locationDuck from '@reducers/location'

export default {
  search_placeholder: 'Search by name or email',
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
    multiple: [
      {
        display_name: 'Delete Client',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red'
      }
    ]
  },
  columns: [
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'status',
      formatter   : cell => {
        let type_str = ''

        if(cell === 'Decline Client')
          type_str = 'Decline Client'
        else if(cell === 'VIP Client')
          type_str = 'VIP Client'
        else if(cell === 'Caution')
          type_str = 'Caution'
        else if(cell === 'Active')
          type_str = 'Active'

        if(cell == 'Decline Client')
          cell = (<Icon name='user circle' style={{ color: 'red', fontSize: '35px' }} ></Icon>)
        else if(cell == 'VIP Client')
          cell = (<Icon name='user circle' style={{ color: 'green', fontSize: '35px' }}></Icon>)
        else if(cell == 'Caution')
          cell = (<Icon name='user circle' style={{ color: 'yellow', fontSize: '35px' }}></Icon>)
        else if(cell == 'Active')
          cell = (<Icon name='user circle' style={{ color: 'gray', fontSize: '35px' }}></Icon>)

        return (
          <span>
            <Popup
              content={type_str} inverted position='bottom center'
              trigger={cell}/>
          </span>
        )
      }
    },
    {
      display_name: 'Client Name',
      name        : 'first_name',
      type        : null, // string, image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'user__first_name',
      formatter   : (cell, row) => {
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link to={`/client/${row.id}`}>
                <span>{`${cell} ${row.last_name}`}</span>
              </Link>
            </div>
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
      display_name: 'Email',
      name        : 'email',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'user__email'
    },
    {
      display_name: 'State',
      name        : 'state_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'zip_code__state'
    },
    {
      display_name: 'City',
      name        : 'city',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'zip_code__city'
    },
    {
      display_name: 'Location',
      name        : 'location_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'location__code',
      filter      : {
        type   : 'dropdown',
        name   : 'location__id',
        options: locationDuck.store
      }
    },
    {
      display_name: 'Mobile Phone',
      name        : 'phones[0]',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell) => {
        return (
          formatPhoneNumber(cell)
        )
      }
    },
    {
      display_name: 'Created At',
      name        : 'created_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type: 'range_date',
        name: [ 'created_at__gt', 'created_at__lt' ]
      }
    }
  ]
}
