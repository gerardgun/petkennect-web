import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'
import Theme from '@components/mainTheme'
import tenantDetailDuck from '@reducers/tenant/detail'

const items = [
  {
    label: 'Appointment Capacity',
    to   : '/setup/capacity/appointment/setting'
  },
  {
    label: 'Services Capacity',
    to   : '/setup/capacity/service/setting'
  },
  {
    label: 'Lodging Capacity',
    to   : '/setup/capacity/boarding/setting'
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

          if(prefix === '/setup/capacity/appointment/setting')
            prefix = '/setup/capacity/appointment'
          else if(prefix === '/setup/capacity/service/setting')
            prefix = '/setup/capacity/service'
          else if(prefix === '/setup/capacity/boarding/setting')
            prefix = '/setup/capacity/boarding'

          const rgx = new RegExp(`^${prefix}.*`)

          return (
            <Button
              as={Link}
              className={`w210 button-menu ${rgx.test(location.pathname) ? Theme(tenant).buttonTextColor : null}`}
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
