import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, Header, Menu, Icon, Image } from 'semantic-ui-react'
import _get from 'lodash/get'
import items from './items'

import './styles.scss'
const MangerShortcuts = () => {
  const location = useLocation()

  let result = location.pathname.slice(location.pathname.indexOf('/', 35), location.pathname.indexOf('/', 38))

  let confirm = (location.pathname.substring(0, location.pathname.indexOf('/', 35))
    + location.pathname.substring(location.pathname.indexOf('/', 35) + result.length))

  return (
    <Card>
      <Card.Content className='p0'>
        <div className='header-div pl12'>
          <Header as='h5' className='pl4'>
            Manager Shortcuts
          </Header>
        </div>
        <div className='admin-card-menu'>
          <Menu fluid secondary vertical>
            {
              items.map((item, index) => (
                <Menu.Item
                  active={location.pathname === item.to || (item.links && item.links.includes(confirm))}
                  as={Link}
                  disabled={_get(item, 'disabled', false)}  key={index}
                  to={item.to}>
                  { item.icon
                    && <div className='flex align-center shortcut-div'><Icon
                      color='blue' name={item.icon}
                      size='small'/>
                    <label className='shortcut-font ml16' >
                      {item.name}
                    </label></div>}
                  { item.image && <div className='flex align-center shortcut-div manager-shortcut-style'>
                    <Image className='mr12 menu-image' src={item.image}/>
                    <label className='shortcut-font'>
                      {item.name}
                    </label></div>}

                </Menu.Item>
              ))
            }
          </Menu>
        </div>

      </Card.Content>
    </Card>

  )
}

export default MangerShortcuts
