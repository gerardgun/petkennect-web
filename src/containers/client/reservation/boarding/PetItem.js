import React from 'react'
import { Field } from 'redux-form'

import FormField from '@components/Common/FormField'
import { Button, Segment, Header, Table, Select, Checkbox } from 'semantic-ui-react'

function dateToYMD(date) {
  let strArray = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  let d = date.getDate()
  let m = strArray[date.getMonth()]

  return '' + (d <= 9 ? '0' + d : d) + ' ' + m
}

function ReservationCalenderList({ checkIn,checkOut }) {
  let ArrDate = [ '' ]
  let Area = []
  for (let d = new Date(checkIn); d <= new Date(checkOut); d.setDate(d.getDate() + 1))
    ArrDate.push(dateToYMD(d))

  if(ArrDate.length > 0)
    Area.push('', 'AREA1','AREA2')

  return Area.map((areaItem,i) =>{
    return  (
      <>
        <Table.Row>
          {
            ArrDate.map((dateItem,j) =>{
              return (
                <>
                  {i == 0 && j == 0
                   &&  <Table.Cell style={{ width: '1rem' }}><span className='spn-calendar-btn'></span></Table.Cell>
                  }
                  {i == 0 && j > 0
                  && <Table.Cell><Button className='btn-reservation-calendar basic' style={{ width: '100%' }} type='button'>{dateItem}</Button></Table.Cell>
                  }
                  {i > 0 && j == 0
    && <><Table.Cell><span className='spn-area'><span>{Area[i]}</span><Checkbox label='Select All'/></span></Table.Cell></>
                  }
                  {i > 0 && j > 0
                  && <Table.Cell><Button
                    className='btn-reservation-calendar' primary style={{ width: '100%' }}
                    type='button' ></Button></Table.Cell>
                  }
                </>
              )
            })}
        </Table.Row>
      </>
    )
  })
}

function PetItem({ checkIn , checkOut, item, petKennelOptions }) {
  return (
    <Segment >
      <div className='div-kannel-selection'>
        <Header as='h3' className='section-info-header'>What kennel and activity will be for {item.name}</Header>
        <Field
          component={FormField}
          control={Select}
          lebel='kennel'
          name={`${item.id}.kennel`}
          options={petKennelOptions}
          placeholder='Select Kennel'
          selectOnBlur={false}/>
      </div>
      <div style={{ overflowY: 'auto' }}>
        <Table
          basic='very' celled collapsing
          unstackable>
          <Table.Body>
            <ReservationCalenderList checkIn={checkIn} checkOut={checkOut}/>
          </Table.Body>
        </Table>
      </div>
      <div className='action-button-reservation'>
        <hr/>
        <Button className='btn-spent' color='teal' primary>Spent</Button>
        <Button className='btn-avaliable' color='teal'>Available</Button>
      </div>
      <div className='div-kannel-selection'>
        <Field
          component={FormField}
          control={Select}
          label='Activity package'
          name={`${item.id}.activityPackage`}
          options={[
            { key: 1, value: 1, text: 'Test' }
          ]}
          placeholder='Select Activity Package'
          required
          selectOnBlur={false}/>
      </div>
    </Segment>
  )
}

PetItem.propTypes = {
}

PetItem.defaultProps = { }

export default PetItem
