import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'

const items = [
  {
    label: 'Pricing Settings',
    to   : '/setup/boarding/pricing'
  }
]

const Menu = () => {
  const location = useLocation()

  return (
    <>
      <Header>Boarding Settings</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => (
          <Button
            as={Link}
            color={location.pathname === to ? 'teal' : null}
            content={label}
            key={index}
            to={to}/>
        ))
      }

      <Divider/>
    </>
  )
}

export default Menu
