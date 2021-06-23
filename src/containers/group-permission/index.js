import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Grid, Header, Segment, Form, Input } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import { useChangeStatusEffect } from '@hooks/Shared'
import groupPermissionConfig from '@lib/constants/list-configs/group-permission'

import groupPermissionDuck from '@reducers/group-permission'
import groupPermissionDetailDuck from '@reducers/group-permission/detail'

export const formId = 'group-permission-form'

const GroupPermission = ({ groupPermission, groupPermissionDetail ,...props }) => {
  const history = useHistory()

  useChangeStatusEffect(props.getGroupPermissions, groupPermissionDetail.status)

  useEffect(() => {
    props.getGroupPermissions()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') props.setItem(groupPermission.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid columns={2} style={{ 'margin-bottom': '1.2rem' }}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>Group Permissions</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={10} tablet={12}>
            <Button
              color='teal'
              content='New Group'
              icon='add'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column className='pb8 pt0' width={10}>
            <Form id={formId}>
              <Form.Group>
                <Field
                  component={FormField}
                  control={Input}
                  icon='search' iconPosition='left'
                  onChange=''
                  placeholder='Search' type='search'/>
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align pb8 pt0' computer={6}>
            <Button
              color='teal'
              content='Save'/>
          </Grid.Column>
        </Grid>
        <Table
          config={groupPermissionConfig}
          duck={groupPermissionDuck}
          onOptionClick={_handleOptionClick}/>
      </Segment>

      <ModalDelete duckDetail={groupPermissionDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => {
      const groupPermissionDetail = groupPermissionDetailDuck.selectors.detail(state)

      return {
        groupPermissionDetail,
        groupPermission: groupPermissionDuck.selectors.list(state)
      }
    }, {
      getGroupPermissions: groupPermissionDuck.creators.get,
      setItem            : groupPermissionDetailDuck.creators.setItem
    }),
    reduxForm({
      form              : formId,
      enableReinitialize: true
  })
)(GroupPermission)

