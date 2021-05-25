import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'

const items = [
  {
    label: 'General Settings',
    to   : '/setup/capacity/service/setting'
  },
  {
    label: 'Total Facility',
    to   : '/setup/capacity/service/total-facility'
  },
  {
    label: 'Service Groups',
    to   : '/setup/capacity/service/service-group'
  },
  {
    label: 'Service Types',
    to   : '/setup/capacity/service/service-type'
  },
  {
    label: 'By Reservation',
    to   : '/setup/capacity/service/reservation'
  },
  {
    label: 'Yard Capacity',
    to   : '/setup/capacity/service/yard-capacity'
  },
  {
    label: 'Custom Capacity',
    to   : '/setup/capacity/service/custom'
  }
]

const Tab = ({ children }) => {
  const location = useLocation()

  return (
    <>
      <p>
        Use this section to manage service and capacity by location for all reservations. <br/>
        Appointment based capacity is managed by role or specialist <Link to='/setup/capacity/appointment/role'>here</Link>
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
