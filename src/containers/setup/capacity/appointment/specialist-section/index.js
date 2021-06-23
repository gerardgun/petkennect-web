import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment } from 'semantic-ui-react'

import EmployeeServiceTypeFormModal from  './create/form/modal'
import Layout from '@components/Common/Layout'
import Menu from '@containers/setup/capacity/components/Menu'
import ModalDelete from '@components/Modal/Delete'
import Tab from '@containers/setup/capacity/appointment/components/Tab'
import Table from '@components/Table'
import employeeListConfig from '@lib/constants/list-configs/employee/appointment-capacity'

import employeeServiceTypeDuck from '@reducers/employee/service-type'
import employeeServiceTypeDetailDuck from '@reducers/employee/service-type/detail'

const SetupCapacityAppointmentIndex = () => {
  const dispatch = useDispatch()
  const detail = useSelector(employeeServiceTypeDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(
      employeeServiceTypeDuck.creators.get({
        ordering: 'employee__full_name'
      })
    )
  }, [])

  useEffect(() => {
    if([ 'DELETED', 'POSTED', 'PUT' ].includes(detail.status))
      dispatch(
        employeeServiceTypeDuck.creators.get()
      )
  }, [ detail.status ])

  const _handleActionClick = action => {
    if(action === 'create')
      dispatch(
        employeeServiceTypeDetailDuck.creators.setItem(null, 'CREATE')
      )
  }

  const _handleDelete = () => {
    dispatch(
      employeeServiceTypeDetailDuck.creators.delete(detail.item.id, detail.item.employee_id)
    )
      .then(() => {
        dispatch(
          employeeServiceTypeDetailDuck.creators.resetItem()
        )
      })
  }

  const _handleRowButtonClick = (button, item) => {
    if(button === 'delete')
      dispatch(
        employeeServiceTypeDetailDuck.creators.setItem(item, 'DELETE')
      )
    else if(button === 'edit')
      dispatch(
        employeeServiceTypeDetailDuck.creators.setItem(item, 'UPDATE')
      )
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Menu/>

        <Tab>
          <Table
            config={employeeListConfig}
            duck={employeeServiceTypeDuck}
            onActionClick={_handleActionClick}
            onRowButtonClick={_handleRowButtonClick}/>
        </Tab>

        <EmployeeServiceTypeFormModal/>

        <ModalDelete duckDetail={employeeServiceTypeDetailDuck} onDelete={_handleDelete}/>

      </Segment>
    </Layout>
  )
}

export default SetupCapacityAppointmentIndex
