import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb, Button, Divider, Grid, Header, Icon } from 'semantic-ui-react'

const items = [
  {
    label: 'Day Services',
    to   : '/setup/service/package/day-services'
  },
  {
    label: 'Boarding',
    to   : '/setup/service/package/boarding'
  },
  {
    label: 'Training',
    to   : '/setup/service/package/training'
  },
  {
    label: 'Grooming',
    to   : '/setup/service/package/grooming'
  }
]

const Menu = () => {
  const location = useLocation()

  return (
    <>
      <Header>Service Packages</Header>
      <Divider/>
      <Grid>
        <Grid.Column computer={16} mobile={16} tablet={16}>
          <Breadcrumb className='p0'>
            <Breadcrumb.Section active>
              <Link to='/setup'><Icon name='setting'/>Settings</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider className='mh12' icon='right chevron'/>
            <Breadcrumb.Section active>
              <Link to='/setup/service/package/day-services'>Packages</Link>
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
        <Grid.Column computer={16} mobile={16} tablet={16}>
          {
            items.map(({ label, to }, index) => {
              return (
                <Button
                  as={Link}
                  color={to === location.pathname ? 'teal' : null}
                  content={label}
                  key={index}
                  to={to}/>
              )
            })
          }
        </Grid.Column>
      </Grid>

      <Divider/>
    </>
  )
}

export default Menu
