import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Header } from 'semantic-ui-react'
import Table from '@components/Table'
import timeOffRequestHistoryConfig from '@lib/constants/list-configs/staff-management/time-off-request/history'
import timeOffRequestUpcomingConfig from '@lib/constants/list-configs/staff-management/time-off-request/upcoming'
import timeOffRequestOtherConfig from '@lib/constants/list-configs/staff-management/time-off-request/other'
import employeeTimeOffHistoryDuck from '@reducers/staff-management/employee-time-off/requests/history'
import employeeTimeOffUpcomingDuck from '@reducers/staff-management/employee-time-off/requests/upcoming'
import employeeTimeOffOtherDuck from '@reducers/staff-management/employee-time-off/requests/other'
import './styles.scss'
const TimeOffRequest = ()=>{
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(employeeTimeOffUpcomingDuck.creators.get())
    dispatch(employeeTimeOffHistoryDuck.creators.get())
    dispatch(employeeTimeOffOtherDuck.creators.get())
  },[])

  return (
    <>
      <div className='pl16 mv28'>
        <label className='request-h'> View all your requests at</label>
        <label className='request-h'> Company.</label>
        <label className='request-h'> When you make a new request, your manager will be notified and you will be notified
        when they respond.</label>
      </div>
      <div className='pl32'>
        <Header as='h3' className='m0' content='Time OFF REQUESTS'/>
        <div className='mt28'>
          <Header
            as='h4' className='text-underline' color='teal'
            content='Upcoming'/>
          <div className='request-table-div'>
            <Table config={timeOffRequestUpcomingConfig} duck={employeeTimeOffUpcomingDuck}/>
          </div>
        </div>
        <div>
          <Header
            as='h4' className='text-underline' color='teal'
            content='History'/>
          <div className='request-table-div'>
            <Table config={timeOffRequestHistoryConfig} duck={employeeTimeOffHistoryDuck}/>
          </div>
        </div>
        <div>
          <Header as='h3' content='OTHER REQUESTS'/>
          <div className='request-table-div'>
            <Table config={timeOffRequestOtherConfig} duck={employeeTimeOffOtherDuck}/>
          </div>
        </div>
      </div>

    </>
  )
}

export default TimeOffRequest
