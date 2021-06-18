import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import theme from '@components/mainTheme'

const items = [
  {
    label: 'General Settings',
    to   : '/setup/day-service/general/setting'
  }
]

const Menu = () => {
  const location = useLocation()

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
              className='button-menu'
              color={rgx.test(location.pathname) ? theme.buttonMenuColor : null}
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
