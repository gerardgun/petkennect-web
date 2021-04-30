import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Header, Menu } from 'semantic-ui-react'

const items = [
  {
    label: 'General Settings',
    to   : '/setup/capacity/appointment/setting'
  },
  {
    label: 'By Role',
    to   : '/setup/capacity/appointment/role'
  },
  {
    label: 'By Specialist',
    to   : '/setup/capacity/appointment/specialist'
  }
]

const Tab = ({ children }) => {
  const location = useLocation()

  return (
    <>
      <Header as='h4' color='teal'>Appointment Capacity Settings</Header>
      <p>
        Set the number of appointments each role or specialist can have in one day. <br/>
        Capacity limits can be imposed on all reservation types for a total of appointments, or by appointment.
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
