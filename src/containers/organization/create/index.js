import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { destroy } from 'redux-form'
import { Icon, Label, Menu, Tab } from 'semantic-ui-react'

import Layout from '@components/Layout'
import OrganizationSection, { formId } from './OrganizationSection'
import CompanySection from './CompanySection'

import organizationDetailDuck from '@reducers/organization/detail'
import organizationCompanyDuck from '@reducers/organization/company'

const OrganizationCreate = props => {
  const {
    organizationCompany,
    match,
    destroy,
    get,
    resetItem,
  } = props

  useEffect(() => {
    if(isUpdating) {
      get(match.params.organization)
    }

    return () => {
      destroy(formId)
      resetItem()
    }
  }, [])

  const isUpdating = match.params.organization

  return (
    <Layout>
      <Tab
        className='detail-view-tab'
        menu={{ color: 'teal', tabular: true, attached: true }}
        panes={[
          {
            menuItem: { key: 'user', icon: 'factory', content: 'Organization Info' },
            render: () => <OrganizationSection />,
          },
          {
            menuItem: (
              <Menu.Item key='pets' disabled={!isUpdating}>
                <Icon name='building' /> Companies <Label>{organizationCompany.items.length}</Label>
              </Menu.Item>
            ),
            render: () => <CompanySection />,
          },
        ]} />
    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      organizationDetail: organizationDetailDuck.selectors.detail(state),
      organizationCompany: organizationCompanyDuck.selectors.list(state),
    }),
    {
      destroy,
      get      : organizationDetailDuck.creators.get,
      resetItem: organizationDetailDuck.creators.resetItem,
    }
  ),
)(OrganizationCreate)
