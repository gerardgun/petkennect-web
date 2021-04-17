import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header } from 'semantic-ui-react'

const items = [
  {
    label: 'General',
    to   : '/setup/pet/general/retire-reason'
  },
  {
    label: 'Species',
    to   : '/setup/pet/kind'
  },
  {
    label: 'Breeds',
    to   : '/setup/pet/breed'
  },
  {
    label: 'Vaccinations',
    to   : '/setup/pet/vaccination/type'
  },
  {
    label: 'Feeding',
    to   : '/setup/pet/feeding/time'
  },
  {
    label: 'Medication',
    to   : '/setup/pet/medication/time'
  }
]

const Menu = () => {
  const location = useLocation()

  return (
    <>
      <Header>Animal Settings</Header>
      <Divider/>

      {
        items.map(({ label, to }, index) => {
          let prefix = to

          if(prefix === '/setup/pet/feeding/time')
            prefix = '/setup/pet/feeding'
          else if(prefix === '/setup/pet/medication/time')
            prefix = '/setup/pet/medication'
          else if(prefix === '/setup/pet/vaccination/type')
            prefix = '/setup/pet/vaccination'
          else if(prefix === '/setup/pet/general/retire-reason')
            prefix = '/setup/pet/general'

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
