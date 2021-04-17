import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'

const items = [
  {
    label: 'General',
    to   : '/setup/training'
  },
  {
    label: 'Reasons',
    to   : '/setup/training/reason'
  },
  {
    label: 'Methods',
    to   : '/setup/training/method'
  },
  {
    label: 'Commands',
    to   : '/setup/training/command'
  },
  {
    label: 'Rating Keys',
    to   : '/setup/training/rating-key'
  }
]

const Menu = () => {
  const location = useLocation()

  return (
    <>
      <Header>Training Settings</Header>
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
