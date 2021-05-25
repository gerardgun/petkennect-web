import React from 'react'
import { Icon, Popup } from 'semantic-ui-react'
import { BiTennisBall } from 'react-icons/bi'
import { GiDogBowl } from 'react-icons/gi'
export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Pet',
      name        : 'pet',
      type        : 'string',
      width       : null,
      align       : 'left',
      formatter   : (cell, row) => {
        return (

          <div>
            <b>{row.pet.name}</b>
            {/* <label style={{ display: 'block' }}>{row.pet.breed}</label> */}
            <div>
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
        )
      }
    },

    {
      display_name: 'Client',
      name        : 'client',
      type        : 'string',
      width       : null,
      align       : 'left',
      formatter   : (cell,row)=>{
        return (
          <div>
            <b>{row.client.name}</b>
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
      display_name: 'Type',
      name        : 'type',
      type        : 'dropdown-field',
      width       : null,
      align       : 'left',
      options     : [
        { value: 'Full Day',
          text : 'Full Day' },
        { value: 'Day Care',
          text : 'Day Care' },
        { value: 'Fitness',
          text : 'Fitness' }

      ]
    },
    {
      display_name: 'End Date',
      name        : 'end_date',
      type        : 'string',
      width       : null,
      align       : 'left'
    },
    {
      display_name: 'End Time',
      name        : 'end_time',
      type        : 'string',
      width       : null,
      align       : 'left'
    }

  ]
}
