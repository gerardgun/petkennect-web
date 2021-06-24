import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import Theme from '@components/mainTheme'
import tenantDetailDuck from '@reducers/tenant/detail'

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
  const tenant = useSelector(tenantDetailDuck.selectors.detail)

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
              className={`button-menu ${rgx.test(location.pathname) ? Theme(tenant).buttonTextColor : null}`}
              color={rgx.test(location.pathname) ? Theme(tenant).buttonMenuColor : null}
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
