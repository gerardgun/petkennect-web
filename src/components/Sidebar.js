import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import Sidebar from '@components/Common/Sidebar'

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
      { href: '/pet/incident-action', label: 'Incident Action' }
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
      { href: '/', label: 'Boarding Schedule' },
      { href: '/', label: 'Day Camp Schedule' },
      { href: '/', label: 'Fitness Schedule' },
      { href: '/', label: 'Grooming Schedule' },
      { href: '/', label: 'EOD Sales Report' },
      { href: '/', label: 'Calendar' }
    ]
  },
  {
    href         : null,
    icon         : 'chart pie',
    label        : 'Day Camp Reports',
    subcategories: [
      { href: '/', label: 'Day Camp Head Count Schedule' },
      { href: '/', label: 'Day Camp Refund Calculator' },
      { href: '/', label: 'Daycampers W/ Balance' },
      { href: '/', label: 'Online Day Camp Reservations' }
    ]
  },
  {
    href         : null,
    icon         : 'chart area',
    label        : 'Boarding Reports',
    subcategories: [
      { href: '/', label: 'Boarding Activity' },
      { href: '/', label: 'Boarding Medication Schedule' },
      { href: '/', label: 'Boarding Availability' },
      { href: '/', label: 'Boarding No Shows' },
      { href: '/', label: 'Online Boarding Reservations' }
    ]
  },
  {
    href         : null,
    icon         : 'chart bar outline',
    label        : 'Training Reports',
    subcategories: [
      { href: '/', label: 'Agility Class Certificatess' },
      { href: '/', label: 'Day Training Report Cards' },
      { href: '/', label: 'Day Trainer Daily Email' },
      { href: '/', label: 'Day Trainer Performance Log' },
      { href: '/', label: 'Puppy Class Certificates' },
      { href: '/', label: 'Training Follow Ups' },
      { href: '/', label: 'Training Outstanding Balances' },
      { href: '/', label: 'Weekly Day Training' }
    ]
  },
  {
    href         : null,
    icon         : 'dna',
    label        : 'Management Functions',
    subcategories: [
      { href: '/', label: 'Weekly EOD Issues' },
      { href: '/', label: 'Search Invoices' },
      { href: '/', label: 'Open Register Functions' },
      { href: '/', label: 'A/R And Aging Report' },
      { href: '/', label: 'Occupancy Status' },
      { href: '/', label: 'Retail Sales Report' }
    ]
  },
  {
    href         : null,
    icon         : 'cogs',
    label        : 'Setup',
    subcategories: [
      { href: '/setup/location', label: 'Locations' },
      { href: '/setup/document-type', label: 'Document Types' },
      { href: '/', label: 'Enable Decline Portal Client' },
      { href: '/', label: 'Price Master' },
      { href: '/', label: 'Breed' },
      { href: '/', label: 'Calendar' },
      { href: '/', label: 'Notifications' },
      { href: '/', label: 'Pet Behaviors' },
      { href: '/', label: 'Overview' },
      { href: '/', label: 'Cancellation Reason' },
      { href: '/', label: 'Client Rating' }
    ]
  }
]

const AppSidebar = ({ auth, ...props }) => {
  const [ activeCategorieIndexes, setActiveCategorieIndexes ] = useState([])

  const getCategories = () => auth.item.is_superadmin ? categoriesForSuperAdmin : categories

  const _handleCategoryClick = e => {
    const index = +e.currentTarget.dataset.index
    const category = categoriesToRender[index]

    if(!category.href)
      if(activeCategorieIndexes.includes(index))
        setActiveCategorieIndexes(prevState => prevState.filter(categoryIndex => categoryIndex !== index))
      else
        setActiveCategorieIndexes(prevState => ([ ...prevState, index ]))
  }

  const categoriesToRender = useMemo(() => getCategories(), [ auth.item.id ])

  return (
    <Sidebar>
      <Image src='/images/logo.png' style={{ padding: '3rem 1rem' }}/>
      {
        categoriesToRender.map(({ subcategories = null, ...rest }, index) => {
          const rgx = new RegExp(`^${rest.href}.*`)
          const active = rgx.test(props.match.path) || activeCategorieIndexes.includes(index)

          return (
            <Sidebar.Category
              active={active}
              data-index={index}
              key={index}
              onClick={_handleCategoryClick}
              {...rest}>
              {
                subcategories ? (
                  subcategories.map(({ href: to, label }, index) => (
                    <Link key={index} to={to}>{label}</Link>
                  ))
                ) : null
              }
            </Sidebar.Category>
          )
        })
      }
    </Sidebar>
  )
}

export default compose(
  withRouter,
  connect(
    ({ auth }) => ({
      auth
    }),
    {
      // Nothing
    }
  )
)(AppSidebar)
