import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Header, Image, Menu, Label } from 'semantic-ui-react'

import './styles.scss'
const items = [
  {
    label: 'My Dashboard',
    to   : '/staff-dashboard'
  },
  {
    label: 'My Information',
    to   : '/staff-dashboard/information'
  },
  {
    label: 'My Requests',
    to   : '/staff-dashboard/requests'
  },
  {
    label: 'My Notification',
    to   : '/staff-dashboard/notification'
  },
  {
    label: 'My Performance',
    to   : '/staff-dashboard/performance'
  },
  {
    label: 'My Documents',
    to   : '/staff-dashboard/document'
  }
]

const StaffInformation = ()=>{
  const location = useLocation()

  return (
    <>
      <div className='flex align-center justify-center flex-column'>
        <Image circular className='emp-image'src='/images/employee_default.jpg'/>
        <Header as='h4' className='mb8 mt16' content='Employee Name'/>
        <Header as='h4' className='mt0 mb8' content='Manager'/>
        <Header as='h4' className='mt0 mb16' content='Location 1'/>
      </div>
      <Button
        color='teal' content='At Work: 10 Years 10 Months' fluid
        style={{ paddingLeft: '5px', paddingRight: '5px' }}/>
      <Menu
        className='petkennect-profile-menu' color='teal' fluid
        vertical>
        {
          items.map(({ label, to }, index) => (
            <Menu.Item
              active={location.pathname === to}
              as={Link}
              key={index}
              style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
              to={to}>
              {label}
              {label != 'My Dashboard' && <Label color='teal'>0</Label> }
            </Menu.Item>
          ))
        }

      </Menu>

    </>
  )
}

export default StaffInformation
