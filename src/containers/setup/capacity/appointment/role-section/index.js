import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import EmployeeRoleServiceTypeFormModal from  './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/capacity/appointment/components/Tab'
import Table from '@components/Table'
import employeeRoleListConfig from '@lib/constants/list-configs/employee/role'

import employeeRoleServiceTypeDuck from '@reducers/employee/role/service-type'
import employeeRoleServiceTypeDetailDuck from '@reducers/employee/role/service-type/detail'

const SetupCapacityAppointmentRoleIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(employeeRoleServiceTypeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      employeeRoleServiceTypeDuck.creators.get({
        ordering: 'role__name'
      })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        employeeRoleServiceTypeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        employeeRoleServiceTypeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleDelete = () => {
    dispatch(
      employeeRoleServiceTypeDetailDuck.creators.delete(detail.item.id, detail.item.role_id)
    )
      .then(() => {
        dispatch(
          employeeRoleServiceTypeDetailDuck.creators.resetItem()
        )
      })
  }

  const _handleRowButtonClick = (button, item) => {
    if(button === 'delete')
      dispatch(
        employeeRoleServiceTypeDetailDuck.creators.setItem(item, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        employeeRoleServiceTypeDetailDuck.creators.setItem(item, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={employeeRoleListConfig}
            duck={employeeRoleServiceTypeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <EmployeeRoleServiceTypeFormModal/>

        <ModalDelete duckDetail={employeeRoleServiceTypeDetailDuck} onDelete={_handleDelete}/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityAppointmentRoleIndex
