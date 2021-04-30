import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import EmployeeRoleForm from  './create'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/capacity/appointment/components/Tab'
import Table from '@components/Table'
import employeeRoleListConfig from '@lib/constants/list-configs/employee/role'

import employeeRoleDuck from '@reducers/employee/role'
import employeeRoleDetailDuck from '@reducers/employee/role/detail'

const SetupCapacityAppointmentRoleIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(employeeRoleDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      employeeRoleDuck.creators.get()
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        employeeRoleDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        employeeRoleDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      dispatch(
        employeeRoleDetailDuck.creators.setItem(reason, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        employeeRoleDetailDuck.creators.setItem(reason, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={employeeRoleListConfig}
            duck={employeeRoleDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <EmployeeRoleForm/>

        <ModalDelete duckDetail={employeeRoleDetailDuck}/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityAppointmentRoleIndex
