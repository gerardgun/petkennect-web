import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'

const items = [
  {
    label: 'Retire Reasons',
    to   : '/setup/pet/general/retire-reason'
  },
  {
    label: 'Interaction Types',
    to   : '/setup/pet/general/interaction-type'
  },
  {
    label: 'Incident Behaviors',
    to   : '/setup/pet/general/incident/behavior'
  },
  {
    label: 'Incident Types',
    to   : '/setup/pet/general/incident/type'
  },
  {
    label: 'Incident Actions',
    to   : '/setup/pet/general/incident/action'
  },
  {
    label: 'Veterinarian List',
    to   : '/setup/pet/general/veterinary'
  }
]

const Tab = ({ children }) => {
  const location = useLocation()

  return (
    <>
      <Grid className='mt20'>
        <Grid.Row>
          <Grid.Column className='menu-item-style' width={3}>
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
