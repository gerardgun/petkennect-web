import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import Theme from '@components/mainTheme'
import tenantDetailDuck from '@reducers/tenant/detail'

const items = [
  {
    label: 'General Settings',
    to   : '/setup/day-service/general/setting'
  }
]

const Menu = () => {
  const location = useLocation()
  const tenant = useSelector(tenantDetailDuck.selectors.detail)

  return (
    <>
      <Header>Day Service Settings</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          let prefix = to

          if(prefix === '/setup/day-service/general/setting')
            prefix = '/setup/day-service/general'

          const rgx = new RegExp(`^${prefix}.*`)

          return (
            <Button
              as={Link}
              className={`button-menu ${rgx.test(location.pathname) ? Theme(tenant).buttonTextColor : null}`}
              color={rgx.test(location.pathname) ? Theme(tenant).buttonMenuColor : null}
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
