import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, useLocation } from 'react-router-dom'
import { Header, Image, Breadcrumb } from 'semantic-ui-react'

import employeeDirectoryDuck from '@reducers/manager-dashboard/employee/employee-directory'

import './styles.scss'

const EmployeeMenu = (props) => {
  useEffect(() => {
    props.getEmployeeDirectories()
  }, [])

  const location = useLocation()
  const result = location.pathname.slice(location.pathname.indexOf('/', 35) + 1, location.pathname.indexOf('/', 38))
  const menuOption = location.pathname.slice(location.pathname.indexOf('/', 38) + 1)
  const data = props.employeeDirectory.items.filter((_) => _.id == result)

  return (
    <div>
      <div className='' style={{ display: 'flex' }}>
        <Image size='mini' src='/images/manager-shortcuts/team-icon.png'/>
        <div className='ml12 mt8' style={{ display: 'flex' }}>
          <Header as='h4'>Employees<Breadcrumb.Divider className='mh12' icon='right chevron' style={{ fontSize: '16px' }}/>{data[0] && data[0].name}</Header>
        </div>

      </div>
      <div className='mt12 employee-directory-style' style={{ display: 'flex' }}>
        <div
          className={menuOption === 'personal-detail' ? 'employee-selected-menu-color' : 'employee-menu-color'} style={{ width: '20%' }}>
          <Link  to={`/manager-dashboard/employee-directory/${result}/personal-detail`}><b>Personal Details</b></Link>
        </div>
        <div
          className={menuOption === 'availability' ? 'employee-selected-menu-color' : 'employee-menu-color'} style={{ width: '16%' }}>
          <Link to={`/manager-dashboard/employee-directory/${result}/availability`}><b>Availability</b></Link>
        </div>
        <div
          className={menuOption === 'wage-history' ? 'employee-selected-menu-color' : 'employee-menu-color'} style={{ width: '17%' }}>
          <Link to={`/manager-dashboard/employee-directory/${result}/wage-history`}><b>Wage History</b></Link>
        </div>
        <div
          className={menuOption === 'note' ? 'employee-selected-menu-color' : 'employee-menu-color'} style={{ width: '12%' }}>
          <Link to={`/manager-dashboard/employee-directory/${result}/note`}><b>Notes</b></Link>
        </div>
        <div
          className={menuOption === 'document' ? 'employee-selected-menu-color' : 'employee-menu-color'} style={{ width: '16%' }}>
          <Link to={`/manager-dashboard/employee-directory/${result}/document`}><b>Documents</b></Link>
        </div>
        <div className='employee-menu-color' style={{ width: '16%' }}>
          <Link><b>Performance</b></Link>
        </div>
      </div>
    </div>
  )
}

export default  compose(
  connect(
    (state) => {
      const employeeDirectory = employeeDirectoryDuck.selectors.list(state)

      return {
        employeeDirectory
      }
    },
    {
      getEmployeeDirectories: employeeDirectoryDuck.creators.get
    }
  )
)(EmployeeMenu)

