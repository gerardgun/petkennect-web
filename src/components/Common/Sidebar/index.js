import React, { useMemo } from 'react'
import { Icon, Dropdown } from 'semantic-ui-react'
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
        <div>
          {
            rest.hideSidebar !== true ? (
              <>
                <div className='sidebar-category-item-icon'>
                  <Icon name={icon}/>
                </div>
              </>
            ) : (
              <div className='sidebar-category-item-icon-sidebar-minimize'>
                {
                  rest.subCategories.length === 0 ? (<Icon name={icon}/>)
                    : (
                      <div>
                        <Dropdown
                          icon={null}
                          options={
                            rest.subCategories.length > 0 ? (
                              rest.subCategories.map(({ href: to, label, iconRight = null }, index) => {
                                return (
                                  <>
                                    <Link key={index} style={{ display: 'flex' }} to={to}>
                                      {label}
                                      {
                                        iconRight && <div className='icon-right ml8'>{iconRight}</div>
                                      }<br/>
                                    </Link>
                                    {
                                      rest.subCategories.length - 1 !== index && (<div className='horizontal-line'></div>)
                                    }
                                  </>
                                )
                              })
                            ) : null
                          }
                          selectOnBlur={false}
                          trigger={(
                            <Icon name={icon}/>
                          )}
                          value={null}/>
                      </div>
                    )
                }
              </div>
            )
          }
        </div>
        {

          rest.hideSidebar !== true ? (
            <>

              <div className='sidebar-category-item-text'>{label}</div>
              {
                children && <Icon className='pt0' name={`chevron ${active ? 'down' : 'right'}`}/>
              }
            </>
          ) : null
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
