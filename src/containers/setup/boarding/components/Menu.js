import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import Theme from '@components/mainTheme'
import tenantDetailDuck from '@reducers/tenant/detail'

const items = [
  {
    label: 'Pricing Settings',
    to   : '/setup/boarding/pricing'
  },
  {
    label: 'General Settings',
    to   : '/setup/boarding/general/setting'
  }
]

const Menu = () => {
  const location = useLocation()
  const detail = useSelector(tenantDetailDuck.selectors.detail)

  return (
    <>
      <Header>Boarding Settings</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          let prefix = to

          if(prefix === '/setup/boarding/general/setting')
            prefix = '/setup/boarding/general'

          const rgx = new RegExp(`^${prefix}.*`)

          return (
            <Button
              as={Link}
              className='button-menu'
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
