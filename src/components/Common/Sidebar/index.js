import React, { useMemo } from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SidebarCategory = ({ active, children, href, icon, label, ...rest }) => {
  const getWrapped = () => {
    return href ? ({
      component: Link,
      props    : { to: href }
    }) : ({
      component: 'div',
      props    : {}
    })
  }

  const {
    component: WrappedComponent,
    props: wrappedProps
  } = useMemo(() => getWrapped(), [ href ])

  return (
    <div className={`sidebar-category ${active ? 'active' : ''}`} {...rest}>
      <WrappedComponent className='sidebar-category-item' {...wrappedProps}>
        <div className='sidebar-category-item-icon'>
          <Icon name={icon}/>
        </div>
        <div className='sidebar-category-item-text'>{label}</div>
        {
          children && <Icon name={`chevron ${active ? 'down' : 'right'}`}/>
        }
      </WrappedComponent>
      {
        active && children && (<div className='sidebar-category-menu'>{children}</div>)
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
