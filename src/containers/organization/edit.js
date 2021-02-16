import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Breadcrumb, Button, Container, Grid } from 'semantic-ui-react'
import _defaultTo from 'lodash/defaultTo'

import Layout from '@components/Common/Layout'
import OrganizationForm, { formId } from './form'

import organizationDetailDuck from '@reducers/organization/detail'

import './show/styles.scss'

function OrganizationEdit({ organizationDetail, ...props }) {
  const { item: organization } = organizationDetail

  const { organization: organizationId } = useParams()

  useEffect(() => {
    props.getOrganization(organizationId)
  }, [])

  const saved = [ 'POSTED', 'PUT' ].includes(organizationDetail.status)
  const saving = [ 'POSTING', 'PUTTING' ].includes(organizationDetail.status)

  return (
    <Layout>
      <Container className='organization-show' fluid>
        <Grid className='div-client-info-edit-button' columns={2}>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Breadcrumb>
              <Breadcrumb.Section>
                <Link to='/organization'>Organizations</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active>{_defaultTo(organization.legal_name, '-')}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-aligns'
            computer={8} mobile={11} tablet={8}>
            <Button
              as={Link} basic
              color='teal'
              content={saved ? 'Go back' : 'Cancel'} disabled={saving} to={`/organization/${organizationId}`}/>
            <Button
              color='teal' content='Save Changes'
              disabled={saving} form={formId} loading={saving}
              type='submit'/>
          </Grid.Column>
        </Grid>

        <OrganizationForm/>

      </Container>
    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      organizationDetail: organizationDetailDuck.selectors.detail(state)
    }), {
      getOrganization: organizationDetailDuck.creators.get
    })
)(OrganizationEdit)
