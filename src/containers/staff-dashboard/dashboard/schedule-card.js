import React from 'react'
import { Card, Header, Button, Image } from 'semantic-ui-react'
import './styles.scss'

const items = [
  {
    id       : 1,
    day      : 'Monday',
    date     : '05/17/2021',
    startTime: '7:00 am',
    endTime  : '5:00 pm',
    total    : '8hrs'

  },
  {
    id       : 2,
    day      : 'Tuesday',
    date     : '05/18/2021',
    startTime: '7:00 am',
    endTime  : '5:00 pm',
    total    : '8hrs'

  },
  {
    id       : 3,
    day      : 'Wednesday',
    date     : '05/19/2021',
    startTime: '7:00 am',
    endTime  : '5:00 pm',
    total    : '8hrs'

  },
  {
    id       : 4,
    day      : 'Thursday',
    date     : '05/20/2021',
    startTime: '7:00 am',
    endTime  : '5:00 pm',
    total    : '8hrs'

  },
  {
    id       : 5,
    day      : 'Friday',
    date     : '05/21/2021',
    startTime: '7:00 am',
    endTime  : '5:00 pm',
    total    : '8hrs'

  },
  {
    id       : 6,
    day      : 'Saturday',
    date     : '05/22/2021',
    startTime: '7:00 am',
    endTime  : '5:00 pm',
    total    : '8hrs'

  },
  {
    id       : 7,
    day      : 'Sunday',
    date     : '05/23/2021',
    startTime: '7:00 am',
    endTime  : '5:00 pm',
    total    : '8hrs'

  }

]
const ScheduleCard = ()=>{
  return (
    <Card fluid >

      <div className='align-baseline pv12 flex justify-between' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
        <div className='flex align-center'>
          <Header
            as='h4'
            className='mb0 mt0 mr8 ml16' style={{ opacity: '0.9' }}>
            Upcoming Shifts
          </Header>

          <Image className='schedule-icon' src='images/calendar_icon.png'/>
        </div>
        <Button
          className='mr16' color='teal' content='View Schedule'
          size='tiny'/>
      </div>
      <div className='ph16 flex justify-between pv32'>
        {
          items && items.map(({ day,date,startTime,endTime,total },index)=>{
            return (<>
              <div className='flex align-center flex-column' key={index}>
                <Header className='mt0 mb12 time-card-value'>{day}</Header>
                <Header className='m0 time-card-value'>{date}</Header>
                <Header className='mv12 time-card-value'>{startTime}-{endTime}</Header>
                <Header className='m0 time-card-value'>{total}</Header>
              </div>
              {
                index != 6
                    && <div style={{ borderRight: 'solid 1px rgba(34, 36, 38, 0.15)' }}/>
              }

            </>
            )
          })
        }
      </div>

    </Card>

  )
}

export default ScheduleCard
