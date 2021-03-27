import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Breadcrumb, Button, Container, Grid, Header, Icon, Image, Label } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import InputReadOnly from '@components/Common/InputReadOnly'
import ModalDelete from '@components/Modal/Delete'
import { defaultImageUrl } from '@lib/constants'

import companyDetailDuck from '@reducers/company/detail'
import zipDetailDuck from '@reducers/zip/detail'

import './styles.scss'

function CompanyShow({ companyDetail, zipDetail, ...props }) {
  const { item: company } = companyDetail
  const { item: zip } = zipDetail

  const history = useHistory()
  const { id: companyId } = useParams()

  useEffect(() => {
    props.getCompany(companyId)
  }, [])

  useEffect(() => {
    if(companyDetail.status === 'DELETED')
      history.replace('/company')
  }, [ companyDetail.status ])

  const _handleDeleteBtnClick = () => {
    props.setCompany(company, 'DELETE')
  }

  const comesfromOrganizationShowScreen = useMemo(() => Boolean(history.location.state), [])

  return (
    <Layout>
      <Container className='company-show' fluid>
        <Grid columns={2}>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Breadcrumb>
              {
                comesfromOrganizationShowScreen ? (
                  <Breadcrumb.Section>
                    <Link to={`/organization/${history.location.state.organization}`}>{history.location.state.organization_legal_name}</Link>
                  </Breadcrumb.Section>
                ) : (
                  <Breadcrumb.Section>
                    <Link to='/company'>Companies</Link>
                  </Breadcrumb.Section>
                )
              }
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active>{company.legal_name ? company.legal_name :  '-'}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-aligns'
            computer={8} mobile={11} tablet={8}>
            <Button
              as={Link} basic icon='edit outline'
              to={`/company/${companyId}/edit`}/>
            <Button basic icon onClick={_handleDeleteBtnClick}>
              <Icon color='red' name='trash alternate outline'/>
            </Button>
            {/* <Button basic icon='ellipsis vertical'/> */}
          </Grid.Column>
        </Grid>

        <Header as='h6' className='section-header' color='blue'>BASIC INFORMATION</Header>
        <Grid columns={3}>
          <Grid.Column computer={5} mobile={16} tablet={8}>
            <InputReadOnly
              label='Legal name'
              value={company.legal_name ? company.legal_name  :  '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={8}>
            <InputReadOnly
              label='Logo'
              value={<Image rounded size='mini' src={company.thumbnail || defaultImageUrl}/>}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={8}>
            <InputReadOnly
              label='DBA'
              value={company.dba ? company.dba :  '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={8}>
            <InputReadOnly
              label='Subdomain prefix'
              value={company.subdomain_prefix ? company.subdomain_prefix  :  '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={8}>
            <InputReadOnly
              label='Tax ID'
              value={company.tax_id ? company.tax_id :   '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={8}>
            <InputReadOnly
              label='Theme color'
              value={
                company.theme_color ? (
                  <div>
                    <Label circular empty style={{ backgroundColor: company.theme_color }}/> {company.theme_color}
                  </div>
                ) : '-'
              }/>
          </Grid.Column>
        </Grid>
        <br/>

        <Header as='h6' className='section-header' color='blue'>CONTACT DETAILS</Header>
        <Grid columns={3}>
          <Grid.Column computer={5} mobile={16} tablet={16}>
            <InputReadOnly
              label='Phone'
              value={company.phones ? company.phones[0] : '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={16}>
            <InputReadOnly
              label='Email'
              value={company.email ? company.email : '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={16}>
            <InputReadOnly
              label='WebSite'
              value={
                company.website ? <a href={company.website} rel='noopener noreferrer' target='_blank'>{company.website}</a> : '-'
              }/>
          </Grid.Column>
        </Grid>
        <br/>

        <Header as='h6' className='section-header' color='blue'>COMPANY ADDRESS</Header>
        <Grid columns={1}>
          <InputReadOnly
            label='First Address'
            value={company.addresses ? company.addresses[0] : '-'}/>
          <InputReadOnly
            label='Second Address'
            value={company.addresses ? company.addresses[1] : '-'}/>
        </Grid>
        <Grid columns={3}>
          <Grid.Column computer={5} mobile={16} tablet={5}>
            <InputReadOnly
              label='Zip'
              value={company.zip_code ? company.zip_code :  '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={5}>
            <InputReadOnly
              label='Country'
              value={zip.country_code ? zip.country_code :  '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={5}>
            <InputReadOnly
              label='State'
              value={zip.state ? `${zip.state} (${zip.state_code})` : '-'}/>
          </Grid.Column>

          <Grid.Column computer={5} mobile={16} tablet={5}>
            <InputReadOnly
              label='City'
              value={zip.city ? zip.city :   '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={5}>
            <InputReadOnly
              label='Division'
              value='-'/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={5}>
            <InputReadOnly
              label='Region'
              value='-'/>
          </Grid.Column>

          <Grid.Column computer={5} mobile={16} tablet={5}>
            <InputReadOnly
              label='Multilocation'
              value={company.multilocation ? 'Yes' : 'No'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={5}>
            <InputReadOnly
              label='Active'
              value={company.status ? 'Yes' : 'No'}/>
          </Grid.Column>
        </Grid>

        <Header as='h6' className='section-header' color='blue'>Main Admin User</Header>
        <Grid columns={3}>
          <Grid.Column computer={5} mobile={16} tablet={16}>
            <InputReadOnly
              label='User email'
              value={company.main_admin_email ? company.main_admin_email : '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={8}>
            <InputReadOnly
              label='Names'
              value={company.main_admin_first_name ? company.main_admin_first_name :  '-'}/>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16} tablet={8}>
            <InputReadOnly
              label='Last names'
              value={company.main_admin_last_name ? company.main_admin_last_name :   '-'}/>
          </Grid.Column>
        </Grid>

      </Container>

      <ModalDelete duckDetail={companyDetailDuck}/>
    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      companyDetail: companyDetailDuck.selectors.detail(state),
      zipDetail    : zipDetailDuck.selectors.detail(state)
    }), {
      getCompany: companyDetailDuck.creators.get,
      setCompany: companyDetailDuck.creators.setItem
    })
)(CompanyShow)
