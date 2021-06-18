import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import tenantDetailDuck from '@reducers/tenant/detail'
import Theme from '@components/mainTheme'

const SidebarCategory = ({ active, children, href, icon, label, ...rest }) => {
  const dispatch = useDispatch()
  const getWrapped = () => {
    return href ? ({
      component: Link,
      props    : { to: href }
    }) : ({
      component: 'div',
      props    : {}
    })
  }

  const detail = useSelector(tenantDetailDuck.selectors.detail)

  useEffect(() => {
    if(!detail.item.id)
      dispatch(tenantDetailDuck.creators.get())
  }, [])

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
                  rest.subCategories.length === 0 ? (<Icon color={active ? Theme(detail).buttonMenuColor : ''} name={icon}/>)
                    : (
                      <div>
                        <Dropdown
                          icon={null}
                          options={
                            rest.subCategories.length > 0 ? (
                              rest.subCategories.map(({ href: to, label, iconRight = null }, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <Link key={index} style={{ display: 'flex' }} to={to}>
                                      {label}
                                      {
                                        iconRight && <div className='icon-right ml8'>{iconRight}</div>
                                      }<br/>
                                    </Link>
                                    {
                                      rest.subCategories.length - 1 !== index ? (<div className='horizontal-line'></div>)
                                        : (<div style={{ marginBottom: '2px' }}></div>)
                                    }
                                  </React.Fragment>
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
