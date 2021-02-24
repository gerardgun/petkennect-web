import React, { useMemo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { Link, withRouter } from 'react-router-dom'

import {  Icon } from 'semantic-ui-react'
import { useMediaQuery } from 'react-responsive'

import Sidebar from '@components/Common/Sidebar'

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
    href : '/pet',
    icon : 'gitlab',
    label: 'Pets'
  },
  {
    href         : null,
    icon         : 'book',
    label        : 'Catalogue',
    subcategories: [
      { href: '/product', label: 'Products' },
      { href: '/category', label: 'Categories' },
      { href: '/service', label: 'Services' },
      { href: '/product-attribute', label: 'Product Attributes' },
      { href: '/product-classes', label: 'Product Classes' },
      { href: '/product-families', label: 'Product Families' },
      { href: '/service-attribute', label: 'Service Attributes' }
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
    href         : null,
    icon         : 'osi',
    label        : 'Online Requests',
    subcategories: [
      { href: '/online-request/client-submission', label: 'Client Submissions' },
      { href: '/online-request/confirm-reservation', label: 'Confirm Reservations' },
      { href: '/online-request/cancellation-log', label: 'Cancellations Logs' },
      { href: '/online-request/vaccination-update', label: 'New Vacinations Update' },
      { href: '/online-request/declined-client', label: 'Declined Submissions' }
    ]
  },
  {
    href : '/email-message',
    icon : 'mail',
    label: 'Email Messages'
  },
  {
    href : '/sale',
    icon : 'dollar sign',
    label: 'Retail Sales'
  },
  // {
  //   href         : null,
  //   icon         : 'chart line',
  //   label        : 'Daily Reporting',
  //   subcategories: [
  //     { href: '/not-defined', label: 'Boarding Schedule' },
  //     { href: '/not-defined', label: 'Day Camp Schedule' },
  //     { href: '/not-defined', label: 'Fitness Schedule' },
  //     { href: '/not-defined', label: 'Grooming Schedule' },
  //     { href: '/not-defined', label: 'EOD Sales Report' },
  //     { href: '/not-defined', label: 'Calendar' }
  //   ]
  // },
  // {
  //   href         : null,
  //   icon         : 'chart pie',
  //   label        : 'Day Camp Reports',
  //   subcategories: [
  //     { href: '/not-defined', label: 'Day Camp Head Count Schedule' },
  //     { href: '/not-defined', label: 'Day Camp Refund Calculator' },
  //     { href: '/not-defined', label: 'Daycampers W/ Balance' },
  //     { href: '/not-defined', label: 'Online Day Camp Reservations' }
  //   ]
  // },
  // {
  //   href         : null,
  //   icon         : 'chart area',
  //   label        : 'Boarding Reports',
  //   subcategories: [
  //     { href: '/not-defined', label: 'Boarding Activity' },
  //     { href: '/not-defined', label: 'Boarding Medication Schedule' },
  //     { href: '/not-defined', label: 'Boarding Availability' },
  //     { href: '/not-defined', label: 'Boarding No Shows' },
  //     { href: '/not-defined', label: 'Online Boarding Reservations' }
  //   ]
  // },
  // {
  //   href         : null,
  //   icon         : 'chart bar outline',
  //   label        : 'Training Reports',
  //   subcategories: [
  //     { href: '/not-defined', label: 'Agility Class Certificatess' },
  //     { href: '/not-defined', label: 'Day Training Report Cards' },
  //     { href: '/not-defined', label: 'Day Trainer Daily Email' },
  //     { href: '/not-defined', label: 'Day Trainer Performance Log' },
  //     { href: '/not-defined', label: 'Puppy Class Certificates' },
  //     { href: '/not-defined', label: 'Training Follow Ups' },
  //     { href: '/not-defined', label: 'Training Outstanding Balances' },
  //     { href: '/not-defined', label: 'Weekly Day Training' }
  //   ]
  // },
  // {
  //   href         : null,
  //   icon         : 'dna',
  //   label        : 'Management Functions',
  //   subcategories: [
  //     { href: '/not-defined', label: 'Weekly EOD Issues' },
  //     { href: '/not-defined', label: 'Search Invoices' },
  //     { href: '/not-defined', label: 'Open Register Functions' },
  //     { href: '/not-defined', label: 'A/R And Aging Report' },
  //     { href: '/not-defined', label: 'Occupancy Status' },
  //     { href: '/not-defined', label: 'Retail Sales Report' }
  //   ]
  // },

  {
    href         : null,
    icon         : 'book',
    label        : 'Report Center',
    subcategories: [
      { href: '/custom-report', label: '  Run Custom Reports' },
      { href: '/custom-report', label: 'Dashboards' }

    ]
  },
  {
    href         : null,
    icon         : 'cogs',
    label        : 'Setup',
    subcategories: [
      { href: '/setup/system-setting', label: 'Application System Settings' },
      { href: '/setup/behavior-tag', label: 'Behavior Tags' },
      { href: '/setup/color-codes', label: 'System Icons/Codes' },
      { href: '/setup/location', label: 'Locations' },
      { href: '/setup/price-master', label: 'Price Master' },
      { href: '/setup/document-type', label: 'Document Types' },
      { href: '/setup/day-camp-form', label: 'Day Camp Form' },
      { href: '/setup/agreement', label: 'Agreements' },
      { href: '/setup/notifications', label: 'Notifications' },
      { href: '/setup/package-pricing', label: 'Pricing Table' },
      // { href: '/setup/color-codes', label: 'Color Codes' },
      { href: '/setup/training-reason', label: 'Training Reason' },
      { href: '/setup/training-method', label: 'Training Method' },
      { href: '/setup/training-command', label: 'Training Command' },
      { href: '/setup/rating-key', label: 'Rating Keys' },
      { href: '/setup/pet-kennel', label: 'Kennels' },
      { href: '/setup/pet-kennel-type', label: 'Kennel Types' },
      { href: '/setup/pet-kennel-area', label: 'Kennel Areas' },
      { href: '/setup/pet-yard-type', label: 'Yard Types' },
      { href: '/pet/kind', label: 'Species' },
      { href: '/pet/breed', label: 'Breeds' },
      { href: '/pet/incident-type', label: 'Incident Types' },
      { href: '/pet/incident-action', label: 'Incident Actions' },
      { href: '/pet/incident-behavior', label: 'Incident Behaviors' },
      { href: '/pet/retire-reason', label: 'Retire Reasons' },
      { href: '/pet/vaccination-type', label: 'Vaccination Types' },
      { href: '/setup/customized-field', label: 'Customized Field' },
      { href: '/setup/calendar', label: 'Calendar' },
      { href: '/setup/email-template', label: 'Email Template' }
      // { href: '/setup/system-setting', label: 'System Setting' }

      // { href: '/not-defined', label: 'Enable Decline Portal Client' },
      // { href: '/not-defined', label: 'Calendar' },
      // { href: '/not-defined', label: 'Notifications' },
      // { href: '/not-defined', label: 'Overview' },
      // { href: '/not-defined', label: 'Cancellation Reason' },
      // { href: '/not-defined', label: 'Client Rating' }
    ]
  }
]

const AppSidebar = ({ auth, ...props }) => {
  const [ activeCategoryIndex, setActiveCategoryIndex ] = useState(null)

  const [ sidebar, setSidebar ] = useState(false)

  const _handleShowSidebar = () => setSidebar(!sidebar)

  const getCategories = () => auth.item.is_superadmin ? categoriesForSuperAdmin : categories

  const _handleCategoryClick = e => {
    const index = +e.currentTarget.dataset.index
    const category = categoriesToRender[index]

    if(index === activeCategoryIndex) setActiveCategoryIndex(null)
    else if(!category.href) setActiveCategoryIndex(index)
  }

  const isDesktopOrLaptop = useMediaQuery(
    { minDeviceWidth: 767 }
  )

  useEffect(() => {
    if(isDesktopOrLaptop)
      setSidebar(false)
  })

  const categoriesToRender = useMemo(() => getCategories(), [ auth.item.id ])

  return (
    <>
      <div className='navbar'>
        <Link className='menu-bars' onClick={_handleShowSidebar} to='#'>
          <Icon name='bars'/>
        </Link>
      </div>

      <div className={sidebar ? 'nav-menu active app-sidebar' : 'nav-menu app-sidebar'}>
        <Sidebar>
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
      </div>
      {/* </nav> */}
    </>
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
      rehydrateTenant: authDuck.creators.rehydrateTenant,
      set            : authDuck.creators.set
    }
  )
)(AppSidebar)
