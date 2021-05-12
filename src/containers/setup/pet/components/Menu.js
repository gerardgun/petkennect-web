import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider, Header,  Breadcrumb, Icon } from 'semantic-ui-react'

const items = [
  {
    label : 'General',
    to    : '/setup/pet/general/retire-reason',
    header: 'Animal Settings'
  },
  {
    label : 'Species',
    to    : '/setup/pet/kind',
    header: 'Animal Settings'
  },
  {
    label : 'Breeds',
    to    : '/setup/pet/breed',
    header: 'Breed Manager Settings'
  },
  {
    label : 'Vaccinations',
    to    : '/setup/pet/vaccination/type',
    header: 'Vaccination Settings'
  },
  {
    label : 'Behavior',
    to    : '/setup/pet/behavior-tags',
    header: 'Behavior Tag Settings'
  },

  {
    label : 'Feeding',
    to    : '/setup/pet/feeding/time',
    header: 'Feeding Settings'
  },
  {
    label : 'Medication',
    to    : '/setup/pet/medication/time',
    header: 'Medication Settings'
  }
]

const Menu = () => {
  const location = useLocation()

  return (
    <>
      {
        items.map(({ label,to,header })=>{
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
          if(rgx.test(location.pathname))
            return (
              <>
                <Header>{header}</Header>
                <Breadcrumb className='p0'>
                  <Breadcrumb.Section active>
                    <Link to='/setup'><Icon name='setting'/>Settings</Link>
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider className='mh12' icon='right chevron'/>
                  <Breadcrumb.Section active>
                    <Link to='/setup/pet/kind'>Animal Settings</Link>
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider className='mh12' icon='right chevron'/>
                  <Breadcrumb.Section active>
                    <Link to={to}>{label}</Link>
                  </Breadcrumb.Section>
                </Breadcrumb>
                <Divider/>
              </>
            )
        })
      }

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
              style={{ width: '128px' }}
              to={to}/>
          )
        })
      }

      <Divider className='mb28'/>
    </>
  )
}

export default Menu
