import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'

const items = [
  {
    label: 'Settings',
    to   : '/setup/training/general/setting'
  },
  {
    label: 'Service Types',
    to   : '/setup/training/general/service-type'
  },
  {
    label: 'Reservations',
    to   : '/setup/training/general/reservation'
  },
  {
    label: 'Group Classes',
    to   : '/setup/training/general/group-class'
  },
  {
    label: 'Group Class Sessions',
    to   : '/setup/training/general/group-class/session'
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
