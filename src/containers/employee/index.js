import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Input } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import Form from './Form'

import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'
import { useChangeStatusEffect, useDebounceText } from '@hooks/Shared'

const EmployeeList = ({ employee,employeeeDetail ,...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  const { status } = employeeeDetail

  const { _handleChangeText } = useDebounceText((text)=> {
    props.setFilters({ search: text })
    props.getEmployees()
  })

  useEffect(() => {
    props.getEmployees()
  }, [])

  useChangeStatusEffect(props.getEmployees,status)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }
  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleRowOptionClick = (option, item) => {
    if(option === 'edit') {
      props.setItem(item, 'UPDATE')
    } else if(option === 'delete') {
      props.setItem(item)
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column width={4}>
            <Header as='h2' className='cls-MainHeader'>Employees</Header>
          </Grid.Column >
          <Grid.Column textAlign='right' width={12}>
            <Input
              icon='search' onChange={_handleChangeText}
              placeholder='Search...'/>
            <Button className='cls-cancelButton' content='Download' disabled/>
            <Button
              className='cls-cancelButton'
              content='Filter' disabled icon='filter'
              labelPosition='left'/>
            {
              employee.selector.selected_items.length > 0 && (<Button color='google plus' content='Delete' onClick={_handleOpen}/>)
            }
            <Button
              as={Link} className='cls-saveButton' color='teal'
              content='New Employee'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={employeeDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </Segment>
      <Form/>
      <ModalDelete
        duck={employeeDuck}
        duckDetail={employeeDetailDuck}
        onClose={_handleClose}
        open={open}/>

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
      setItem     : employeeDetailDuck.creators.setItem,
      setFilters  : employeeDuck.creators.setFilters
    })
)(EmployeeList)
