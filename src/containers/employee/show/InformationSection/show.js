import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Form, Container } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'

import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'

function EmployeeShow({ employeeDetail , ...props }) {
  const { item: employee } = employeeDetail

  const history = useHistory()

  useEffect(() => {
    if(employeeDetail.status === 'DELETED')
      history.replace('/employee')
  }, [ employeeDetail.status ])

  const _handleDeleteClick = () => {
    props.setEmployee(employeeDetail.item, 'DELETE')
  }

  const _handleEditBtnClick = () => {
    props.setEmployee(employeeDetail, 'UPDATE')
  }

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Employee</Header>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Button
            basic icon='edit outline' onClick={_handleEditBtnClick}/>
          <Button
            basic
            color='red'
            icon='trash alternate outline' onClick={_handleDeleteClick}/>
        </Grid.Column>
      </Grid>
      <Form className='petkennect-profile-body-content'>
        <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
        <Form.Group widths={2}>
          <Form.Input label='First Name' readOnly value={employee.first_name ? employee.first_name : '-'}/>
          <Form.Input label='Last Name' readOnly value={employee.last_name ? employee.last_name : '-'}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Email' readOnly value={employee.email ? employee.email : '-'}/>
          <Form.Input label='Title' readOnly value={employee.title_name ? employee.title_name : '-'}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Location' readOnly value={employee.location ? `${employee.location_code} - ${employee.location_name}` : ''}/>
          <Form.Input label='Role' readOnly value={employee.role_name ? employee.role_name : '-'}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Status' readOnly value={employee.is_active ? 'Active' : 'Inactive'}/>
        </Form.Group>
      </Form>

      <ModalDelete duckDetail={employeeDetailDuck}/>

    </Container>
  )
}

export default compose(
  connect(
    state => ({
      employeeDetail: employeeDetailDuck.selectors.detail(state)
    }), {
      getEmployee: employeeDetailDuck.creators.get,
      setEmployee: employeeDetailDuck.creators.setItem,
      resetItem  : employeeDetailDuck.creators.resetItem,
      setFilters : employeeDuck.creators.setFilters
    })
)(EmployeeShow)
