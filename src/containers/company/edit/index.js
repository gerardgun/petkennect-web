import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Breadcrumb, Button, Container, Grid } from 'semantic-ui-react'
import _defaultTo from 'lodash/defaultTo'

import Layout from '@components/Common/Layout'
import CompanyForm, { formId } from './../form'

import companyDetailDuck from '@reducers/company/detail'

import './../show/styles.scss'

function CompanyEdit({ companyDetail, ...props }) {
  const { item: company } = companyDetail

  const { id: companyId } = useParams()

  useEffect(() => {
    props.getCompany(companyId)
  }, [])

  const saved = [ 'POSTED', 'PUT' ].includes(companyDetail.status)
  const saving = [ 'POSTING', 'PUTTING' ].includes(companyDetail.status)

  return (
    <Layout>
      <Container className='company-show' fluid>
        <Grid className='div-client-info-edit-button' columns={2}>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Breadcrumb>
              <Breadcrumb.Section>
                <Link to='/company'>Companies</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active>{_defaultTo(company.legal_name, '-')}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-aligns'
            computer={8} mobile={11} tablet={8}>
            <Button
              as={Link} basic
              color='teal'
              content={saved ? 'Go back' : 'Cancel'} disabled={saving} to={`/company/${companyId}`}/>
            <Button
              color='teal' content='Save Changes'
              disabled={saving} form={formId} loading={saving}
              type='submit'/>
          </Grid.Column>
        </Grid>

        <CompanyForm/>

      </Container>
    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      companyDetail: companyDetailDuck.selectors.detail(state)
    }), {
      getCompany: companyDetailDuck.creators.get
    })
)(CompanyEdit)
