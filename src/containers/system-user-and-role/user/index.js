import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import FormCreate from './user-form'
import AlertModal from './alert-modal'
import { useChangeStatusEffect } from '@hooks/Shared'
import userListConfig from '@lib/constants/list-configs/system-user-and-role/user'

import systemUserDuck from '@reducers/system-user-and-role/user'
import systemUserDetailDuck from '@reducers/system-user-and-role/user/detail'

const UserList = ({ systemUser, systemUserDetail ,...props }) => {
  const history = useHistory()

  useChangeStatusEffect(props.getSystemUsers, systemUserDetail.status)

  useEffect(() => {
    props.getSystemUsers()
  }, [])

  const _handleActionClick = action => {
    if(action === 'create')
      props.setItem(null, 'CREATE')
  }

  const _handleDropdownOptionClick = (option,item) => {
    switch (option) {
      case 'edit_user':
        props.setItem(item.id, 'UPDATE')
        break
      case 'terminate_access':
        props.setItem(null, 'READ')
        break
      case 'view_employee_profile':
        history.push(`/manager-dashboard/employee-directory/${item.id}/personal-detail`)
        break
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid columns={2} style={{ 'margin-bottom': '1.2rem' }}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>System Users</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={10} tablet={12}>
            <Button
              color='teal'><Link to={'/role'} style={{ color: 'white' }}>System Roles</Link></Button>
          </Grid.Column>
        </Grid>
        <Table
          config={userListConfig}
          duck={systemUserDuck}
          onActionClick={_handleActionClick}
          onRowDropdownChange={_handleDropdownOptionClick}/>
      </Segment>
      <AlertModal/>
      <FormCreate/>
      <ModalDelete duckDetail={systemUserDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => {
      const systemUserDetail = systemUserDetailDuck.selectors.detail(state)

      return {
        systemUserDetail,
        systemUser: systemUserDuck.selectors.list(state)
      }
    }, {
      getSystemUsers: systemUserDuck.creators.get,
      setItem       : systemUserDetailDuck.creators.setItem
    })
)(UserList)

