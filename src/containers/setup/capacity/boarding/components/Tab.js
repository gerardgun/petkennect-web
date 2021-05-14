import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Header, Menu } from 'semantic-ui-react'

const items = [
  {
    label: 'General Settings',
    to   : '/setup/capacity/boarding/setting'
  },
  {
    label: 'Lodging Areas',
    to   : '/setup/capacity/boarding/area'
  },
  {
    label: 'Lodging Types',
    to   : '/setup/capacity/boarding/type'
  },
  {
    label: 'Kennels',
    to   : '/setup/capacity/boarding/kennel'
  }
]

const Tab = ({ children }) => {
  const location = useLocation()

  return (
    <>
      <Header as='h4' color='teal'>Lodging Area Settings</Header>
      <p>
        Manage lodging areas and accomodations by your locations here. <br/>
        You can enable surcharge pricing by area or by lodging type, and per night or per stay.
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
