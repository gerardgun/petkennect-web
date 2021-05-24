import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'

const items = [
  {
    label: 'Invoice Settings',
    to   : '/setup/financial/invoice/services-activities'
  },
  {
    label: 'Coupons',
    to   : '/setup/financial/invoice/services-activities'
  },
  {
    label: 'Pricing',
    to   : '/setup/financial/invoice/services-activities'
  }
]

const Menu = () => {
  const location = useLocation()

  return (
    <>
      <Header>Capacity Managment</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          let prefix = to

          if(prefix === '/setup/financial/invoice/services-activities')
            prefix = '/setup/financial/invoice'

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
