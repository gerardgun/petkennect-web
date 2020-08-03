import React, { useEffect } from 'react'
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

import organizationDetailDuck from '@reducers/organization/detail'
import organizationCompanyDuck from '@reducers/organization/company'
import zipDetailDuck from '@reducers/zip/detail'

import './styles.scss'

function OrganizationShow({ organizationDetail, organizationCompany, zipDetail, ...props }) {
  const { item: organization } = organizationDetail
  const { items: companies } = organizationCompany
  const { item: zip } = zipDetail

  const history = useHistory()
  const { organization: organizationId } = useParams()
  const [ open, { _handleOpen, _handleClose } ] = useModal() // For Modal Delete

  useEffect(() => {
    props.getOrganization(organizationId)
  }, [])

  useEffect(() => {
    if(organizationDetail.status === 'DELETED')
      history.replace('/organization')
  }, [ organizationDetail.status ])

  const _handleDeleteBtnClick = () => {
    props.setOrganization(organization, 'DELETE')
    _handleOpen()
  }

  return (
    <Layout>
      <Container className='organization-show' fluid>
        <Grid columns={2}>
          <Grid.Column>
            <Breadcrumb>
              <Breadcrumb.Section>
                <Link to='/organization'>Organizations</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider/>
              <Breadcrumb.Section active>{_defaultTo(organization.legal_name, '-')}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              as={Link} basic icon='edit outline'
              to={`/organization/${organizationId}/edit`}/>
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
            value={_defaultTo(organization.legal_name, '-')}/>
          <InputReadOnly
            label='Logo'
            value={<Image rounded size='mini' src={organization.thumbnail || defaultImageUrl}/>}/>
          <InputReadOnly
            label='DBA'
            value={_defaultTo(organization.dba, '-')}/>

          <InputReadOnly
            label='Tax ID'
            value={_defaultTo(organization.tax_id, '-')}/>
        </Grid>
        <br/>

        <Header as='h6' className='section-header' color='blue'>CONTACT DETAILS</Header>
        <Grid columns={3}>
          <InputReadOnly
            label='Phone'
            value={_get(organization, 'phones[0]', '-')}/>
          <InputReadOnly
            label='Email'
            value={_defaultTo(organization.email, '-')}/>
          <InputReadOnly
            label='WebSite'
            value={
              organization.website ? <a href={organization.website} rel='noopener noreferrer' target='_blank'>{organization.website}</a> : '-'
            }/>
        </Grid>
        <br/>

        <Header as='h6' className='section-header' color='blue'>Organization ADDRESS</Header>
        <Grid columns={1}>
          <InputReadOnly
            label='First Address'
            value={_get(organization, 'addresses[0]', '-')}/>
          <InputReadOnly
            label='Second Address'
            value={_get(organization, 'addresses[1]', '-')}/>
        </Grid>
        <Grid columns={3}>
          <InputReadOnly
            label='Zip'
            value={_defaultTo(organization.zip_code, '-')}/>
          <InputReadOnly
            label='Country'
            value={_defaultTo(zip.country_code, '-')}/>
          <InputReadOnly
            label='State'
            value={zip.state ? `${zip.state} (${zip.state_code})` : '-'}/>

          <InputReadOnly
            label='City'
            value={_defaultTo(zip.city, '-')}/>
        </Grid>

        {
          companies.length > 0 && (
            <>
              <Header as='h6' className='section-header' color='blue'>COMPANIES</Header>
              {
                companies.map((item, index) => (
                  <Label
                    as={Link} key={index}
                    size='medium' style={{ marginBottom: '0.3rem', fontWeight: 400 }}
                    to={{
                      pathname: `/company/${item.id}`,
                      state   : {
                        organization           : organizationId,
                        organization_legal_name: organization.legal_name
                      }
                    }} >
                    <Image avatar spaced='right' src={item.thumbnail || defaultImageUrl}/>
                    {item.legal_name}
                  </Label>
                ))
              }
            </>
          )
        }

      </Container>

      <ModalDelete
        duckDetail={organizationDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </Layout>
  )
}

export default compose(
  connect(
    ({ ...state }) => ({
      organizationDetail : organizationDetailDuck.selectors.detail(state),
      organizationCompany: organizationCompanyDuck.selectors.list(state),
      zipDetail          : zipDetailDuck.selectors.detail(state)
    }), {
      getOrganization: organizationDetailDuck.creators.get,
      setOrganization: organizationDetailDuck.creators.setItem
    })
)(OrganizationShow)
