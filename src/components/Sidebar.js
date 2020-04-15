import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

import Sidebar from '@components/Common/Sidebar'

const categoriesForSuperAdmin = [
  {
    href: '/organization',
    icon: 'factory',
    label: 'Organizations'
  },
  {
    href: '/company',
    icon: 'building',
    label: 'Companies'
  },
]

const categories = [
  {
    href: '/',
    icon: 'chart bar outline',
    label: 'Dashboard'
  },
  {
    href: '/client',
    icon: 'users',
    label: 'Clients'
  },
  {
    href: '/pet',
    icon: 'gitlab',
    label: 'Pets'
  },
  {
    href: '/',
    icon: 'osi',
    label: 'Online Requests'
  },
  {
    href: '/',
    icon: 'dollar sign',
    label: 'Retail Sales'
  },
  {
    href: null,
    icon: 'chart line',
    label: 'Daily Reporting',
    subcategories: [
      { href: '/', label: 'Boarding Schedule' },
      { href: '/', label: 'Day Camp Schedule' },
      { href: '/', label: 'Fitness Schedule' },
      { href: '/', label: 'Grooming Schedule' },
      { href: '/', label: 'EOD Sales Report' },
      { href: '/', label: 'Calendar' },
    ] 
  },
  {
    href: null,
    icon: 'chart pie',
    label: 'Day Camp Reports',
    subcategories: [
      { href: '/', label: 'Day Camp Head Count Schedule' },
      { href: '/', label: 'Day Camp Refund Calculator' },
      { href: '/', label: 'Daycampers W/ Balance' },
      { href: '/', label: 'Online Day Camp Reservations' },
    ] 
  },
  {
    href: null,
    icon: 'chart area',
    label: 'Boarding Reports',
    subcategories: [
      { href: '/', label: 'Boarding Activity' },
      { href: '/', label: 'Boarding Medication Schedule' },
      { href: '/', label: 'Boarding Availability' },
      { href: '/', label: 'Boarding No Shows' },
      { href: '/', label: 'Online Boarding Reservations' },
    ] 
  },
  {
    href: null,
    icon: 'chart bar outline',
    label: 'Training Reports',
    subcategories: [
      { href: '/', label: 'Agility Class Certificatess' },
      { href: '/', label: 'Day Training Report Cards' },
      { href: '/', label: 'Day Trainer Daily Email' },
      { href: '/', label: 'Day Trainer Performance Log' },
      { href: '/', label: 'Puppy Class Certificates' },
      { href: '/', label: 'Training Follow Ups' },
      { href: '/', label: 'Training Outstanding Balances' },
      { href: '/', label: 'Weekly Day Training' },
    ] 
  },
  {
    href: null,
    icon: 'dna',
    label: 'Management Functions',
    subcategories: [
      { href: '/', label: 'Weekly EOD Issues' },
      { href: '/', label: 'Search Invoices' },
      { href: '/', label: 'Open Register Functions' },
      { href: '/', label: 'A/R And Aging Report' },
      { href: '/', label: 'Occupancy Status' },
      { href: '/', label: 'Retail Sales Report' },
    ] 
  },
  {
    href: null,
    icon: 'cogs',
    label: 'Setup',
    subcategories: [
      { href: '/', label: 'Enable Decline Portal Client' },
      { href: '/', label: 'Price Master' },
      { href: '/', label: 'Breed' },
      { href: '/', label: 'Calendar' },
      { href: '/', label: 'Notifications' },
      { href: '/', label: 'Pet Behaviors' },
      { href: '/', label: 'Overview' },
      { href: '/', label: 'Cancellation Reason' },
      { href: '/', label: 'Client Rating' },
    ] 
  },
]

const AppSidebar = ({ auth, ...props }) => {
  const [ activedCategoryIndex, setActivedCategoryIndex ] = useState(null)

  const getCategories = () => auth.item.is_superadmin ? categoriesForSuperAdmin : categories

  const _handleCategoryClick = index => setActivedCategoryIndex(index)

  const categoriesToRender = useMemo(() => getCategories(), [ auth.item.id ])

  return (
    <Sidebar>
      <Image size='small' src='/images/logo.svg' style={{ margin: '3rem 0rem' }} />
      {
        categoriesToRender.map(({ subcategories = null, ...rest }, index) => (
          <Sidebar.Category
            key={index}
            active={activedCategoryIndex === index}
            onClick={() => _handleCategoryClick(index)}
            {...rest}
          >
            {
              subcategories ? (
                subcategories.map(({ href: to, label }, index) => (
                  <Link key={index} to={to}>{label}</Link>
                ))
              ) : null
            }
          </Sidebar.Category>
        ))
      }
    </Sidebar>
  )
}

export default compose(
  connect(
    ({ auth }) => ({
      auth,
    }),
    {
      // Nothing
    }
  )
)(AppSidebar)