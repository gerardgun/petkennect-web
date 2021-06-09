import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'

const items = [
  {
    label: 'General Settings',
    to   : '/setup/add-on/general/setting'
  },
  {
    label: 'Capacity Management',
    to   : '/setup/capacity/appointment/setting'
  }
]

const Menu = () => {
  const location = useLocation()

  return (
    <>
      <Header>Add-On Service Settings</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          let prefix = to

          if(prefix === '/setup/add-on/general/setting')
            prefix = '/setup/add-on/general'

          const rgx = new RegExp(`^${prefix}.*`)

          return (
            <Button
              as={Link}
              className='w210'
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
