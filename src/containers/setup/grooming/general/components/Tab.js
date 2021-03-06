import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'

const items = [
  {
    label: 'Settings',
    to   : '/setup/settings/grooming'
  },
  {
    label: 'Service Types',
    to   : '/setup/settings/grooming/service-type'
  },
  {
    label: 'Reservations',
    to   : '/setup/settings/grooming/reservation'
  },
  {
    label: 'Service Options',
    to   : '/setup/settings/grooming/service-option'
  }
]

const Tab = ({ children }) => {
  const location = useLocation()

  return (
    <>
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
