import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import theme from '@components/mainTheme'

const items = [
  {
    label: 'Service Groups',
    to   : '/setup/service/group'
  },
  {
    label: 'Service Types',
    to   : '/setup/service/type'
  },
  {
    label: 'Reservations',
    to   : '/setup/service/reservation'
  },
  {
    label: 'Boarding Activities',
    to   : '/setup/service/reservation/boarding-activity'
  },
  {
    label: 'Group Classes',
    to   : '/setup/service/reservation/group-class'
  },
  {
    label: 'Class Sessions',
    to   : '/setup/service/reservation/group-class/session'
  }
]

const Menu = () => {
  const location = useLocation()

  return (
    <>
      <Header>Services And Reservations</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          return (
            <Button
              as={Link}
              className='button-menu'
              color={to === location.pathname ? theme.buttonMenuColor : null}
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
