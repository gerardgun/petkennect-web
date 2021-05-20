import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'

const items = [
  {
    label: 'General Settings',
    to   : '/setup/grooming/general/setting'
  }
]

const Menu = () => {
  const location = useLocation()

  return (
    <>
      <Header>Grooming Service Settings</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          let prefix = to

          if(prefix === '/setup/grooming/general/setting')
            prefix = '/setup/grooming/general'

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
