import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card, Header } from 'semantic-ui-react'
import  TimeOffForm from './modal/time-off-form'
import AvailabiltyChangeForm from './modal/availability-change-form'
import employeeTimeOffDetailDuck from '@reducers/staff-management/employee-time-off/requests/upcoming/detail'
import employeeTimeOffOtherDetailDuck from '@reducers/staff-management/employee-time-off/requests/other/detail'
import './styles.scss'

const items = [
  {
    id   : 1,
    label: 'Policy',
    value: 'PTO'
  },
  {
    id   : 2,
    label: 'Available',
    value: '10 Days',
    hours: '10 Hours'
  },
  {
    id   : 3,
    label: 'Taken',
    value: '2 Days',
    hours: '10 Hours'
  },
  {
    id   : 4,
    label: 'Remaining',
    value: '8 Days',
    hours: '10 Hours'
  }

]

const TimeOffCard = ()=>{
  const dispatch = useDispatch()

  return (<div style={{ marginTop: '100px' }}>
    <div>
      <Button
        className='mb12' color='teal' content='Request Time Off'
        fluid
        onClick={()=>dispatch(employeeTimeOffDetailDuck.creators.setItem(null,'CREATE'))}/>
      <Button
        className='mb12' color='teal' content='Availability Change'
        fluid
        onClick={()=>dispatch(employeeTimeOffOtherDetailDuck.creators.setItem(null,'CREATE'))}/>
      <Button
        color='teal' content='Other Requests'
        fluid/>
    </div>

    <div style={{ marginTop: '40px' }}>
      <Card fluid>
        <div className='flex justify-center align-center' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)', height: '40px' }}>
          <Header as='h4' className='m0'>
           Time Off
          </Header>
        </div>
        <div className='flex justify-between align-center ph4'style={{ height: '140px' }}>
          {
            items && items.map(({ label,value, hours },index)=>{
              return (
                <div key={index}>
                  <div className='mb24'><label className='bold-text'>{label}</label></div>
                  <div>
                    <div><label className='bold-text'>{value}</label></div>
                    {hours ? <label className='gray-text'>{hours}</label>
                      : <label className='gray-text' style={{ opacity: 0 }}>extra</label>}
                  </div>
                </div>
              )
            })
          }
        </div>
        <div
          className='flex justify-center align-center'
          style={{ borderTop: 'solid 1px rgba(34, 36, 38, 0.15)', height: '100px' }}>
          <div className='flex flex-column align-center justify-between' style={{ height: '70px' }}>
            <div><label className='bold-text'>Accured 8.5 Days(10 Days/Year)</label></div>
            <div><label className='bold-text'>Adjustment +1 Day</label></div>
          </div>
        </div>
      </Card>
      <TimeOffForm/>
      <AvailabiltyChangeForm/>
    </div>
  </div>)
}

export default TimeOffCard
