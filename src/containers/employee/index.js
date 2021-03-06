import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import FormCreate from './create'
import { useChangeStatusEffect } from '@hooks/Shared'
import employeeListConfig from '@lib/constants/list-configs/employee'

import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'

const EmployeeList = ({ employee, employeeeDetail ,...props }) => {
  const history = useHistory()

  useChangeStatusEffect(props.getEmployees, employeeeDetail.status)

  useEffect(() => {
    props.getEmployees()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') props.setItem(employee.selector.selected_items[0], 'DELETE')
  }

  const _handleRowClick = (e, item) => {
    history.push(`/employee/show/${item.id}`)
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid columns={2} style={{ 'margin-bottom': '1.2rem' }}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>Employees</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={10} tablet={12}>
            <Button
              color='teal'
              content='New Employee'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          config={employeeListConfig}
          duck={employeeDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <FormCreate/>
      <ModalDelete duckDetail={employeeDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ employee ,...state }) => ({
      employee,
      employeeeDetail: employeeDetailDuck.selectors.detail(state)

    }), {
      getEmployees: employeeDuck.creators.get,
      setItem     : employeeDetailDuck.creators.setItem
    })
)(EmployeeList)
