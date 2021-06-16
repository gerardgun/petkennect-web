import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useLocation } from 'react-router-dom'
import { Grid,Segment, Card, Header, Button, Icon } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'
import ManagerShortcut from '../manager-shortcut/manager-shortcut'
import HeaderLink from '../manager-shortcut/header-link'

import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import { useChangeStatusEffect } from '@hooks/Shared'
import departmentRoleConfig from '@lib/constants/list-configs/manager-dashboard/department-role'
import departmentRoleDuck from '@reducers/manager-dashboard/department-role'
import departmentRoleDetailDuck from '@reducers/manager-dashboard/department-role/detail'
import DepartmentRoleForm from './department-role-form'

const DepartmentRoles = ({ departmentRoleDetail, ...props }) => {
  useChangeStatusEffect(props.getEmployeeTitles, departmentRoleDetail.status)
  const location = useLocation()

  useEffect(() => {
    props.getDepartmentRoles()
  }, [])

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
            <Card fluid style={{ height: '600px' }}>
              <div className='ph32 pt32'>
                <div className='flex justify-between align-center'>
                  <Header as='h3' className='mt8'>Manage Departments {' & '} Roles for Locations</Header>
                  <Button color='teal' onClick={_handleCreate}><Icon name='plus'/>Add Department</Button>
                </div>
                <div className='mt40'>
                  <Table
                    config={departmentRoleConfig}
                    duck={departmentRoleDuck}
                    onRowButtonClick={_handleButtonClick}
                    onRowClick={_handleClick}/>
                </div>
              </div>
            </Card>
          </Grid.Column>

        </Grid>

      </Segment>
      <ModalDelete duckDetail={departmentRoleDetailDuck}/>
      <DepartmentRoleForm/>
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
  )
)(DepartmentRoles)

