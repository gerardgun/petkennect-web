import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'

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
