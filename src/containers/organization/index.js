import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import Table from '@components/Table'
import OrganizationFormModal from '@containers/organization/form/modal'

import organizationDuck from '@reducers/organization'
import organizationDetailDuck from '@reducers/organization/detail'

const Organization = props => {
  const {
    organization,
    organizationDetail
  } = props

  // For Modal Delete
  const [ open, { _handleOpen, _handleClose } ] = useModal()

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
    if(option === 'delete') {
      props.setItem(organization.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Organizations</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button color='teal' content='New Organization' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table duck={organizationDuck} onOptionClick={_handleOptionClick}/>
      </Segment>

      <OrganizationFormModal/>
      <ModalDelete
        duckDetail={organizationDetailDuck}
        onClose={_handleClose}
        open={open}/>
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
