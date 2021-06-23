import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import { useChangeStatusEffect } from '@hooks/Shared'
import roleListConfig from '@lib/constants/list-configs/system-user-and-role/role'

import RoleForm from './role-form'

import systemRoleDuck from '@reducers/system-user-and-role/role'
import systemRoleDetailDuck from '@reducers/system-user-and-role/role/detail'

const RoleList = ({ systemRole, systemRoleDetail ,...props }) => {
  const history = useHistory()

  useChangeStatusEffect(props.getSystemRoles, systemRoleDetail.status)

  useEffect(() => {
    props.getSystemRoles()
  }, [])

  const _handleActionClick = action => {
    if(action === 'create')
      props.setItem(null, 'CREATE')
  }

  const _handleRowButtonClick = (button, reason) => {
    if(button === 'delete')
      props.setItem(reason, 'DELETE')

    else if(button === 'edit')
      props.setItem(reason, 'UPDATE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid columns={2} style={{ 'margin-bottom': '1.2rem' }}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>System Roles</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={10} tablet={12}>
            <Button
              color='teal'><Link to={'/user'} style={{ color: 'white' }}>System Users</Link></Button>
          </Grid.Column>
        </Grid>
        <Table
          config={roleListConfig}
          duck={systemRoleDuck}
          onActionClick={_handleActionClick}
          onRowButtonClick={_handleRowButtonClick}/>
      </Segment>
      <ModalDelete duckDetail={systemRoleDetailDuck}/>
      <RoleForm/>
    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => {
      const systemRoleDetail = systemRoleDetailDuck.selectors.detail(state)

      return {
        systemRoleDetail,
        systemRole: systemRoleDuck.selectors.list(state)
      }
    }, {
      getSystemRoles: systemRoleDuck.creators.get,
      setItem       : systemRoleDetailDuck.creators.setItem
    })
)(RoleList)

