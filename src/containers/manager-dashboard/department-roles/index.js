import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useLocation } from 'react-router-dom'
import { reduxForm, FieldArray } from 'redux-form'
import { Grid,Segment, Card, Header, Button, Icon, Form } from 'semantic-ui-react'
import FormError from '@components/Common/FormError'

import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import { useChangeStatusEffect } from '@hooks/Shared'

import Layout from '@components/Common/Layout'
import ManagerShortcut from '../manager-shortcut/manager-shortcut'
import HeaderLink from '../manager-shortcut/header-link'

import departmentRoleConfig from '@lib/constants/list-configs/manager-dashboard/department-role'
import departmentRoleDuck from '@reducers/manager-dashboard/department-role'
import departmentRoleDetailDuck from '@reducers/manager-dashboard/department-role/detail'
import DepartmentRoleForm from './department-role-form'
import DepartmentRole from './../employee-directory/form/department-role'

import './styles.scss'

export const formId = 'manager-department-role-form'

const DepartmentRoles = ({ departmentRoleDetail, ...props }) => {
  const {
    error, handleSubmit, reset // redux-form
  } = props

  useChangeStatusEffect(props.getEmployeeTitles, departmentRoleDetail.status)
  const location = useLocation()

  useEffect(() => {
    props.getDepartmentRoles()
  }, [])

  const _handleSubmit = () => {
  }

  const [ showSideBar ] =  useState(location.state ? !location.state.isSideBarHidden : false)

  const [ sidebarHidden, setSidebarHidden ] = useState()

  const _onHandleSideBar = (sidebar)=>{
    setSidebarHidden(sidebar)
  }

  const _handleCreate = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleButtonClick = (button,item) =>{
    props.setItem(item,'DELETE')
  }

  const _handleClick = (e, item) => {
    props.setItem(item.id, 'UPDATE')
  }

  return (
    <Layout showSidebar={showSideBar} sidebarHandle={_onHandleSideBar}>
      <Segment className='segment-dashboard-content' >
        <Grid>
          <Grid.Column className='pb12 pt0 ' computer={16}>
            <HeaderLink sideBarHidden={sidebarHidden}/>
          </Grid.Column>
          <Grid.Column style={{ width: '17%' }}>
            <ManagerShortcut/>
          </Grid.Column>
          <Grid.Column className='pl0' style={{ width: '83%' }}>
            <Card fluid style={{ minHeight: '600px' }}>
              <div className='ph20 pt32 manager-department-role-style'>
                <div className='flex justify-between align-center'>
                  <Header as='h3' className='mt8'>Manage Departments {' & '} Roles</Header>
                </div>
                <div className='mt40  input-field-padding'>
                <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
            <>
            <Grid>
                <Grid.Column width={16}>
                  <Header as='h6' className='section-header' color='teal'>Department {' & '} Role</Header>
                  <FieldArray
                    component={DepartmentRoleForm}
                    name='department_role'
                    sidebarHidden={sidebarHidden}/>
                </Grid.Column>
              </Grid>
                  </>
            {
              error && (
                <Form.Group widths='equal'>
                  <Form.Field>
                    <FormError message={error}/>
                  </Form.Field>
                </Form.Group>
              )
            }
          </Form>
                  {/* <Table
                    config={departmentRoleConfig}
                    duck={departmentRoleDuck}
                    onRowButtonClick={_handleButtonClick}
                    onRowClick={_handleClick}/> */}
                </div>
              </div>
            </Card>
          </Grid.Column>

        </Grid>

      </Segment>
      <ModalDelete duckDetail={departmentRoleDetailDuck}/>
      {/* <DepartmentRoleForm/> */}
    </Layout>
  )
}

export default  compose(
  connect(
    (state) => {
      const departmentRoleDetail = departmentRoleDetailDuck.selectors.detail(state)

      return {
        departmentRoleDetail,
        departmentRole: departmentRoleDuck.selectors.list(state)
      }
    },
    {
      getDepartmentRoles: departmentRoleDuck.creators.get,
      setItem           : departmentRoleDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true
  })
)(DepartmentRoles)

