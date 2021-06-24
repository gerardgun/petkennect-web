import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import Theme from '@components/mainTheme'
import tenantDetailDuck from '@reducers/tenant/detail'
import '../styles.scss'

const items = [
  {
    label: 'Boarding Pricing',
    to   : '/setup/settings/booarding-pricing'
  },
  {
    label: 'Boarding Settings',
    to   : '/setup/settings/booarding-settings'
  },
  {
    label: 'Day Service Settings',
    to   : '/setup/settings/day-service'
  },
  {
    label: 'Training Settings',
    to   : '/setup/settings/training'
  },
  {
    label: 'Grooming Settings',
    to   : '/setup/settings/grooming'
  }
]

const Menu = () => {
  const location = useLocation()
  const detail = useSelector(tenantDetailDuck.selectors.detail)

  return (
    <>
      <Header>Service settings</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          let prefix = to

          const rgx = new RegExp(`^${prefix}.*`)

          return (
            <Button
              as={Link}
              className={`button-menu ${rgx.test(location.pathname) ? Theme(detail).buttonTextColor : null}`}
              color={rgx.test(location.pathname) ? Theme(detail).buttonMenuColor : null}
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
