import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Grid, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import tenantDetailDuck from '@reducers/tenant/detail'

import Sidebar from '@components/Sidebar'
import Appbar from '@components/Appbar'
import Theme from '@components/mainTheme'

const Layout = ({ children, sidebarHandle,showSidebar }) => {
  const dispatch = useDispatch()
  const [ hideSidebar, setHideSidebar ] = useState(showSidebar ? false : true)

  const detail = useSelector(tenantDetailDuck.selectors.detail)

  useEffect(() => {
    if(!detail.item.id)
      dispatch(tenantDetailDuck.creators.get())
  }, [])

  useEffect(()=>{
    if(sidebarHandle)
      sidebarHandle(hideSidebar)
  },[ hideSidebar ])

  const _handleShowSidebar = () => {
    setHideSidebar(!hideSidebar)
  }

  return (
    <Container fluid>
      <Grid className='appbar-grid'>
        <Grid.Column
          className='p0 appbar-freeze'
          color={Theme(detail).buttonMenuColor} computer={16} mobile={16}
          tablet={16} >
          <Appbar/>
        </Grid.Column>
      </Grid>
      <Grid>
        {
          hideSidebar === false ? (
            <>
              <Grid.Column
                computer={16} mobile={16} style={{ paddingBottom: 0, paddingTop: 0 }}
                tablet={16}>
                <div style={{ 'float': 'left', width: '200px' }}>
                  <Link className='menu-bars ml16' onClick={_handleShowSidebar} to='#'>
                    <Icon
                      className='mb4'
                      color={Theme(detail).buttonMenuColor}
                      name='list ul'
                      style={{ color: '#00B5AD', fontSize: '30px', marginTop: '16px', marginBottom: '4px' }}>
                    </Icon>
                  </Link>
                  <Sidebar hideSidebar={hideSidebar}/>
                </div>
                <div className='app-content'>
                  {/* Content */}
                  {children}
                </div>
              </Grid.Column>
            </>
          ) : (
            <>
              <Grid.Column
                computer={16} mobile={16} style={{ paddingBottom: 0, paddingTop: 0 }}
                tablet={16}>
                <div style={{ 'float': 'left', width: '50px' }}>
                  <Link className='menu-bars' onClick={_handleShowSidebar} to='#'>
                    <Icon
                      color={Theme(detail).buttonMenuColor}
                      name='list ul'
                      style={{ color: '#00B5AD', fontSize: '28px', marginTop: '16px', marginLeft: '8px', marginBottom: '4px' }}></Icon>
                  </Link>
                  <Sidebar hideSidebar={hideSidebar}/>
                </div>
                <div className='app-content'>
                  {children}
                </div>
              </Grid.Column>
            </>
          )
        }

      </Grid>
    </Container>
  )
}

export default Layout
