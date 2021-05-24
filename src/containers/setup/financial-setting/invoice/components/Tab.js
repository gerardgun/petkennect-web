import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'

const items = [
  {
    label: 'Services & Activities',
    to   : '/setup/financial/invoice/services-activities'
  },
  {
    label: 'Add-On Services',
    to   : '/setup/financial/invoice/add-ons'
  },
  {
    label: 'Packages',
    to   : '/setup/financial/invoice/packages'
  },
  {
    label: 'Feeding and Meds',
    to   : '/setup/financial/invoice/feeding-meds'
  },
  {
    label: 'Surcharges',
    to   : '/setup/financial/invoice/surcharges'
  }
]

const Tab = ({ children }) => {
  const location = useLocation()

  return (
    <>
      <p>
        Search and update all prices using the filters. To set up new service charges, navigate to the service settings.
      </p>

      <Grid className='mt20'>
        <Grid.Row>
          <Grid.Column width={3}>
            <Menu fluid pointing vertical>
              {
                items.map(({ label, to }, index) => (
                  <Menu.Item
                    active={location.pathname === to}
                    as={Link}
                    key={index}
                    to={to}>
                    {label}
                  </Menu.Item>
                ))
              }
            </Menu>
          </Grid.Column>
          <Grid.Column width={13}>
            {children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default Tab
