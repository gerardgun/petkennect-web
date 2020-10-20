import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Container } from 'semantic-ui-react'

import employeeDetailDuck from '@reducers/employee/detail'
import EmployeeForm, { formId } from './../form'

function EmployeeEditForm({ employeeDetail, ...props }) {
  const { item: employee } = employeeDetail

  const _handleCancelBtnClick = () => {
    props.setEmployee(employee, 'READ')
  }

  const saved = [ 'PATCHED' ].includes(employeeDetail.status)
  const saving = [ 'PATCHING' ].includes(employeeDetail.status)

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Update Employee</Header>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Button
            basic className='w120' color='teal'
            content={saved ? 'Go back' : 'Cancel'} disabled={saving} onClick={_handleCancelBtnClick}/>
          <Button
            color='teal' content='Save Changes'
            disabled={saving} form={formId} loading={saving}
            type='submit'/>
        </Grid.Column>
      </Grid>
      <div className='petkennect-profile-body-content'>
        <EmployeeForm/>
      </div>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      employeeDetail: employeeDetailDuck.selectors.detail(state)
    }), {
      setEmployee: employeeDetailDuck.creators.setItem
    }
  )
)(EmployeeEditForm)

