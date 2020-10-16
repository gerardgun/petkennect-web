import React from 'react'
import { Container, Grid,Image } from 'semantic-ui-react'

import Sidebar from '@components/Sidebar'
import Appbar from '@components/Appbar'

const Layout = ({ children }) => (
  <Container fluid>
    <Grid className='appbar-grid'>
      <Grid.Column
        computer={3} mobile={16} style={{ paddingBottom: 0, paddingRight: 0 }}
        tablet={3} >
        <Image className='logo-img' src='/images/logo.png' style={{ padding: '1.3rem' }}/>
      </Grid.Column>
      <Grid.Column
        computer={13} mobile={16} style={{ paddingBottom: 0, paddingRight: 0 }}
        tablet={13} >
        <Appbar/>
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column style={{ paddingBottom: 0, paddingRight: 0,paddingTop: 0 }} width='three'>
        <Sidebar/>
      </Grid.Column>
      <Grid.Column style={{ paddingBottom: 0, paddingLeft: 0,paddingTop: 0 }} width='thirteen'>
        <div className='app-content'>
          {/* Content */}
          {children}
        </div>

      </Grid.Column>
    </Grid>
  </Container>
)

export default Layout
