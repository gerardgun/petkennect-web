import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import Theme from '@components/mainTheme'
import '../styles.scss'
import { useSelector } from 'react-redux'
import tenantDetailDuck from '@reducers/tenant/detail'

const items = [
  {
    label    : 'Contact Billing',
    to       : '/setup/company-profile/contact-billing',
    linklabel: 'Contact Billing'
  },
  {
    label    : 'Branding',
    to       : '/setup/company-profile/branding',
    linklabel: 'Branding'
  },
  {
    label    : 'Locations',
    to       : '/setup/company-profile/locations',
    linklabel: 'Locations'
  },
  {
    label    : 'System Settings',
    to       : '/setup/company-profile/system-settings',
    linklabel: 'System Settings'
  },
  {
    label    : 'Calendar',
    to       : '/setup/company-profile/calendar',
    linklabel: 'Calendar'
  },
  {
    label    : 'Accounting',
    to       : '/setup/company-profile/accounting',
    linklabel: 'Accouting'
  }
]

function Menu() {
  const location = useLocation()
  const detail = useSelector(tenantDetailDuck.selectors.detail)

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
              className={`button-menu ${rgx.test(location.pathname) ?  Theme(detail).buttonTextColor : null}`}
              color={rgx.test(location.pathname) ?  Theme(detail).buttonMenuColor : null}
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
