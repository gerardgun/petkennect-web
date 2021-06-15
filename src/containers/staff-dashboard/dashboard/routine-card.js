import React from 'react'
import { Button, Card, Header ,Input, Icon, Image } from 'semantic-ui-react'
import './styles.scss'
const RoutineCard = ()=>{
  return (
    <Card fluid>
      <div className='flex'>
        <div  className='ph20 pt8'style={{ borderRight: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
          <div className='flex pb8' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }} >
            <Header as='h2'  className='m0'content='10:29'/>

            <div className='routine-card-div ml12 mr20'>
              <Header as='h5' className='m0'  content='Am'/>
              <Header as='h5' className='m0' content='PDT'/>

            </div>
            <div className='routine-card-div'>
              <Header as='h5' className='m0'  content='Monday'/>
              <Header as='h5' className='m0' content='Feb 16,2015'/>
            </div>
          </div>
          <div className='flex flex-wrap mt28' >

            <Image className='clock-style mr15' src='/images/clock_icon.png'/>
            <div className='pt4'>
              <Header as='h3'   content='Last Punch'/>
              <Header as='h5' className='mb8 mt0'><Icon color='teal' name='clipboard outline'/>Punched In</Header>
              <Header as='h5' className='mb8 mt0'><Icon color='teal' name='clock outline'/>7:30 Am on 02/16/15</Header>
              <Header as='h5' className='mb8 mt0'><Icon color='teal' name='building outline'/>Marketing</Header>
            </div>
          </div>

        </div>
        <div className='ph16' style={{ flex: 1 }}>
          <Input className='mt20' fluid placeholder='Add Notes...'/>
          <Button
            className='mt20' color='teal' content='Clock In/Out'
            fluid/>
          <Button
            className='mt20' color='teal' content='Break'
            fluid/>
          <Button
            className='mv20' color='teal' content='Lunch'
            fluid/>
        </div>
      </div>
    </Card>

  )
}

export default RoutineCard
