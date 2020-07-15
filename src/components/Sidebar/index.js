import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { Button, Dropdown, Icon, Image } from 'semantic-ui-react'

import Sidebar from '@components/Common/Sidebar'
import { getAbbreviature } from '@lib/utils/functions'

import authDuck from '@reducers/auth'

import './styles.scss'

const categoriesForSuperAdmin = [
  {
    href : '/organization',
    icon : 'factory',
    label: 'Organizations'
  },
  {
    href : '/company',
    icon : 'building',
    label: 'Companies'
  },
  {
    href : '/transaction',
    icon : 'exchange',
    label: 'Transactions'
  }
]

const categories = [
  {
    href : '/dashboard',
    icon : 'chart bar outline',
    label: 'Dashboard'
  },
  {
    href : '/client',
    icon : 'users',
    label: 'Clients'
  },
  {
    href         : null,
    icon         : 'gitlab',
    label        : 'Pets',
    subcategories: [
      { href: '/pet', label: 'Pets' },
      { href: '/pet/class', label: 'Classes' },
      { href: '/pet/breed', label: 'Breeds' },
      { href: '/pet/incident-type', label: 'Incident Types' },
      { href: '/pet/incident-action', label: 'Incident Actions' },
      { href: '/pet/incident-behavior', label: 'Incident Behaviors' },
      { href: '/pet/retire-reason', label: 'Retire Reason' },
      { href: '/pet/vaccination-type', label: 'Vaccination Type' }
    ]
  },
  {
    href         : null,
    icon         : 'book',
    label        : 'Catalogue',
    subcategories: [
      { href: '/product', label: 'Products' },
      { href: '/category', label: 'Categories' },
      { href: '/service', label: 'Services' }
    ]
  },
  {
    href         : null,
    icon         : 'users',
    label        : 'Employees',
    subcategories: [
      { href: '/employee', label: 'Employees' },
      { href: '/employee-title', label: 'Titles' }
    ]
  },
  {
    href : '/request',
    icon : 'osi',
    label: 'Online Requests'
  },
  {
    href : '/sale',
    icon : 'dollar sign',
    label: 'Retail Sales'
  },
  {
    href         : null,
    icon         : 'chart line',
    label        : 'Daily Reporting',
    subcategories: [
      { href: '/not-defined', label: 'Boarding Schedule' },
      { href: '/not-defined', label: 'Day Camp Schedule' },
      { href: '/not-defined', label: 'Fitness Schedule' },
      { href: '/not-defined', label: 'Grooming Schedule' },
      { href: '/not-defined', label: 'EOD Sales Report' },
      { href: '/not-defined', label: 'Calendar' }
    ]
  },
  {
    href         : null,
    icon         : 'chart pie',
    label        : 'Day Camp Reports',
    subcategories: [
      { href: '/not-defined', label: 'Day Camp Head Count Schedule' },
      { href: '/not-defined', label: 'Day Camp Refund Calculator' },
      { href: '/not-defined', label: 'Daycampers W/ Balance' },
      { href: '/not-defined', label: 'Online Day Camp Reservations' }
    ]
  },
  {
    href         : null,
    icon         : 'chart area',
    label        : 'Boarding Reports',
    subcategories: [
      { href: '/not-defined', label: 'Boarding Activity' },
      { href: '/not-defined', label: 'Boarding Medication Schedule' },
      { href: '/not-defined', label: 'Boarding Availability' },
      { href: '/not-defined', label: 'Boarding No Shows' },
      { href: '/not-defined', label: 'Online Boarding Reservations' }
    ]
  },
  {
    href         : null,
    icon         : 'chart bar outline',
    label        : 'Training Reports',
    subcategories: [
      { href: '/not-defined', label: 'Agility Class Certificatess' },
      { href: '/not-defined', label: 'Day Training Report Cards' },
      { href: '/not-defined', label: 'Day Trainer Daily Email' },
      { href: '/not-defined', label: 'Day Trainer Performance Log' },
      { href: '/not-defined', label: 'Puppy Class Certificates' },
      { href: '/not-defined', label: 'Training Follow Ups' },
      { href: '/not-defined', label: 'Training Outstanding Balances' },
      { href: '/not-defined', label: 'Weekly Day Training' }
    ]
  },
  {
    href         : null,
    icon         : 'dna',
    label        : 'Management Functions',
    subcategories: [
      { href: '/not-defined', label: 'Weekly EOD Issues' },
      { href: '/not-defined', label: 'Search Invoices' },
      { href: '/not-defined', label: 'Open Register Functions' },
      { href: '/not-defined', label: 'A/R And Aging Report' },
      { href: '/not-defined', label: 'Occupancy Status' },
      { href: '/not-defined', label: 'Retail Sales Report' }
    ]
  },
  {
    href         : null,
    icon         : 'cogs',
    label        : 'Setup',
    subcategories: [
      { href: '/setup/location', label: 'Locations' },
      { href: '/setup/document-type', label: 'Document Types' },
      { href: '/setup/agreement', label: 'Agreements' },
      { href: '/setup/training-reason', label: 'Training Reason' },
      { href: '/setup/training-method', label: 'Training Method' },
      { href: '/setup/training-command', label: 'Training Command' },
      { href: '/not-defined', label: 'Enable Decline Portal Client' },
      { href: '/not-defined', label: 'Calendar' },
      { href: '/not-defined', label: 'Notifications' },
      { href: '/not-defined', label: 'Overview' },
      { href: '/not-defined', label: 'Cancellation Reason' },
      { href: '/not-defined', label: 'Client Rating' }
    ]
  }
]

const AppSidebar = ({ auth, ...props }) => {
  const [ activeCategoryIndex, setActiveCategoryIndex ] = useState(null)
  const [ show, setShow ] = useState(false)

  const getCategories = () => auth.item.is_superadmin ? categoriesForSuperAdmin : categories

  const _handleCategoryClick = e => {
    const index = +e.currentTarget.dataset.index
    const category = categoriesToRender[index]

    if(index === activeCategoryIndex) setActiveCategoryIndex(null)
    else if(!category.href) setActiveCategoryIndex(index)
  }

  const _handleEditProfileBtnClick = () => {

  }

  const _handleSessionDropdownItemClick = (e, { value }) => {
    if(value === 'sign-out')
      props.signOut()
  }

  const _handleSessionDropdownOpen = (e, { open }) => setShow(!open)

  const _handleTenantDropdownItemClick = (e, { value }) => {
    props.rehydrateTenant(value)
  }

  const categoriesToRender = useMemo(() => getCategories(), [ auth.item.id ])
  const userFullName = `${auth.item.first_name} ${auth.item.last_name}`
  const userAbbrev = getAbbreviature(userFullName)

  return (
    <div className='app-sidebar'>
      <Sidebar>
        <Image src='/images/logo.png' style={{ padding: '3rem' }}/>
        {
          categoriesToRender.map(({ subcategories = [], ...rest }, index) => {
            const rgx = new RegExp(`^${rest.href}.*`)
            const active = activeCategoryIndex === index
              || rgx.test(props.match.path)
              || subcategories.some(item => {
                const rgx = new RegExp(`^${item.href}.*`)

                return rgx.test(props.match.path)
              })

            return (
              <Sidebar.Category
                active={active}
                data-index={index}
                key={index}
                onClick={_handleCategoryClick}
                {...rest}>
                {
                  subcategories.length > 0 ? (
                    subcategories.map(({ href: to, label }, index) => {
                      const active = props.match.path === to

                      return <Link className={active ? 'active' : ''} key={index} to={to}>{label}</Link>
                    })
                  ) : null
                }
              </Sidebar.Category>
            )
          })
        }
      </Sidebar>

      {/* Session User Dropdown */}
      <div className='auth-session-dropdown'>
        <Dropdown
          className='avatar'
          icon={null}
          onClose={_handleSessionDropdownOpen}
          onOpen={_handleSessionDropdownOpen}
          open={show}
          trigger={(
            <div className='avatar-trigger'>
              <div>
                <div className='avatar-circle'>{userAbbrev}</div>
              </div>
              <div className='avatar-user'>{userFullName}</div>
              <div className='avatar-icon'>
                <Icon name={show ? 'caret up' : 'caret down'}/>
              </div>
            </div>
          )}>
          <Dropdown.Menu>
            <Dropdown.Header
              content={
                <div>
                  <div className='avatar-trigger'>
                    <div>
                      <div className='avatar-circle'>{userAbbrev}</div>
                    </div>
                    <div className='avatar-user'>
                      <p>{userFullName}</p>
                      <span>{auth.item.email}</span>
                    </div>
                  </div>
                  <Button
                    as={Link} basic
                    color='teal' content='Edit Profile'
                    onClick={_handleEditProfileBtnClick}/>
                </div>
              }/>
            <Dropdown.Divider/>
            <Dropdown.Header
              content={
                <div>
                  <p>Signed as</p>
                  <strong>
                    {
                      props.currentTenant && `${props.currentTenant.legal_name} - ${props.currentTenant.is_main_admin ? 'Super Administrador' : 'Administrador'}`
                    }
                    {
                      auth.item.is_superadmin && 'Petkennect Manager'
                    }
                  </strong>
                </div>
              }/>
            <Dropdown.Divider/>
            {
              !auth.item.is_superadmin && (
                <>
                  <Dropdown.Header content='Change to'/>
                  <Dropdown.Menu scrolling>
                    {
                      auth.item.companies.map((item, index) => (
                        <Dropdown.Item
                          className={item.id === props.currentTenant.id ? 'selected' : ''}
                          key={index} onClick={_handleTenantDropdownItemClick} text={`${item.legal_name} - Administrador`}
                          value={item.subdomain_prefix}/>
                      ))
                    }
                  </Dropdown.Menu>
                  <Dropdown.Divider/>
                </>
              )
            }
            <Dropdown.Item text='Help' value='help'/>
            <Dropdown.Item text='Settings' value='settings'/>
            <Dropdown.Item onClick={_handleSessionDropdownItemClick} text='Sign Out' value='sign-out'/>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default compose(
  withRouter,
  connect(
    ({ auth }) => {
      return {
        auth,
        currentTenant: authDuck.selectors.getCurrentTenant(auth)
      }
    },
    {
      signOut        : authDuck.creators.signOut,
      rehydrateTenant: authDuck.creators.rehydrateTenant
    }
  )
)(AppSidebar)