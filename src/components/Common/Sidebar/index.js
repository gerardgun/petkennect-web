import React, { useMemo } from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

const SidebarCategory = ({ active, children, href, icon, label, ...rest }) => {
  const getWrapped = () => {
    return href ? ({
      component: Link,
      props    : { to: href }
    }) : ({
      component: 'span',
      props    : {}
    })
  }

  const {
    component: WrappedComponent,
    props: wrappedProps
  } = useMemo(() => getWrapped(), [ href ])

  return (
    <div className={`sidebar-category ${active && 'active'}`} {...rest}>
      <WrappedComponent {...wrappedProps}>
        <div className='icon-container'>
          <Icon name={icon}/>
        </div> {label}
      </WrappedComponent>
      {
        active && children && (<div className='sidebar-menu'>{children}</div>)
      }
    </div>
  )
}

SidebarCategory.defaultProps = {
  label : 'Some Category',
  href  : null,
  active: false,
  icon  : 'question'
}

const Sidebar = ({ children }) => (
  <div className='sidebar'>{children}</div>
)

Sidebar.Category = SidebarCategory

export default Sidebar
