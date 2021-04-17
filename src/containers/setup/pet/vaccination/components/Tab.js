import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'

const items = [
  {
    label: 'Vaccination by Species',
    to   : '/setup/pet/vaccination/type'
  },
  {
    label: 'Alerts and Reservation Settings',
    to   : '/setup/pet/vaccination/setting'
  },
  {
    label: 'Instructions when Booking Online',
    to   : '/setup/pet/vaccination/booking-setting'
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
