import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Breadcrumb, Button, Container, Grid, Header, Icon, Image, Label } from 'semantic-ui-react'
import  _get from 'lodash/get'
import _defaultTo from 'lodash/defaultTo'

import Layout from '@components/Common/Layout'
import InputReadOnly from '@components/Common/InputReadOnly'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import { defaultImageUrl } from '@lib/constants'

import companyDetailDuck from '@reducers/company/detail'
import zipDetailDuck from '@reducers/zip/detail'

import './styles.scss'

function CompanyShow({ companyDetail, zipDetail, ...props }) {
  const { item: company } = companyDetail
  const { item: zip } = zipDetail

  const history = useHistory()
  const { id: companyId } = useParams()
  const [ open, { _handleOpen, _handleClose } ] = useModal() // For Modal Delete

  useEffect(() => {
    props.getCompany(companyId)
  }, [])

  useEffect(() => {
    if(companyDetail.status === 'DELETED')
      history.replace('/company')
  }, [ companyDetail.status ])

  const _handleDeleteBtnClick = () => {
    props.setCompany(company, 'DELETE')
    _handleOpen()
  }

  const comesfromOrganizationShowScreen = useMemo(() => Boolean(history.location.state), [])

  return (
    <Layout>
      <Container className='company-show' fluid>
        <Grid columns={2}>
          <Grid.Column>
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
              <Breadcrumb.Section active>{_defaultTo(company.legal_name, '-')}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
          <Grid.Column textAlign='right'>
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
          <InputReadOnly
            label='Legal name'
            value={_defaultTo(company.legal_name, '-')}/>
          <InputReadOnly
            label='Logo'
            value={<Image rounded size='mini' src={company.thumbnail || defaultImageUrl}/>}/>
          <InputReadOnly
            label='DBA'
            value={_defaultTo(company.dba, '-')}/>

          <InputReadOnly
            label='Subdomain prefix'
            value={_defaultTo(company.subdomain_prefix, '-')}/>
          <InputReadOnly
            label='Tax ID'
            value={_defaultTo(company.tax_id, '-')}/>
          <InputReadOnly
            label='Theme color'
            value={
              company.theme_color ? (
                <div>
                  <Label circular empty style={{ backgroundColor: company.theme_color }}/> {company.theme_color}
                </div>
              ) : '-'
            }/>
        </Grid>
        <br/>

        <Header as='h6' className='section-header' color='blue'>CONTACT DETAILS</Header>
        <Grid columns={3}>
          <InputReadOnly
            label='Phone'
            value={_get(company, 'phones[0]', '-')}/>
          <InputReadOnly
            label='Email'
            value={_defaultTo(company.email, '-')}/>
          <InputReadOnly
            label='WebSite'
            value={
              company.website ? <a href={company.website} rel='noopener noreferrer' target='_blank'>{company.website}</a> : '-'
            }/>
        </Grid>
        <br/>

        <Header as='h6' className='section-header' color='blue'>COMPANY ADDRESS</Header>
        <Grid columns={1}>
          <InputReadOnly
            label='First Address'
            value={_get(company, 'addresses[0]', '-')}/>
          <InputReadOnly
            label='Second Address'
            value={_get(company, 'addresses[1]', '-')}/>
        </Grid>
        <Grid columns={3}>
          <InputReadOnly
            label='Zip'
            value={_defaultTo(company.zip_code, '-')}/>
          <InputReadOnly
            label='Country'
            value={_defaultTo(zip.country_code, '-')}/>
          <InputReadOnly
            label='State'
            value={zip.state ? `${zip.state} (${zip.state_code})` : '-'}/>

          <InputReadOnly
            label='City'
            value={_defaultTo(zip.city, '-')}/>
          <InputReadOnly
            label='Division'
            value='-'/>
          <InputReadOnly
            label='Region'
            value='-'/>

          <InputReadOnly
            label='Multilocation'
            value={company.multilocation ? 'Yes' : 'No'}/>
          <InputReadOnly
            label='Active'
            value={company.status ? 'Yes' : 'No'}/>
        </Grid>

        <Header as='h6' className='section-header' color='blue'>Main Admin User</Header>
        <Grid columns={3}>
          <InputReadOnly
            label='User email'
            value={_defaultTo(company.main_admin_email, '-')}/>
          <InputReadOnly
            label='Names'
            value={_defaultTo(company.main_admin_first_name, '-')}/>
          <InputReadOnly
            label='Last names'
            value={_defaultTo(company.main_admin_last_name, '-')}/>
        </Grid>

      </Container>

      <ModalDelete
        duckDetail={companyDetailDuck}
        onClose={_handleClose}
        open={open}/>
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
