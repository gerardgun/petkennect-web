import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, useLocation } from 'react-router-dom'
import { Header, Icon, Breadcrumb } from 'semantic-ui-react'

import './styles.scss'

const SettingMenu = (props) => {
  useEffect(() => {

  }, [])

  const location = useLocation()
  const menuOption = location.pathname.slice(location.pathname.indexOf('/', 22) + 1)

  return (
    <div>
      <div className='' style={{ display: 'flex' }}>
        <Icon color='teal' name='settings' style={{ fontSize: '25px' }}/>
        <div className='ml12 mt4' style={{ display: 'flex' }}>
          <Header as='h4'>Settings<Breadcrumb.Divider className='mh12' icon='right chevron' style={{ fontSize: '16px' }}/>Access Level Permissions</Header>
        </div>
      </div>
      <div className='mt12 manager-dashboard-setting-style' style={{ display: 'flex' }}>
        <div
          className={menuOption === 'permission' ? 'setting-selected-menu-color' : 'setting-menu-color'} style={{ width: '18%' }}>
          <Link  to={`/manager-dashboard/setting/permission`}><b>Permissions</b></Link>
        </div>
        <div
          className={menuOption === 'time-clock-setting' ? 'setting-selected-menu-color' : 'setting-menu-color'} style={{ width: '22%' }}>
          <Link><b>Time Clock Settings</b></Link>
        </div>
        <div
          className={menuOption === 'schedule-setting' ? 'setting-selected-menu-color' : 'setting-menu-color'} style={{ width: '22%' }}>
          <Link><b>Schedule Settings</b></Link>
        </div>
        <div
          className={menuOption === 'payroll' ? 'setting-selected-menu-color' : 'setting-menu-color'} style={{ width: '18%' }}>
          <Link><b>Payroll</b></Link>
        </div>
        <div
          className={menuOption === 'request-timeOff' ? 'setting-selected-menu-color' : 'setting-menu-color'} style={{ width: '20%' }}>
          <Link><b>Requests and Time Off</b></Link>
        </div>
      </div>
    </div>
  )
}

export default SettingMenu

