import React, {useState}from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb, Icon, Button, Divider, Header } from 'semantic-ui-react'
import '../styles.scss'

const items = [
  {
    label: 'Contact Billing',
    to   : '/setup/company-profile/contact-billing',
    linklabel: 'Contact Billing'
  },
  {
    label: 'Branding',
    to   : '/setup/company-profile/branding',
    linklabel: 'Branding'
  },
  {
    label: 'Locations',
    to   : '/setup/company-profile/locations',
    linklabel: 'Locations'
  },
  {
    label: 'System Settings',
    to   : '/setup/company-profile/system-settings',
    linklabel: 'System Settings'
  },
  {
    label: 'Calendar',
    to   : '/setup/company-profile/calendar',
    linklabel: 'Calendar'
  },
  {
    label: 'Accounting',
    to   : '/setup/company-profile/accounting',
    linklabel: 'Accouting'
  }
]

function Menu () {
  const location = useLocation()
  const[ linkLabel, setLinkLabel ] = useState('')
  return (
    <>
      <Header>Company profile</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          let prefix = to

          const rgx = new RegExp(`^${prefix}.*`)

          return (
            <Button
              as={Link}
              className='button-menu'
              color={rgx.test(location.pathname) ? 'teal' : null}
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
