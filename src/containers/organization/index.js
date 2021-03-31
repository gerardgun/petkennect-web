import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import OrganizationFormModal from '@containers/organization/form/modal'
import organizationListConfig from '@lib/constants/list-configs/organization'

import organizationDuck from '@reducers/organization'
import organizationDetailDuck from '@reducers/organization/detail'

const Organization = props => {
  const {
    organization,
    organizationDetail
  } = props

  // For Modal Delete

  useEffect(() => {
    props.getOrganizations()
  }, [])

  useEffect(() => {
    if(organizationDetail.status === 'PUT' || organizationDetail.status === 'DELETED')
      props.getOrganizations()
  }, [ organizationDetail.status ])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(organization.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Header as='h2'>Organizations</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={11} tablet={8}>
            <Button color='teal' content='New Organization' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table config={organizationListConfig} duck={organizationDuck} onOptionClick={_handleOptionClick}/>
      </Segment>

      <OrganizationFormModal/>
      <ModalDelete duckDetail={organizationDetailDuck}/>
    </Layout>
  )
}

export default compose(
  connect(
    ({ organization, ...state }) => ({
      organization,
      organizationDetail: organizationDetailDuck.selectors.detail(state)
    }),
    {
      getOrganizations: organizationDuck.creators.get,
      setItem         : organizationDetailDuck.creators.setItem
    }
  )
)(Organization)
