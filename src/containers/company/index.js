import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Layout'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import Table from '@components/Table'
import Form from '@containers/organization/create/CompanySection/Form'

import companyDuck from '@reducers/company'
import companyDetailDuck from '@reducers/company/detail'

const Company = props => {
  const {
    // company,
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

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleRowOptionClick = (option, item) => {
    if(option === 'delete') {
      props.setItem(item)
      _handleOpen()
    } else if(option === 'edit') {
      props.setItem(item, 'UPDATE')
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Companies</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              content='Download' disabled icon='cloud download'
              labelPosition='left'/>
            <Button color='teal' content='New Company' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={companyDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>

        <Form/>

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
