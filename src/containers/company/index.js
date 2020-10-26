import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import Table from '@components/Table'
import CompanyFormModal from '@containers/company/form/modal'

import companyDuck from '@reducers/company'
import companyDetailDuck from '@reducers/company/detail'

const Company = props => {
  const {
    company,
    companyDetail
  } = props

  // For Modal Delete
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getCompanies()
  }, [])

  useEffect(() => {
    if(companyDetail.status === 'POSTED' || companyDetail.status === 'PUT' || companyDetail.status === 'DELETED')
      props.getCompanies()
  }, [ companyDetail.status ])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(company.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={11} tablet={8}>
            <Header as='h2'>Companies</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={11} tablet={8}>
            <Button color='teal' content='New Company' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>

        <Table
          duck={companyDuck}
          onOptionClick={_handleOptionClick}/>

        <CompanyFormModal/>
        <ModalDelete
          duckDetail={companyDetailDuck}
          onClose={_handleClose}
          open={open}/>

      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    ({ company, ...state }) => ({
      company,
      companyDetail: companyDetailDuck.selectors.detail(state)
    }),
    {
      getCompanies: companyDuck.creators.get,
      setItem     : companyDetailDuck.creators.setItem
    }
  )
)(Company)
