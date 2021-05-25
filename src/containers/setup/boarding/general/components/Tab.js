import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'

const items = [
  {
    label: 'Settings',
    to   : '/setup/settings/booarding-settings'
  },
  {
    label: 'Service Types',
    to   : '/setup/settings/booarding-settings/service-type'
  },
  {
    label: 'Reservations',
    to   : '/setup/settings/booarding-settings/reservation'
  },
  {
    label: 'Activities/Check-Out',
    to   : '/setup/settings/booarding-settings/activity'
  },
  {
    label: 'Belongings',
    to   : '/setup/settings/booarding-settings/belonging'
  }
]

const Tab = ({ children }) => {
  const location = useLocation()

  return (
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
  )
}

export default Tab
