import React from 'react'
import { Container, Grid,Image } from 'semantic-ui-react'

import Sidebar from '@components/Sidebar'
import Appbar from '@components/Appbar'

const Layout = ({ children }) => (
  <Container fluid>
    <Grid className='appbar-grid'>
      <Grid.Column style={{ paddingBottom: 0, paddingRight: 0 }} width='three'>
        <Image src='/images/logo.png' style={{ padding: '1.3rem', height: '9rem' }}/>
      </Grid.Column>
      <Grid.Column style={{ paddingBottom: 0, paddingRight: 0 }} width='thirteen'>
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
