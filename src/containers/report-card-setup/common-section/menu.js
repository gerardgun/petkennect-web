import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Grid, Header, Breadcrumb, Icon, Divider } from 'semantic-ui-react'

const Menu = ()=>{
  const items = [
    {
      label: 'Day Service',
      to   : '/setup/report-card-setup/day-service'
    },
    {
      label: 'Boarding',
      to   : '/setup/report-card-setup/boarding'
    },
    {
      label: 'Training',
      to   : '/setup/report-card-setup/training'
    },
    {
      label: 'Grooming',
      to   : '/setup/report-card-setup/grooming'
    }

  ]

  const location = useLocation()

  return (
    <Grid>
      <Grid.Column computer={16} mobile={16} tablet={16}>
        <Header as='h2'  className='cls-MainHeader mb20'>Report Card Setup</Header>
        {/* <hr></hr> */}
        <Breadcrumb className='p0'>
          <Breadcrumb.Section active>
            <Link to='/setup/admin-item'><Icon name='setting'/>Settings</Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider className='mh12' icon='right chevron'/>
          <Breadcrumb.Section active>
            <Link to='/setup/service-setting'>Forms and Templates</Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider className='mh12'  icon='right chevron'/>
          <Breadcrumb.Section active>
            <Link to='/setup/service-setting'>Report Cards</Link>
          </Breadcrumb.Section>
        </Breadcrumb>

      </Grid.Column>
      <Grid.Column
        mobile={16} style={{ paddingBottom: '2px' }} >
        <div className='flex'>
          {
            items.map(({ label, to }, index) => (
              <Button
                as={Link}
                className='report-setting-tab'
                color={location.pathname === to ? 'teal' : null}
                content={label}
                key={index}
                to={to}/>
            ))
          }
        </div>
        <Divider className='mt28 mb16'/>
      </Grid.Column>

    </Grid>
  )
}

export default Menu

