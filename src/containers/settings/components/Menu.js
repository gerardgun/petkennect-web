import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'

const items = [
  {
    label: 'Boarding Pricing',
    to   : '/setup/service/group'
  },
  {
    label: 'Boarding Settings',
    to   : '/setup/service/type'
  },
  {
    label: 'Day Service Settings',
    to   : '/setup/service/reservation'
  },
  {
    label: 'Training Settings',
    to   : '/setup/service/reservation/boarding-activity'
  },
  {
    label: 'Groming Settings',
    to   : '/setup/service/reservation/group-class'
  }
]

const Menu = () => {
  const location = useLocation()

  return (
    <>
      <Header>Service settings</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          let prefix = to

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
