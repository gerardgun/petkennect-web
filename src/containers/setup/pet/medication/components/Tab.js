import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Header, Menu } from 'semantic-ui-react'

const items = [
  {
    label: 'Medication Times',
    to   : '/setup/pet/medication/time'
  },
  {
    label: 'Medications',
    to   : '/setup/pet/medication'
  },
  {
    label: 'Report Status',
    to   : '/setup/pet/medication/report-status'
  },
  {
    label: 'Units',
    to   : '/setup/pet/medication/unit'
  },
  {
    label: 'Measurements',
    to   : '/setup/pet/medication/measurement'
  }
]

const Tab = ({ children }) => {
  const location = useLocation()

  return (
    <>
      <Header as='h4' color='teal'>Adjust Editable Field Values</Header>
      <p>
        Edit field values regarding all things medication related here.
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
