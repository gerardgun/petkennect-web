import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import Form from './Form'

import organizationDetailDuck from '@reducers/organization/detail'
import organizationCompanyDuck from '@reducers/organization/company'
import companyDetailDuck from '@reducers/company/detail'

const CompanySection = ({ company, companyDetail, ...props }) => {
  // For Modal Delete
  const [ open, { handleOpen, handleClose } ] = useModal()

  useEffect(() => {
    if(companyDetail.status === 'POSTED' || companyDetail.status === 'PUT' || companyDetail.status === 'DELETED') {
      props.getOrganization(props.match.params.organization)
    }
  }, [ companyDetail.status ])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleRowOptionClick = (option, item) => {
    if(option === 'delete') {
      props.setItem(item)
      handleOpen()
    } else if(option === 'edit') {
      props.setItem(item, 'UPDATE')
    }
  }

  return (
    <Grid className='form-primary'>
      <Grid.Column>
        <Segment className='segment-content' padded='very'>
          <Grid className='segment-content-header' columns={2}>
            <Grid.Column>
              <Header as='h2'>Companies</Header>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button content='Download' disabled icon='cloud download' labelPosition='left' />
              <Button color='teal' content='New Company' onClick={_handleAddBtnClick} />
            </Grid.Column>
          </Grid>
          <Table
            duck={organizationCompanyDuck}
            onRowClick={_handleRowClick}
            onRowOptionClick={_handleRowOptionClick} />
        </Segment>

        <Form />

        <ModalDelete
          duckDetail={companyDetailDuck}
          onClose={handleClose}
          open={open} />
      </Grid.Column>
    </Grid>
  )
}

export default compose(
  withRouter,
  connect(
    state => ({
      company: organizationCompanyDuck.selectors.list(state),
      companyDetail: companyDetailDuck.selectors.detail(state),
    }),
    {
      getOrganization: organizationDetailDuck.creators.get,
      setItem        : companyDetailDuck.creators.setItem,
    }
  )
)(CompanySection) 
