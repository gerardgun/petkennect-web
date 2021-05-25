import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'

const items = [
  /*{
    label: 'General Settings',
    to   : '/setup/training/general/setting'
  },*/
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
        items.map(({ label, to }, index) => {
          let prefix = to

          if(prefix === '/setup/training/general/setting')
            prefix = '/setup/training/general'

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
