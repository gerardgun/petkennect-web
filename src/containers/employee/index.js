import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Input } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import FormCreate from './create'

import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'
import { useChangeStatusEffect, useDebounceText } from '@hooks/Shared'

const EmployeeList = ({ /* employee,*/ employeeeDetail ,...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  const { status } = employeeeDetail
  const history  = useHistory()

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

  const _handleRowOptionClick = (option, item) => {
    if(option === 'edit') {
      history.push(`employee/edit/${item.id}`)
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
            <Header as='h2'>Employees</Header>
          </Grid.Column >
          <Grid.Column textAlign='right' width={12}>
            <Button
              as={Link} className='cls-saveButton' color='teal'
              content='New Employee'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
          <Grid.Column textAlign='left' width={2} >
            <Button disabled icon='ellipsis vertical'/>
          </Grid.Column>
          <Grid.Column textAlign='right' width={14}>
            <Input
              icon='search' iconPosition='left'
              onChange={_handleChangeText} placeholder='Search...'/>
            <Button
              className='ml16' content='Filter' disabled
              icon='filter'
              labelPosition='left'/>
          </Grid.Column>
        </Grid>
        <Table
          duck={employeeDuck}
          onRowOptionClick={_handleRowOptionClick}/>
      </Segment>
      <FormCreate/>
      <ModalDelete
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
