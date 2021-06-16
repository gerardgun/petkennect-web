import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Header } from 'semantic-ui-react'
import Table from '@components/Table'
import employeeTimeOffConfig from '@lib/constants/list-configs/staff-management/employee-time-off'
import employeeTimeOffDuck from '@reducers/staff-management/employee-time-off'
import './styles.scss'

const TimeOffCard = ()=>{
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(employeeTimeOffDuck .creators.get())
  },[ ])

  return (
    <Card fluid style={{ minHeight: '180px' }} >

      <div className='align-baseline pv12 flex' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
        <Header as='h4' className='mr8 mb0 ml16' style={{ opacity: '0.9' }}>
            My Time Off
        </Header>
        {/* <Icon color='blue' name='chat' size='large'/> */}
      </div>
      <div className='time-off-card-tb'>
        <Table config={employeeTimeOffConfig} duck={employeeTimeOffDuck}/>
      </div>

    </Card>

  )
}

export default TimeOffCard
