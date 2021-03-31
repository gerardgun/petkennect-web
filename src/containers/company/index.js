import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import CompanyFormModal from '@containers/company/form/modal'
import companyListConfig from '@lib/constants/list-configs/company'

import companyDuck from '@reducers/company'
import companyDetailDuck from '@reducers/company/detail'

const Company = props => {
  const {
    company,
    companyDetail
  } = props

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
    if(option === 'delete')
      props.setItem(company.selector.selected_items[0], 'DELETE')
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
          config={companyListConfig}
          duck={companyDuck}
          onOptionClick={_handleOptionClick}/>

        <CompanyFormModal/>
        <ModalDelete duckDetail={companyDetailDuck}/>

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
