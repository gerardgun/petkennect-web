import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Form, Container } from 'semantic-ui-react'
import _defaultTo from 'lodash/defaultTo'

import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'

import employeeDuck from '@reducers/employee'
import employeeDetailDuck from '@reducers/employee/detail'

function EmployeeShow({ employeeDetail , ...props }) {
  const { item: employee } = employeeDetail
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const history = useHistory()

  useEffect(()=> {
    if(employeeDetail.status === 'DELETED')
      history.replace('/employee')
  }, [ employeeDetail.status ])
  const _handleDeleteClick = () => {
    _handleOpen()
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
          <Form.Input label='First Name' readOnly value={_defaultTo(employee.first_name, '-')}/>
          <Form.Input label='Last Name' readOnly value={_defaultTo(employee.last_name, '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Email' readOnly value={_defaultTo(employee.email, '-')}/>
          <Form.Input label='Title' readOnly value={_defaultTo(employee.title_name, '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Location' readOnly value={employee.location ? `${employee.location_code} - ${employee.location_name}` : ''}/>
          <Form.Input label='Role' readOnly value={_defaultTo(employee.role_name, '-')}/>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Status' readOnly value={_defaultTo(employee.is_active ? 'Active' : 'Inactive')}/>
        </Form.Group>
      </Form>

      <ModalDelete
        duckDetail={employeeDetailDuck}
        onClose={_handleClose}
        open={open}/>

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
