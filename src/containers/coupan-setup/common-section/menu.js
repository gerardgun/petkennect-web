import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Grid, Header, Breadcrumb, Icon, Divider } from 'semantic-ui-react'
import '../styles.scss'
const Menu = ()=>{
  const items = [
    {
      label: 'Invoice Settings',
      to   : '/setup/coupan-setup/invoice-setting'
    },
    {
      label: 'Packages',
      to   : ''
    },
    {
      label: 'Pricing',
      to   : ''
    }

  ]

  const location = useLocation()

  return (
    <Grid>
      <Grid.Column computer={16} mobile={16} tablet={16}>
        <Header as='h2'  className='cls-MainHeader mb20'>Coupon Setup</Header>
        {/* <hr></hr> */}
        <Breadcrumb className='p0'>
          <Breadcrumb.Section active>
            <Link to='/setup'><Icon name='setting'/>Settings</Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider className='mh12' icon='right chevron'/>
          <Breadcrumb.Section active>
            <Link to='/setup'>Financial</Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider className='mh12'  icon='right chevron'/>
          <Breadcrumb.Section active>
            <Link to='/setup/coupan-setup/invoice-setting'>Coupons</Link>
          </Breadcrumb.Section>
        </Breadcrumb>

      </Grid.Column>
      <Grid.Column
        mobile={16} style={{ paddingBottom: '2px' }} >
        <div className='flex align-center'>
          <Header
            as='h4' className='mb0 mr50' color='teal'
            content='Quick Link:'/>
          {
            items.map(({ label, to }, index) => (
              <Button
                as={Link}
                className='coupan-setup-tab'
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

