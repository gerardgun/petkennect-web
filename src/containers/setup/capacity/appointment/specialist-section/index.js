import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import EmployeeForm from  './create'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/capacity/appointment/components/Tab'
import Table from '@components/Table'
import employeeListConfig from '@lib/constants/list-configs/employee/appointment-capacity'

import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'

const SetupCapacityAppointmentSpecialistIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(employeeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      employeeDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        employeeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        employeeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        employeeDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        employeeDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={employeeListConfig}
            duck={employeeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <EmployeeForm/>

        <ModalDelete duckDetail={employeeDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityAppointmentSpecialistIndex
