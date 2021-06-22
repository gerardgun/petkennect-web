import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import FormCreate from './user-form'
import { useChangeStatusEffect } from '@hooks/Shared'
import userListConfig from '@lib/constants/list-configs/user'

import systemUserDuck from '@reducers/system-user'
import systemUserDetailDuck from '@reducers/system-user/detail'

const UserList = ({ systemUser, systemUserDetail ,...props }) => {
  const history = useHistory()

  useChangeStatusEffect(props.getSystemUsers, systemUserDetail.status)

  useEffect(() => {
    props.getSystemUsers()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleDropdownOptionClick = (option,item) => {
    switch (option) {
      case 'edit_user':
        props.setItem(item.id, 'UPDATE')
        break
      case 'terminate_access':
        break
      case 'view_employee_file':
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
              color='teal'
              content='Add User'
              icon='add'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          config={userListConfig}
          duck={systemUserDuck}
          onRowDropdownChange={_handleDropdownOptionClick}/>
      </Segment>

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

