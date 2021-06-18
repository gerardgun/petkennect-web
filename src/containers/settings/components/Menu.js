import React, {useState}from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb, Icon, Button, Divider, Header } from 'semantic-ui-react'
import theme from '@components/mainTheme'
import '../styles.scss'

const items = [
  {
    label: 'Boarding Pricing',
    to   : '/setup/settings/booarding-pricing',
    linklabel: 'Boarding Pricing Settings'
  },
  {
    label: 'Boarding Settings',
    to   : '/setup/settings/booarding-settings',
    linklabel: 'Boarding Settings'
  },
  {
    label: 'Day Service Settings',
    to   : '/setup/settings/day-service',
    linklabel: 'Day Service Settings'
  },
  {
    label: 'Training Settings',
    to   : '/setup/settings/training',
    linklabel: 'Training Settings'
  },
  {
    label: 'Grooming Settings',
    to   : '/setup/settings/grooming',
    linklabel: 'Grooming Settings'
  }
]

const Menu = () => {
  const location = useLocation()
  const[ linkLabel, setLinkLabel ] = useState('')
  return (
    <>
      <Header>Service settings</Header>
            {/*<Breadcrumb className='p0'>
              <Breadcrumb.Section active>
                <Link to='/setup/admin-item'><Icon name='setting'/>Settings</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12' icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/service-setting'>Services</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider className='mh12'  icon='right chevron'/>
              <Breadcrumb.Section active>
                <Link to='/setup/service-setting'>{linkLabel}</Link>
              </Breadcrumb.Section>
            </Breadcrumb>*/}
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          let prefix = to

          const rgx = new RegExp(`^${prefix}.*`)

          return (
            <Button
              as={Link}
              className='button-menu'
              color={rgx.test(location.pathname) ? theme.buttonMenuColor : null}
              content={label}
              key={index}
              to={to}/>
          )
        })
      }

      <Divider/>
    </>
  )
}

export default Menu
