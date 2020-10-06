import React from 'react'
import { Field } from 'redux-form'

import FormField from '@components/Common/FormField'
import { Button, Segment, Header, Select, Checkbox } from 'semantic-ui-react'

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

  const buttonWidth = (72 - (0.24 * (ArrDate.length - 1))) / (ArrDate.length - 1)

  return Area.map((areaItem,i) =>{
    return  (
      <>
        <div>{
          ArrDate.map((dateItem,j) =>{
            return (
              <>
                {i == 0 && j == 0
                   && <span className='spn-calendar-btn'></span>
                }
                {i == 0 && j > 0
                   && <Button className='btn-reservation-calendar basic' style={{ width: buttonWidth + 'rem' }}>{dateItem}</Button>
                }
                {i > 0 && j == 0
    && <><span className='spn-area'><span>{Area[i]}</span><Checkbox label='Select All'/></span></>
                }
                {i > 0 && j > 0
                  && <Button className='btn-reservation-calendar'  primary style={{ width: buttonWidth + 'rem' }}></Button>
                }
              </>
            )
          })}
        </div>
      </>
    )
  })
}

function PetItem({ checkIn , checkOut, item }) {
  return (
    <Segment >
      <div className='div-kannel-selection'>
        <Header as='h3' className='section-info-header'>What kennel and activity will be for {item[0].name}</Header>
        <Field
          component={FormField}
          control={Select}
          lebel='kennel'
          name={`${item[0].id}.kennel`}
          options={[
            { key: 1, value: 1, text: 'Luxury' }
          ]}
          placeholder='Select Kennel'
          required
          selectOnBlur={false}/>
      </div>
      <div>
        <ReservationCalenderList checkIn={checkIn} checkOut={checkOut}/>
      </div>
      <div>
        <Button className='btn-avaliable' primary>Available</Button>
        <Button className='btn-spent' primary>Spent</Button>
      </div>
      <div className='div-kannel-selection'>
        <Field
          component={FormField}
          control={Select}
          label='Activity package'
          name={`${item[0].id}.activityPackage`}
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
